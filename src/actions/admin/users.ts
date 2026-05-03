import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import bcrypt from "bcryptjs";

export const adminUsers = {
  createUser: defineAction({
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      role: z.string()
    }),
    handler: async (data, { locals }) => {
      if (!locals.user || locals.user.role !== 'admin') {
        throw new Error("No autorizado");
      }
      
      const { db, User, eq } = await import("astro:db");

      const [existingUser] = await db.select().from(User).where(eq(User.email, data.email));
      if (existingUser) {
        throw new Error("El correo ya está registrado");
      }

      const userId = crypto.randomUUID();
      const hashedPassword = await bcrypt.hash(data.password, 10);

      await db.insert(User).values({
        id: userId,
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        createdAt: new Date()
      });

      return { success: true };
    }
  }),

  updateUser: defineAction({
    input: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      role: z.string()
    }),
    handler: async (data, { locals }) => {
      if (!locals.user || locals.user.role !== 'admin') {
        throw new Error("No autorizado");
      }

      const { db, User, eq } = await import("astro:db");

      await db.update(User)
        .set({
          name: data.name,
          email: data.email,
          role: data.role
        })
        .where(eq(User.id, data.id));

      return { success: true };
    }
  }),

  deleteUser: defineAction({
    input: z.object({
      id: z.string()
    }),
    handler: async ({ id }, { locals }) => {
      if (!locals.user || locals.user.role !== 'admin') {
        throw new Error("No autorizado");
      }

      const { db, User, eq } = await import("astro:db");

      // Evitar que un admin se elimine a sí mismo
      if (locals.user.id === id) {
        throw new Error("No puedes eliminarte a ti mismo");
      }

      await db.delete(User).where(eq(User.id, id));

      return { success: true };
    }
  })
};