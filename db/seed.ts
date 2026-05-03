import { db, Role, User } from 'astro:db';
import bcrypt from "bcryptjs";

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Role).values([
		{ id: 'admin', name: 'admin' },
		{ id: 'user', name: 'user' },
	]);

	const hashedPassword = await bcrypt.hash("admin123", 10);

	await db.insert(User).values([
		{
			id: crypto.randomUUID(),
			name: 'Admin User',
			email: 'admin@gmail.com',
			password: hashedPassword,
			role: 'admin',
			createdAt: new Date(),
		}
	]);
}
