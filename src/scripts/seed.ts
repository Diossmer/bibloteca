import mongoose from 'mongoose';
import Autor from '../models/Autor.js';
import Categoria from '../models/Categoria.js';
import Libro from '../models/Libro.js';
import Usuario from '../models/Usuario.js';

process.loadEnvFile();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/biblioteca';
// Seed es para cargar la data de prueba.
const seedDatabase = async () => {
    try {
        // Esto es para conectar a la base de datos.
        await mongoose.connect(MONGO_URI);
        console.log('🌱 Conectado a MongoDB para el seed...');

        // Limpiar colecciones existentes (Opcional, pero recomendado para un seed limpio)
        await Autor.deleteMany({});
        await Categoria.deleteMany({});
        await Libro.deleteMany({});
        await Usuario.deleteMany({});
        console.log('🧹 Colecciones limpiadas.');

        // 1. Crear Categorías
        const categorias = await Categoria.insertMany([
            { nombre: 'Ficción', descripcion: 'Libros de narrativa y mundos imaginarios', pasillo: 'A', estante: '1' },
            { nombre: 'Ciencia', descripcion: 'Libros sobre descubrimientos y teoría científica', pasillo: 'B', estante: '2' },
            { nombre: 'Historia', descripcion: 'Relatos y análisis de hechos pasados', pasillo: 'C', estante: '3' },
            { nombre: 'Tecnología', descripcion: 'Informática, programación y avances técnicos', pasillo: 'D', estante: '4' }
        ]);
        console.log(`✅ ${categorias.length} Categorías creadas.`);

        // 2. Crear Autores
        const autores = await Autor.insertMany([
            { nombre: 'Gabriel García Márquez', nacionalidad: 'Colombiana', fechaNacimiento: new Date('1927-03-06'), biografia: 'Premio Nobel de Literatura.' },
            { nombre: 'Stephen Hawking', nacionalidad: 'Británica', fechaNacimiento: new Date('1942-01-08'), biografia: 'Físico teórico y cosmólogo.' },
            { nombre: 'Yuval Noah Harari', nacionalidad: 'Israelí', fechaNacimiento: new Date('1976-02-24'), biografia: 'Historiador y escritor.' }
        ]);
        console.log(`✅ ${autores.length} Autores creados.`);

        // 3. Crear Usuarios
        const usuarios = await Usuario.insertMany([
            { nombre: 'Juan Pérez', email: 'juan@example.com', telefono: '123456789', direccion: 'Calle Falsa 123', membresiaActiva: true },
            { nombre: 'María López', email: 'maria@example.com', telefono: '987654321', direccion: 'Avenida Siempre Viva 742', membresiaActiva: true }
        ]);
        console.log(`✅ ${usuarios.length} Usuarios creados.`);

        // 4. Crear Libros
        const libros = await Libro.insertMany([
            { titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez', isbn: '978-0307474728', anioPublicacion: 1967, genero: 'Ficción' },
            { titulo: 'Breve Historia del Tiempo', autor: 'Stephen Hawking', isbn: '978-0553380163', anioPublicacion: 1988, genero: 'Ciencia' },
            { titulo: 'Sapiens', autor: 'Yuval Noah Harari', isbn: '978-0062316097', anioPublicacion: 2011, genero: 'Historia' }
        ]);
        console.log(`✅ ${libros.length} Libros creados.`);

        console.log('🚀 Seed completado con éxito!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error durante el seed:', error);
        process.exit(1);
    }
};

seedDatabase();
