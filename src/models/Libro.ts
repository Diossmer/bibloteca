import mongoose, { Schema, Document } from 'mongoose';

/** Interfaz que define la estructura estricta de un objeto Libro dentro de la aplicación. */
export interface ILibro extends Document {
    titulo: string;
    autor: string;
    isbn: string;
    anioPublicacion: number;
    genero: string;
}

/** Esquema de Mongoose que estructura la persistencia de datos de los Libros en MongoDB. */
const LibroSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    anioPublicacion: { type: Number, required: true },
    genero: { type: String, required: true }
}, { timestamps: true });

/** Exportación del modelo Libro para realizar operaciones CRUD en la base de datos. */
export default mongoose.model<ILibro>('Libro', LibroSchema);
