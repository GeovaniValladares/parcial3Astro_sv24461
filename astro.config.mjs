// @ts-check
import { defineConfig } from 'astro/config';
import db from '@astrojs/db';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    db(),
    starlight({
      title: 'Documentacion',
      defaultLocale: 'root',
      social: [
        { label: 'GitHub', href: 'https://github.com/JoseGeovaniSanchezVa/astro-lucia-auth', icon: 'github' }
      ],
      sidebar: [
        {
          label: 'Guía del Proyecto',
          items: [
            { label: 'Introducción', link: '/manual/intro' },
            { label: 'Arquitectura', link: '/manual/arquitectura' },
            { label: 'Base de Datos', link: '/manual/database' },
            { label: 'Autenticación', link: '/manual/auth' },
            { label: 'Funcionalidades', link: '/manual/api' },
          ],
        },
      ],
    }),
  ],
  output: 'server',
  adapter: netlify(),

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["astro:db"]
    }
  }
});