import mongoose, { Schema, Document } from 'mongoose';

/** Definición técnica del perfil de Usuario, garantizando coherencia en los datos del lector. */
export interface IUsuario extends Document {
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    membresiaActiva: boolean;
}

/** Configuración del esquema de Usuario para la base de datos no relacional. */
const usuarioSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
    membresiaActiva: { type: Boolean, required: true }
}, { timestamps: true });

/** Punto de entrada principal para interactuar con la colección de Usuarios en la BD. */
export default mongoose.model<IUsuario>('Usuario', usuarioSchema);