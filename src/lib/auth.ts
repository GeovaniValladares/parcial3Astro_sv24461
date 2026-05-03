import { Lucia } from "lucia";
import { AstroDBAdapter } from "lucia-adapter-astrodb";
import { db, Session, User } from "astro:db";

const adapter = new AstroDBAdapter(db, Session, User);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: true // Forzado a true para producción en Netlify (HTTPS)
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

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
    name: string;
    email: string;
    role: string;
}