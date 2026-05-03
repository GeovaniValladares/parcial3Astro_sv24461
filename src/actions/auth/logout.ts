import { defineAction } from "astro:actions";
import { lucia } from "../../lib/auth";

export const logoutUser = defineAction({
  handler: async (_, { cookies, locals }) => {
    // 1. Verificar si hay una sesión activa
    const session = locals.session;
    if (!session) {
      return { success: true };
    }

    // 2. Invalidar la sesión en la base de datos
    await lucia.invalidateSession(session.id);

    // 3. Borrar la cookie de sesión
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return { success: true };
  }
});