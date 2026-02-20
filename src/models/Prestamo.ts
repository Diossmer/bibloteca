import mongoose, { Schema, Document } from 'mongoose';

export interface IPrestamo extends Document {
    libroId: string;
    usuarioId: string;
    fechaPrestamo: Date;
    fechaDevolucion: Date;
    estado: string;
}

const prestamoSchema: Schema = new Schema({
    libroId: { type: String, required: true },
    usuarioId: { type: String, required: true },
    fechaPrestamo: { type: Date, required: true },
    fechaDevolucion: { type: Date, required: true },
    estado: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IPrestamo>('Prestamo', prestamoSchema);