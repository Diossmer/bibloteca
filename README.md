# 📚 Sistema de Gestión de Biblioteca (SAVAM)

Un ecosistema digital completo diseñado para la administración profesional de bibliotecas, integrando una arquitectura moderna de alto rendimiento con una experiencia de usuario (UX) excepcional.

---

## I. Guía de Inicio Rápido (Quick Start)

### 1. Stack Tecnológico (Core)
El sistema está construido sobre un stack de última generación para garantizar escalabilidad y seguridad:
*   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (Tipado estricto en todo el backend).
*   **Entorno**: [Node.js](https://nodejs.org/) (Motor v20.x+).
*   **Framework**: [Express.js](https://expressjs.com/) (Arquitectura de servidor ligera).
*   **Persistencia**: [MongoDB](https://www.mongodb.com/) (Base de datos NoSQL escalable).
*   **ODM**: [Mongoose](https://mongoosejs.com/) (Gestión de esquemas y modelos).
*   **Vistas**: [EJS](https://ejs.co/) (Motor de plantillas dinámicas).
*   **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) (Diseño atómico y responsivo).

### 2. Requisitos Previos
*   Instalar **Node.js** (v20 o superior).
*   Disponer de una instancia de **MongoDB** (Local o en la nube).
*   Terminal con soporte para comandos `npm`.

### 3. Instalación y Ejecución
Sigue estos pasos en tu terminal:

**Clonar e instalar dependencias**
```bash
npm install
```
**Compilar estilos dinámicos (Tailwind v4)**
```bash
npm run css
```
**Iniciar el entorno de desarrollo con hot-reload**
```bash
npm run dev
```

### 4. Acceso al Sistema
Una vez iniciado el servidor, accede a través de:
*   💻 **Frontend**: [http://localhost:3000](http://localhost:3000)
*   🛠️ **API Explorer**: [http://localhost:3000/api](http://localhost:3000/api)

---

## II. Arquitectura y Organización

### 5. Estructura de Directorios (Desktop Structure)
Organización modular siguiendo estándares profesionales:
```text
.
├── src/
│   ├── app.ts            # Configuración de Express y Middlewares
│   ├── config/           # Conector nativo a MongoDB
│   ├── controllers/      # Lógica de Negocio y Controladores REST
│   ├── models/           # Interfaces y Esquemas de Mongoose
│   ├── routes/           # Definición de Endpoints de la API
│   ├── views/            # Templates EJS (Vistas y Partials)
│   ├── public/           # Scripts JS modulares y CSS compilado
│   └── assets/           # Archivos fuente (CSS base)
├── backup/               # Resguardos de datos (BSON)
└── tsconfig.json         # Directrices de compilación de TypeScript
```

### 6. Arquitectura Limpia (Clean Architecture)
El proyecto implementa una separación clara de responsabilidades:
*   **Decoupling**: Las rutas están separadas de la implementación lógica (controladores).
*   **Inversión de Dependencias**: Los modelos de datos son independientes de la lógica de presentación.

### 7. Capas (Layers)
Se manejan capas delimitadas para facilitar el mantenimiento:
1.  **Capa de Presentación**: EJS y Vanilla JS (UX/UI).
2.  **Capa de Enrutamiento**: Express Routers.
3.  **Capa de Lógica (Controladores)**: Gestión de peticiones y respuestas.
4.  **Capa de Datos (Modelos)**: Interacción directa con MongoDB.

### 8. Patrones de Arquitectura Web
*   **MVC (Modelo-Vista-Controlador)**: Patrón fundamental para la gestión de vistas dinámicas.
*   **RESTful API**: Endpoints prediceibles (`GET`, `POST`, `PUT`, `DELETE`) para la manipulación de recursos.

### 9. Modulación
*   **Backend**: Uso de `import/export` nativos de TypeScript para una modulación tipada.
*   **Frontend**: Implementación de **ES Modules** en el cliente para cargar lógica solo cuando es necesaria.

---

## III. Diseño de Código y Patrones Deep-Dive

### 10. Patrones de Diseño en Programación (Arquitectura)
*   **Middleware Pattern**: Procesamiento secuencial de peticiones (ej: `validateModel`).
*   **Singleton Pattern**: Conexión única y compartida a la base de datos para optimizar recursos.
*   **Factory Pattern**: Generación dinámica de formularios en el frontend basados en configuración JSON.

### 11. Código Limpio (Clean Code)
Se prioriza la legibilidad mediante:
*   **Nomenclatura Asertiva**: Cada variable y función describe exactamente su propósito.
*   **Documentación Técnica**: Comentarios asertivos en cada export, interfaz y objeto clave.

### 12. Pedagología
El código ha sido diseñado como una herramienta de enseñanza, permitiendo que un desarrollador entienda el flujo de datos completo desde el click en la UI hasta la base de datos de forma intuitiva.

---

## IV. Funcionalidad y Datos

### 13. Lógica de Negocio
Soporta las reglas principales del dominio bibliotecario:
*   Gestión de inventario de libros y autores.
*   Control estricto de préstamos activos y devoluciones.
*   Mantenimiento de perfiles de lectores registrados.

### 14. Casos de Uso
*   **Préstamo de Libros**: Flujo completo de salida de ejemplares.
*   **Eliminación en Cascada**: Garantiza que si un libro o usuario se borra, sus registros de préstamo vinculados se eliminen automáticamente para evitar datos huérfanos.

### 15. Persistencia
Utiliza **MongoDB** para un almacenamiento persistente y flexible, ideal para catálogos que pueden crecer o cambiar su estructura dinámicamente.

### 16. Esquema (Schema Design)
Cada modelo (`Libro`, `Usuario`, `Prestamo`, `autors`, `categorias`, `libros`, `prestamos`, `usuarios`) cuenta con:
*   Validaciones de tipo estricto.
*   **Timestamps**: Registro exacto de creación y actualización para auditoría.

---

## V. Calidad, Estética y Seguridad

### 17. Validación
*   **Integridad Dual**: Validación en el servidor (Mongoose) y retroalimentación inmediata en el cliente (JavaScript).

### 18. Seguridad
*   **Sanitización**: Limpieza de datos antes de la persistencia.
*   **Method Override**: Soporte para verbos HTTP avanzados en entornos restringidos.
*   **Middlewares de Validación**: Protección contra modelos inexistentes o IDs inválidos.

### 19. Patrones de Diseño UX/UI (Interfaz y Experiencia)
*   **Modo Oscuro Nativo**: Soporte para temas Light/Dark.
*   **Glassmorphism**: Efectos de translucidez modernos.
*   **Responsive Dual**: Interfaz optimizada para Desktop y Móvil.

### 20. Testing
*   **API Explorer**: Entorno visual integrado para probar cada endpoint de la API REST de forma interactiva.
*   **Manual Verification**: Flujos de prueba documentados para asegurar la calidad de cada Feature.

---

## VI. Gestión del Proyecto y Entorno

### 21. Metodología
Desarrollo ágil e iterativo basado en micro-objetivos, asegurando que cada componente sea funcional antes de avanzar al siguiente punto.

### 22. Fases de Desarrollo
1.  **Fundamentos**: Configuración de entorno y DB.
2.  **Estructura**: Definición de Modelos y Controladores.
3.  **Interfaz**: Diseño de Vistas EJS y Tailwind.
4.  **Lógica**: Implementación de CRUDs dinámicos.
5.  **Pulido**: Documentación asertiva y micro-animaciones.

### 23. Infraestructura
Configuración flexible mediante variables de entorno:
*   `MONGO_URI`: Cadena de conexión a la base de datos.
*   `PORT`: Puerto del servidor web.

### 24. Límite de Uso (⚠️ IMPORTANTE)
Este sistema es ideal para intranets o demos técnicas. Para producción a escala global, se recomienda:
*   Implementar autenticación robusta (JWT).
*   Añadir capas de Rate Limiting.

---
© 2026 - **Biblioteca App** | Gestión Profesional de Bibliotecas Digitales.
