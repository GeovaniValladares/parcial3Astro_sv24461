import { lucia } from "./lib/auth";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
	const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		context.locals.user = null;
		context.locals.session = null;
		return next();
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	}
	context.locals.session = session;
	context.locals.user = user;

	const isAuthPage = context.url.pathname.startsWith("/login") || context.url.pathname.startsWith("/register");
	const isAdminPage = context.url.pathname.startsWith("/admin");
	const isProtectedPage = context.url.pathname.startsWith("/protected") || isAdminPage;

	if (user && isAuthPage) {
		return context.redirect(user.role === 'admin' ? "/admin" : "/protected");
	}

	if (!user && isProtectedPage) {
		return context.redirect("/login");
	}

	if (isAdminPage && user?.role !== 'admin') {
		return context.redirect("/protected");
	}

	return next();
});