---
title: Funcionalidades Especiales
description: Detalles sobre el Panel Admin y API Externa.
---

### Panel Administrativo (CRUD Completo)
El panel en `/admin` ofrece una gestión integral de usuarios:
- **Estadísticas:** Conteo total de usuarios y administradores en tiempo real.
- **Búsqueda Dinámica:** Filtro por nombre y por rol.
- **Paginación Servidor:** Listado limitado a 5 usuarios por página para optimizar el rendimiento.
- **CRUD:**
    - Modales para creación y edición rápida.
    - Confirmación visual con SweetAlert2 antes de eliminar.
- **Exportación:** Soporte nativo para impresión y guardado como PDF.

### Integración de API Externa
En la página protegida, se consume la API de **ZenQuotes** para mostrar una frase motivacional aleatoria. 
- **Técnica:** Se utiliza `fetch` asíncrono desde el cliente para demostrar la capacidad de consumir servicios REST de terceros.
