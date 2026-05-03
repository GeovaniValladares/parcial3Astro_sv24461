// @ts-check
import { defineConfig } from 'astro/config';
import db from '@astrojs/db';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    db(),
    starlight({
      title: 'Documentación',
      defaultLocale: 'root',
      social: [
        { label: 'GitHub', href: 'https://github.com/JoseGeovaniSanchezVa/astro-lucia-auth', icon: 'github' }
      ],
      sidebar: [
        {
          label: 'Guía del Proyecto',
          items: [
            { label: 'Introducción', link: '/intro' },
            { label: 'Arquitectura', link: '/arquitectura' },
            { label: 'Base de Datos', link: '/database' },
            { label: 'Autenticación', link: '/auth' },
          ],
        },
      ],
    }),
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["astro:db"]
    }
  }
});