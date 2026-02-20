import mongoose, { Schema, Document } from 'mongoose';

export interface ILibro extends Document {
    titulo: string;
    autor: string;
    isbn: string;
    anioPublicacion: number;
    genero: string;
}

const LibroSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    anioPublicacion: { type: Number, required: true },
    genero: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<ILibro>('Libro', LibroSchema);
