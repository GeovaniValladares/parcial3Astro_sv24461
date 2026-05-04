---
title: Autenticación y Seguridad
description: Implementación de Lucía Auth y Middlewares.
---

### Lucía Auth
Se utiliza **Lucía Auth** como motor de autenticación. La configuración se encuentra en `src/lib/auth.ts`.

- **Adaptador:** AstroDBAdapter.
- **Atributos:** Se exponen `name`, `email` y `role` en el objeto de usuario de la sesión.

### Middleware
El archivo `src/middleware.ts` es el encargado de la seguridad perimetral:
1. Valida la cookie de sesión en cada petición.
2. Expone `user` y `session` en `Astro.locals`.
3. Redirige usuarios no autenticados de rutas protegidas (`/protected`, `/admin`).
4. Protege el panel de administración, permitiendo el acceso únicamente a usuarios con el rol `admin`.

### Hasheo de Contraseñas
Se utiliza la librería `bcryptjs` con un factor de costo de 10 para asegurar que las contraseñas no se almacenen en texto plano.
