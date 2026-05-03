import { Lucia } from "lucia";
import { AstroDBAdapter } from "lucia-adapter-astrodb";
import { db, Session, User } from "astro:db";

let luciaInstance: Lucia;

export function getLucia() {
  if (!luciaInstance) {
    const adapter = new AstroDBAdapter(db, Session, User);
    luciaInstance = new Lucia(adapter, {
      sessionCookie: {
        attributes: {
          secure: true // Forzado para Netlify (HTTPS)
        }
      },
      getUserAttributes: (attributes) => {
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
		Lucia: ReturnType<typeof getLucia>;
        DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
    name: string;
    email: string;
    role: string;
}