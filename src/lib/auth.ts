import { Lucia } from "lucia";

let luciaInstance: Lucia;

export async function getLucia() {
  if (!luciaInstance) {
    // Importaciones dinámicas para evitar inicializar la DB durante el build/prerender
    const { db, Session, User } = await import("astro:db");
    const { AstroDBAdapter } = await import("lucia-adapter-astrodb");

    const adapter = new AstroDBAdapter(db, Session, User);
    luciaInstance = new Lucia(adapter, {
      sessionCookie: {
        attributes: {
          secure: true // Forzado para Netlify (HTTPS)
        }
      },
      getUserAttributes: (attributes: any) => {
        return {
          name: attributes.name,
          email: attributes.email,
          role: attributes.role
        };
      }
    });
  }
  return luciaInstance;
}

declare module "lucia" {
	interface Register {
		Lucia: ReturnType<typeof getLucia> extends Promise<infer T> ? T : never;
        DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
    name: string;
    email: string;
    role: string;
}
