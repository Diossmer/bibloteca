import { Router } from 'express';
import { getLibros, createLibro, updateLibro, deleteLibro, buscarPorGenero } from '../controllers/libroController';

const router = Router();

router.get('/', getLibros);
router.post('/add', createLibro);
router.put('/edit/:id', updateLibro);
router.delete('/delete/:id', deleteLibro);
router.get('/buscar', buscarPorGenero);

export default router;
