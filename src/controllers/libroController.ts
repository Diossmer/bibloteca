import { Request, Response } from 'express';
import Libro from '../models/Libro';

// READ: Obtener todos los libros y renderizar la vista
export const getLibros = async (req: Request, res: Response) => {
    try {
        const libros = await Libro.find();
        res.render('index', { libros });
    } catch (error) {
        res.status(500).send('Error al obtener los libros');
    }
};

// CREATE: Crear un nuevo libro
export const createLibro = async (req: Request, res: Response) => {
    try {
        const { titulo, autor, isbn, anioPublicacion, genero } = req.body;
        const nuevoLibro = new Libro({ titulo, autor, isbn, anioPublicacion, genero });
        await nuevoLibro.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error al crear el libro');
    }
};

// UPDATE: Actualizar un libro existente
export const updateLibro = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Libro.findByIdAndUpdate(id, req.body);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error al actualizar');
    }
};

// DELETE: Borrar un libro
export const deleteLibro = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Libro.findByIdAndDelete(id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error al eliminar');
    }
};

// Consulta sencilla: Buscar por género
export const buscarPorGenero = async (req: Request, res: Response) => {
    try {
        const { genero } = req.query;
        const libros = await Libro.find({ genero: new RegExp(genero as string, 'i') });
        res.render('index', { libros });
    } catch (error) {
        res.status(500).send('Error en la búsqueda');
    }
};
