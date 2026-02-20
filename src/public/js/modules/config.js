export const MODELS_CONFIG = {
    libros: {
        title: 'Catálogo de Libros',
        desc: 'Inventario general de ejemplares y existencias.',
        icon: '📚',
        fields: [
            { name: 'titulo', label: 'Título del libro', type: 'text', required: true },
            { name: 'autor', label: 'Autor Principal', type: 'text', required: true },
            { name: 'isbn', label: 'Código ISBN', type: 'text', required: true },
            { name: 'anioPublicacion', label: 'Año de Pub.', type: 'number', required: true, width: 'half' },
            { name: 'genero', label: 'Categoría/Género', type: 'text', required: true, width: 'half' }
        ]
    },
    autores: {
        title: 'Directorio de Autores',
        desc: 'Información y registros biográficos.',
        icon: '👥',
        fields: [
            { name: 'nombre', label: 'Nombre Completo', type: 'text', required: true },
            { name: 'nacionalidad', label: 'País de Origen', type: 'text', required: true, width: 'half' },
            { name: 'fechaNacimiento', label: 'Fecha de Nacimiento', type: 'date', required: true, width: 'half' },
            { name: 'biografia', label: 'Perfil Biográfico', type: 'textarea', required: true }
        ]
    },
    categorias: {
        title: 'Clasificaciones',
        desc: 'Organización física y temática del sistema.',
        icon: '🏷️',
        fields: [
            { name: 'nombre', label: 'Nombre de Sección', type: 'text', required: true },
            { name: 'pasillo', label: 'Ubicación (Pasillo/Bloque)', type: 'text', required: true, width: 'half' },
            { name: 'estante', label: 'Nivel/Estante', type: 'text', required: true, width: 'half' },
            { name: 'descripcion', label: 'Nota Descriptiva', type: 'textarea', required: true }
        ]
    },
    prestamos: {
        title: 'Control de Préstamos',
        desc: 'Gestión de salidas y vencimientos del inventario.',
        icon: '📑',
        fields: [
            { name: 'libroId', label: 'ID del Libro', type: 'text', required: true },
            { name: 'usuarioId', label: 'ID del Lector', type: 'text', required: true },
            { name: 'fechaPrestamo', label: 'Fecha Emisión', type: 'date', required: true, width: 'half' },
            { name: 'fechaDevolucion', label: 'Vencimiento', type: 'date', required: true, width: 'half' },
            { name: 'estado', label: 'Estado Actual', type: 'text', required: true }
        ]
    },
    usuarios: {
        title: 'Gestor de Usuarios',
        desc: 'Base de datos de lectores registrados en el sistema.',
        icon: '👤',
        fields: [
            { name: 'nombre', label: 'Nombre Legal', type: 'text', required: true },
            { name: 'email', label: 'Correo Electrónico', type: 'email', required: true },
            { name: 'telefono', label: 'Teléfono Contacto', type: 'text', required: true, width: 'half' },
            { name: 'membresiaActiva', label: 'Status Membresía (true/false)', type: 'text', required: true, width: 'half' },
            { name: 'direccion', label: 'Dirección Física', type: 'textarea', required: true }
        ]
    }
};
