import { Request, Response } from 'express';
import Libro from '../models/Libro';
import Autor from '../models/Autor';
import Categoria from '../models/Categoria';
import Prestamo from '../models/Prestamo';
import Usuario from '../models/Usuario';

// Mapa de modelos usando el nombre en plural para coincidir con la URL
const models: { [key: string]: any } = {
    libros: Libro,
    autores: Autor,
    categorias: Categoria,
    prestamos: Prestamo,
    usuarios: Usuario
};

// Middleware para verificar si el modelo existe
export const validateModel = (req: Request, res: Response, next: Function) => {
    const modelName = String(req.params.modelName);
    if (!models[modelName]) {
        return res.status(404).json({ error: `Modelo '${modelName}' no encontrado` });
    }
    res.locals.ModelClass = models[modelName];
    next();
};

// GET /api/:modelName -> Listar todos
export const getAll = async (req: Request, res: Response) => {
    try {
        const Model = res.locals.ModelClass;
        const data = await Model.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

// GET /api/:modelName/:id -> Obtener uno por ID
export const getOne = async (req: Request, res: Response) => {
    try {
        const Model = res.locals.ModelClass;
        const { id } = req.params;
        const documento = await Model.findById(id);
        if (!documento) return res.status(404).json({ error: 'Documento no encontrado' });
        res.json(documento);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el documento' });
    }
};

// POST /api/:modelName -> Crear
export const create = async (req: Request, res: Response) => {
    try {
        const Model = res.locals.ModelClass;
        const bodyData = { ...req.body };

        const nuevoDocumento = new Model(bodyData);
        await nuevoDocumento.save();
        res.status(201).json(nuevoDocumento);
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Error al crear el documento' });
    }
};

// PUT /api/:modelName/:id -> Actualizar
export const update = async (req: Request, res: Response) => {
    try {
        const Model = res.locals.ModelClass;
        const { id } = req.params;
        const bodyData = { ...req.body };

        const documentoActualizado = await Model.findByIdAndUpdate(id, bodyData, { new: true });
        if (!documentoActualizado) return res.status(404).json({ error: 'Documento no encontrado' });

        res.json(documentoActualizado);
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Error al actualizar el documento' });
    }
};

// DELETE /api/:modelName/:id -> Eliminar
export const remove = async (req: Request, res: Response) => {
    try {
        const Model = res.locals.ModelClass;
        const { id } = req.params;
        const documentoEliminado = await Model.findByIdAndDelete(id);

        if (!documentoEliminado) return res.status(404).json({ error: 'Documento no encontrado' });

        // Eliminación en Cascada
        const modelName = String(req.params.modelName);
        if (modelName === 'libros') {
            await models.prestamos.deleteMany({ libroId: id });
        } else if (modelName === 'usuarios') {
            await models.prestamos.deleteMany({ usuarioId: id });
        }

        res.json({ message: 'Documento eliminado correctamente', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el documento' });
    }
};
