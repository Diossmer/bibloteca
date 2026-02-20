import mongoose, { Schema, Document } from 'mongoose';

export interface IUsuario extends Document {
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    membresiaActiva: boolean;
}

const usuarioSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
    membresiaActiva: { type: Boolean, required: true }
}, { timestamps: true });

export default mongoose.model<IUsuario>('Usuario', usuarioSchema);