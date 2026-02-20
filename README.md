# 📚 Sistema de Gestión de Biblioteca

Un sistema integral para la administración de recursos bibliotecarios, diseñado con una arquitectura robusta y una interfaz moderna.

---

## 🚀 Inicio Rápido

Sigue estos pasos para levantar el sistema en tu entorno local.

### 📋 Requisitos Previos
*   **Node.js**: Versión 20.x o superior.
*   **TypeScript**: Entorno configurado para compilación de archivos `.ts`.
*   **MongoDB**: Servicio activo (local o remoto).

### 📦 Instalación y Ejecución
1.  **Instalar dependencias**:
    ```bash
    npm install
    ```
2.  **Compilar estilos (Tailwind CSS v4)**:
    ```bash
    npm run css
    ```
3.  **Iniciar servidor en desarrollo**:
    ```bash
    npm run dev
    ```

---

## 🌐 Acceso al Sistema

*   **Aplicación Principal (Dashboard)**: [http://localhost:3000](http://localhost:3000)
*   **API Explorer (Herramienta de Testing)**: [http://localhost:3000/api](http://localhost:3000/api)

---

## 🏛️ Arquitectura y Metodología

### 1. Estructura de Directorios (Desktop Structure)
```text
.
├── src
│   ├── app.ts                # Punto de entrada y middlewares
│   ├── config/               # Configuración de base de datos
│   ├── controllers/          # Controladores (Lógica de Negocio)
│   ├── models/               # Esquemas de datos (MongoDB/Mongoose)
│   ├── routes/               # Definición de rutas REST
│   ├── views/                # Pantallas EJS y Partials
│   ├── public/               # Activos estáticos procesados
│   └── assets/               # Fuentes de estilos y CSS base
├── backup/                   # Resguardos de datos en formato BSON
└── tsconfig.json             # Configuración del entorno TypeScript
```

### 2. Stack Tecnológico y Capas
El sistema utiliza un stack moderno para máxima eficiencia:
*   **Backend (Lógica de Servidor)**: Programado íntegramente en **TypeScript** para un código tipado y seguro.
*   **Vistas (Frontend)**: Utiliza el motor de plantillas **EJS** para renderizado dinámico desde el servidor, potenciado con **ES Modules** (Vanilla JS) en el cliente.
*   **Estilos (UI)**: **Tailwind CSS v4** para un diseño responsivo y ultraligero.
*   **Persistencia**: **MongoDB** con el ODM **Mongoose**.

### 3. Persistencia y Esquema
La información se almacena en **MongoDB**. Cada modelo cuenta con un esquema estrictamente tipado que incluye marcas de tiempo (`timestamps`) automáticas para auditoría.

### 4. Lógica de Negocio y Casos de Uso
Gestión integral de operaciones bibliotecarias:
*   Registro y actualización de catálogo.
*   Control de préstamos vinculados a usuarios y libros.
*   **Casos de Uso Críticos**: Eliminación en cascada para mantener la integridad referencial (ej: si se elimina un libro, se limpian sus préstamos).

### 5. Validación y Seguridad
*   **Backend**: Validación a nivel de esquema de Mongoose para tipos y campos requeridos.
*   **Frontend**: Validaciones en tiempo real para el usuario y gestión de errores asíncronos.
*   **Seguridad**: Uso de `method-override` para operaciones seguras y sanitización de datos en el servidor Express.

### 6. Metodología y Pedagología
El código está estructurado siguiendo principios de **Arquitectura Limpia**, separando las rutas de la implementación lógica en los controladores. Esto permite que el sistema sea fácil de estudiar y extender para propósitos educativos o profesionales.

---

## ⚠️ Límite de Uso
Este sistema está diseñado para entornos de gestión bibliotecaria interna. En entornos de producción masiva, se recomienda implementar capas de autenticación robustas adicionales (JWT/OAuth) sobre las rutas del API Explorer.

---
© 2026 - Gestión Profesional de Bibliotecas Digitales.
