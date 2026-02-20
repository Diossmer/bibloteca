import mongoose, { Schema, Document } from 'mongoose';

export interface ICategoria extends Document {
    nombre: string;
    descripcion: string;
    pasillo: string;
    estante: string;
}

const categoriaSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    pasillo: { type: String, required: true },
    estante: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<ICategoria>('Categoria', categoriaSchema);