import mongoose, { Schema, Document } from 'mongoose';

export interface IAutor extends Document {
    nombre: string;
    nacionalidad: string;
    fechaNacimiento: Date;
    biografia: string;
}

const autorSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    nacionalidad: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    biografia: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IAutor>('Autor', autorSchema);
