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
  adapter: netlify(),

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["astro:db"]
    }
  }
});