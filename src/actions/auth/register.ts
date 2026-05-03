import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, User, eq } from "astro:db";
import bcrypt from "bcryptjs";
import { getLucia } from "../../lib/auth";

export const registerUser = defineAction({
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    role: z.string().optional()
  }),

  handler: async (data, { cookies }) => {
    const lucia = getLucia();
    // 1. Verificar si el usuario ya existe
    const [existingUser] = await db.select().from(User).where(eq(User.email, data.email));
    if (existingUser) {
      throw new Error("El correo ya está registrado");
    }

    // 2. Crear el usuario
    const userId = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await db.insert(User).values({
      id: userId,
      email: data.email,
      name: data.name,
      password: hashedPassword,
      role: data.role || 'user',
      createdAt: new Date(),
    });

    // 3. Crear sesión con Lucia e iniciar sesión automáticamente
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    
    cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return { success: true };
  }
});