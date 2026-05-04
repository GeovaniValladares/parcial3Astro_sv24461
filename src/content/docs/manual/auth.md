---
title: Autenticación y Seguridad
description: Detalles de la implementación de seguridad.
---

### Gestión de Sesiones (Lucia Auth)
Lucia se encarga de crear cookies de sesión seguras (`httpOnly`). La instancia se configura en `src/lib/auth.ts` exponiendo los atributos:
- Nombre del usuario.
- Correo electrónico.
- **Rol asignado** (vital para el control de acceso).

### Middleware de Protección
El archivo `src/middleware.ts` actúa como un guardián de rutas:
- **Públicas:** Solo accesibles si NO hay sesión (Login/Register).
- **Protegidas:** Requieren cualquier sesión válida (`/protected`).
- **Admin:** Requieren estrictamente el rol `admin` (`/admin`).

### Seguridad de Contraseñas
Nunca se almacenan contraseñas en texto plano. Se utiliza **bcryptjs** para el hasheo antes de guardar en la base de datos y para la validación durante el inicio de sesión.
