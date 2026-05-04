---
title: Arquitectura y Estructura
description: Organización del código y flujo de la aplicación.
---

La aplicación utiliza un enfoque de **Server-Side Rendering (SSR)** para garantizar la seguridad en la gestión de sesiones y la eficiencia en las consultas a la base de datos.

### Organización de Carpetas
- `src/actions/`: Lógica de servidor (Astro Actions) para manejar Auth y CRUD de usuarios.
- `src/components/`: Componentes compartidos como el Navbar responsivo.
- `src/content/`: Archivos Markdown de este manual gestionados por Starlight.
- `src/lib/`: Configuraciones centrales (inicialización de Lucia Auth).
- `src/middleware.ts`: Interceptor global que protege rutas y valida sesiones.
- `src/pages/`:
    - `admin/`: Panel de administración protegido.
    - `login.astro` / `register.astro`: Gestión de acceso.
    - `protected.astro`: Zona privada para usuarios autenticados.

### Patrón de Inicialización Perezosa (Lazy Init)
Para evitar errores de conexión durante la fase de compilación (build), el sistema implementa una función `getLucia()` que importa dinámicamente las dependencias de la base de datos solo cuando se recibe una petición real en el servidor.
