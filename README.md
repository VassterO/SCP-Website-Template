# Plantilla de Sitio Web para SCP:SL

**Versión estable: 2.0.0**

Este repositorio contiene una plantilla de sitio web para comunidades del juego SCP: Secret Laboratory.



## Introducción

¡Bienvenido! Esta plantilla está diseñada para ahorrarte tiempo y evitar los altos costos que algunos desarrolladores cobran. Mientras que muchos ofrecen precios justos, otros pueden cobrar de más por resultados inferiores. Este proyecto te proporciona una base sólida y profesional, lista para ser personalizada.

## Características Principales

Esta plantilla ha sido reescrita desde cero con tecnologías y prácticas modernas para ofrecer la mejor experiencia posible tanto para los usuarios como para los desarrolladores.

-   **Diseño Moderno y Profesional:** Una interfaz de usuario (UI) y experiencia de usuario (UX) completamente rediseñada, con animaciones sutiles (`Framer Motion`), una paleta de colores cohesiva y un diseño completamente responsivo (`Tailwind CSS`).

-   **Arquitectura Optimizada:** Construida con **React Router v7**, utilizando cargadores de datos (`loaders`) para obtener la información del servidor antes de que la página se renderice. Esto, combinado con *placeholders de esqueleto* (`skeleton loaders`), ofrece una percepción de carga casi instantánea.

-   **Integración Segura con API:** Se conecta con la API de `scplist.kr` para mostrar información del servidor en tiempo real. Utiliza un *parseador seguro* para interpretar las etiquetas de formato de la API.

-   **Funcionalidad Mejorada:** Incluye un botón para **Copiar la IP** del servidor directamente al portapapeles, una de las funciones más solicitadas por los jugadores.

-   **Fácil de Personalizar:** La estructura del proyecto está organizada para que puedas cambiar los textos, enlaces, colores y configuraciones principales de forma rápida y sencilla.

## Personalización

La mayor parte de la personalización se realiza en la carpeta `src/config/` y otros archivos clave:

-   `src/config/navigationConfig.js`: Para configurar los enlaces de la barra de navegación.
-   `src/config/homeConfig.js`: Para el título, descripción y botones de la página de inicio.
-   `src/config/donationsConfig.js`: Para los niveles de donación y tu correo de PayPal.
-   `src/config/rulesConfig.js`: Para añadir o modificar las normativas del servidor.
-   `src/config/serverInfoConfig.js`: **El más importante.** Aquí debes poner el ID de tu servidor.
-   `src/config/footerConfig.js`: Para los enlaces e información del pie de página.
-   `tailwind.config.js`: Para cambiar la paleta de colores principal del sitio.
-   `public/`: Para cambiar el `favicon.ico`, la imagen para redes sociales (`og-image.png`) y el título en `index.html`.

## Cómo Empezar

Sigue estos pasos para poner en marcha tu sitio web:

1.  **Clona o Descarga el Repositorio**
   -   Usa `git clone https://github.com/VassterO/SCP-Website-Template.git` o descarga el archivo ZIP.

2.  **Navega a la Carpeta del Proyecto**
   -   Abre una terminal y muévete a la carpeta `SPANISH/` que se encuentra dentro del repositorio.
    ```bash
    cd SCP-Website-Template/SPANISH/
    ```

3.  **Instala las Dependencias**
   -   Necesitarás tener [Node.js](https://nodejs.org/) instalado. Ejecuta el siguiente comando para instalar todos los paquetes necesarios:
    ```bash
    npm install
    ```

4.  **Inicia el Sitio Web**
   -   Una vez instaladas las dependencias, inicia el servidor de desarrollo:
    ```bash
    npm start
    ```

El sitio web se abrirá automáticamente en tu navegador en `http://localhost:3000`.

## Información Importante

> **Importante:** Este sitio web es una plantilla de *frontend*. Carece de un *backend* propio o de funciones de seguridad avanzadas. El autor no se hace responsable de los problemas que surjan al usar el sitio web sin las medidas de seguridad adecuadas en un entorno de producción.

## Errores Conocidos

> **P1**
> Ninguno por el momento.

> **P2**
> Ninguno por el momento.

> **P3**
> Ninguno por el momento.

## Créditos

Este proyecto fue desarrollado y refactorizado por **VassterO**. Por favor, da crédito al autor incluyendo un enlace al [repositorio de GitHub](https://github.com/VassterO/SCP-Website-Template) o mencionando su nombre en el pie de página de tu sitio web.

## Licencia

Este proyecto está bajo la **Licencia MIT**. Puedes encontrar los detalles en el archivo `LICENSE`.