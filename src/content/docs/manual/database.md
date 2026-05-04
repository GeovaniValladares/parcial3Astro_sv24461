---
title: Base de Datos
description: Esquema y configuración de Astro DB.
---

El proyecto utiliza **Astro DB** con un motor libSQL. El esquema está definido para soportar roles y gestión de usuarios.

### Tablas Principales

#### Role
Almacena los tipos de roles permitidos en el sistema.
- `id`: Texto (PK)
- `name`: Texto (Único)

#### User
Almacena la información de los usuarios registrados.
- `id`: Texto (PK)
- `name`: Texto
- `email`: Texto (Único)
- `password`: Texto (Hasheada con bcrypt)
- `role`: Texto (FK a Role)
- `createdAt`: Fecha de creación

#### Session
Gestionada por Lucía Auth para el control de sesiones activas.
- `id`: Texto (PK)
- `expiresAt`: Fecha de expiración
- `userId`: Texto (FK a User)

### Seed de Datos
El sistema incluye un script de seed que inicializa los roles (`admin`, `user`) y crea un usuario administrador por defecto: `admin@gmail.com`.
