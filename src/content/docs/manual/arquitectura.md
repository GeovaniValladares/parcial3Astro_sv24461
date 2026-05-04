---
title: Arquitectura del Sistema
description: Detalles técnicos de la estructura del proyecto.
---

La aplicación sigue una arquitectura basada en componentes y rutas de Astro, utilizando el enfoque de **Server-Side Rendering (SSR)** para la gestión de sesiones y datos.

### Estructura de Carpetas Principal
- `src/actions/`: Contiene la lógica de negocio (Astro Actions) para autenticación y administración.
- `src/components/`: Componentes reutilizables de la interfaz.
- `src/layouts/`: Plantillas base para las páginas (Auth y Main).
- `src/lib/`: Configuración de librerías externas (Lucia Auth).
- `src/middleware.ts`: Interceptor de peticiones para validación de sesiones y protección de rutas.
- `src/pages/`: Rutas de la aplicación (Login, Registro, Admin, Protected).

### Flujo de Datos
1. El usuario interactúa con los formularios.
2. Las **Astro Actions** procesan la solicitud en el servidor.
3. Se interactúa con **Astro DB** para persistencia.
4. Se retorna una respuesta que el cliente maneja (usando SweetAlert2 para feedback).
