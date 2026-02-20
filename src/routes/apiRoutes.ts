import { Router } from 'express';
import { validateModel, getAll, getOne, create, update, remove } from '../controllers/apiController';

const router = Router();

// Ruta de Explorer API
router.get('/', (req, res) => {
    res.render('api-explorer');
});

// Aplicar middleware de validación a todas las rutas de este router que tengan el parámetro modelName
router.use('/:modelName', validateModel);

router.get('/:modelName', getAll);
router.get('/:modelName/:id', getOne);
router.post('/:modelName', create);
router.put('/:modelName/:id', update);
router.delete('/:modelName/:id', remove);

/** Exportación del enrutador configurado con todas las directrices de la API REST. */
export default router;
