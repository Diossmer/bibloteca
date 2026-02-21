# 📚 Sistema de Gestión de Biblioteca

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

### 2. Requisitos Previos (Linux)
*   Instalar **Node.js** (v20 o superior).
*   Disponer de una instancia de **MongoDB** (Local o en la nube).
*   Terminal con soporte para comandos `npm`.

### 3. Instalación y Ejecución (Terminal)
Sigue estos pasos en tu terminal:
**Clonar e instalar dependencias**
```bash
git clone https://github.com/Diossmer/bibloteca.git
```
**Entrar al directorio**
```bash
cd bibloteca
```
**Instalar dependencias**
```bash
npm install
```
**Compilar estilos dinámicos (Tailwind v4)**
```bash
npm run css
```
>[!IMPORTANT]
>Antes de iniciar el entorno deberías tener el archivo creado <b>.env</b> el cual está en un archivo <b>.env_example </b>, puede es clonar el archivo y/o quitar la palabra <b>example</b>.

**Iniciar el entorno de desarrollo con hot-reload**
```bash
npm run dev
```

**Poblar base de datos (Seed)**
Si deseas llenar la base de datos con datos iniciales (autores, categorías, libros y usuarios):
```bash
npm run seed
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
biblioteca/
├── src/                        # Lógica del Sistema
│ ├── app.ts                    # Punto de Entrada (Configuración Express)
│ ├── config/                   # Configuración
│ │ └── db.ts                   # Conector Base de Datos (Mongoose)
│ ├── models/                   # CAPA DE DATOS (Esquemas de Datos)
│ │ ├── Libro.ts                # Estructura de Libro
│ │ ├── Autor.ts                # Estructura de Autor
│ │ ├── Categoria.ts            # Estructura de Categoría
│ │ ├── Prestamo.ts             # Estructura de Préstamo
│ │ └── Usuario.ts              # Estructura de Usuario
│ ├── controllers/              # CAPA DE LÓGICA (Funcionalidad)
│ │ ├── apiController.ts        # CRUD Genérico Dinámico
│ │ └── libroController.ts      # Lógica Específica de Libros
│ ├── routes/                   # CAPA DE ENRUTAMIENTO (Endpoints)
│ │ ├── apiRoutes.ts            # Rutas /api/*
│ │ └── libroRoutes.ts          # Rutas /libros/*
│ ├── views/                    # CAPA DE PRESENTACIÓN (Servidor)
│ │ ├── index.ejs               # Vista Principal SPA
│ │ └── partials/               # Componentes Reutilizables
│ └── public/                   # CAPA DE CLIENTE (Navegador)
│ ├── js/                       # Lógica Modular JS
│ │ ├── main.js                 # Inicializador de la Aplicación
│ │ └── modules/                # Módulos (api, ui, config, state)
│ └── css/                      # Estilos Compilados (Tailwind)
├── scripts/                    # Automatización de la base de datos
│ │ ├── seed.ts                 # para poblar la DB con datos iniciales
├── .env                        # cluster, variable de entorno
├── package.json                # Gestión de Dependencias
└── tsconfig.json               # Directrices de compilación de TypeScript
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

## VII. Mantenimiento y Gestión de Datos

### 25. Seed de Datos (Semilla)
El sistema incluye un script automatizado para poblar la base de datos con información de prueba. Esto es útil para demostraciones o para iniciar el desarrollo sin datos manuales.
*   **Comando**: `npm run seed`
*   **Ubicación**: [seed.ts](file:///var/www/html/biblioteca-app/src/scripts/seed.ts)

### 26. Backup y Restauración (Resguardos)
Es fundamental mantener copias de seguridad de la información. El proyecto utiliza herramientas estándar de MongoDB para esta tarea.

**Realizar un Backup (Exportar)**
Ejecuta este comando para generar un respaldo en la carpeta `./backup/`:
```bash
mongodump --db biblioteca --out ./backup/
```

**Restaurar un Backup (Importar)**
Para recuperar los datos y **sobrescribir** la base de datos actual con el respaldo:
```bash
mongorestore --db biblioteca --drop ./backup/biblioteca/
```

> [!IMPORTANT]
> - Asegúrate de estar en la raíz del proyecto al ejecutar el comando.
> - El flag `--drop` borra las colecciones actuales antes de importar el backup, evitando duplicados.
> - Los archivos `.bson` y `.metadata.json` generados en la carpeta `backup` son compatibles con cualquier instancia de MongoDB.

---
© 2026 - **Biblioteca App** | Gestión Profesional de Bibliotecas Digitales.
