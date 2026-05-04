---
title: Introducción
description: Objetivos y tecnologías del proyecto Parcial III.
---

Este documento es el **Manual del Programador** para la aplicación desarrollada en el Parcial III de la materia Herramientas de Inteligencia Artificial para el Desarrollo Web.

### Objetivo del Proyecto
El sistema es una plataforma web completa que integra:
- **Gestión de Identidad:** Registro, inicio de sesión y control de sesiones seguras.
- **Panel Administrativo:** Operaciones CRUD (Crear, Leer, Actualizar, Borrar) sobre la tabla de usuarios.
- **Paginación y Filtros:** Listados eficientes del lado del servidor.
- **Consumo de Servicios:** Integración con APIs externas y bases de datos en la nube.

### Stack Tecnológico
- **Framework:** [Astro 6](https://astro.build/) (Modo SSR).
- **Autenticación:** [Lucia Auth](https://lucia-auth.com/) (v3).
- **Base de Datos:** [Astro DB](https://docs.astro.build/en/guides/astro-db/) con motor **libSQL** alojado en **Turso**.
- **Despliegue:** [Netlify](https://www.netlify.com/).
- **UI/Estilos:** Tailwind CSS y SweetAlert2 para componentes interactivos.
- **Documentación:** Starlight.
