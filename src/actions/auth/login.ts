import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import bcrypt from "bcryptjs";
import { getLucia } from "../../lib/auth";

export const loginUser = defineAction({
  input: z.object({
    email: z.string().email(),
    password: z.string()
  }),

  handler: async ({ email, password }, { cookies }) => {
    const { db, User, eq } = await import("astro:db");
    const lucia = await getLucia();
    // 1. Buscar al usuario
    const [user] = await db.select().from(User).where(eq(User.email, email));

    if (!user) {
      throw new Error("Credenciales incorrectas");
    }

    // 2. Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error("Credenciales incorrectas");
    }

    // 3. Crear sesión con Lucia
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    
    cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return { success: true };
  }
});