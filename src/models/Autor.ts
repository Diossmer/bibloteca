import mongoose, { Schema, Document } from 'mongoose';

/** Interfaz representativa de la entidad Autor, asegurando integridad en sus propiedades. */
export interface IAutor extends Document {
    nombre: string;
    nacionalidad: string;
    fechaNacimiento: Date;
    biografia: string;
}

/** Definición de campos y reglas de validación para el almacenamiento de autores. */
const autorSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    nacionalidad: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    biografia: { type: String, required: true }
}, { timestamps: true });

/** Modelo Autor listo para ser inyectado en controladores y gestionar la persistencia. */
export default mongoose.model<IAutor>('Autor', autorSchema);
