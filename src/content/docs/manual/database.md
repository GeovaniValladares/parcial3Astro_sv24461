---
title: Base de Datos (Astro DB + Turso)
description: Configuración del esquema y persistencia en la nube.
---

El proyecto utiliza **Astro DB** sincronizado con **Turso** para persistencia en producción.

### Modelo de Datos
El esquema (`db/config.ts`) define tres tablas principales:

1.  **Role:** Almacena los roles del sistema (`admin`, `user`).
2.  **User:** Información de perfiles, incluyendo contraseña hasheada y fecha de creación.
3.  **Session:** Almacén de sesiones activas gestionadas por Lucia.

### Sincronización con Turso
En producción, el sistema se conecta a un servidor de Turso mediante las variables:
- `ASTRO_DB_REMOTE_URL`
- `ASTRO_DB_APP_TOKEN`

### Comandos Útiles
- `npm run dev`: Desarrollo con base de datos local SQLite.
- `npx astro db push --remote`: Sincroniza cambios del esquema a Turso.
- `npx astro db execute db/seed.ts --remote`: Pobla la base de datos remota con datos iniciales (Admin por defecto).
