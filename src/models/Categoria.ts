import mongoose, { Schema, Document } from 'mongoose';

/** Estructura de contrato para las Categorías, facilitando la organización del inventario. */
export interface ICategoria extends Document {
    nombre: string;
    descripcion: string;
    pasillo: string;
    estante: string;
}

/** Esquema técnico que mapea la colección de categorías en la base de datos. */
const categoriaSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    pasillo: { type: String, required: true },
    estante: { type: String, required: true }
}, { timestamps: true });

/** Objeto de acceso a datos para la entidad Categoría, exponiendo métodos de Mongoose. */
export default mongoose.model<ICategoria>('Categoria', categoriaSchema);