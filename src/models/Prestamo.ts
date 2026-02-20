import mongoose, { Schema, Document } from 'mongoose';

/** Interfaz central para la gestión de Préstamos, vinculando libros y usuarios. */
export interface IPrestamo extends Document {
    libroId: string;
    usuarioId: string;
    fechaPrestamo: Date;
    fechaDevolucion: Date;
    estado: string;
}

/** Esquema de validación y estructura para el registro de transacciones de préstamos. */
const prestamoSchema: Schema = new Schema({
    libroId: { type: String, required: true },
    usuarioId: { type: String, required: true },
    fechaPrestamo: { type: Date, required: true },
    fechaDevolucion: { type: Date, required: true },
    estado: { type: String, required: true }
}, { timestamps: true });

/** Modelo Prestamo que permite el control de flujo de salida y entrada de libros. */
export default mongoose.model<IPrestamo>('Prestamo', prestamoSchema);