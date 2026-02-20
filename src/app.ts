import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import conectarDB from './config/db';
import apiRoutes from './routes/apiRoutes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicialización de variables de entorno y conexión a DB
process.loadEnvFile()
conectarDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Permite usar PUT y DELETE en formularios HTML
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Vistas (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/api', apiRoutes);

// Ruta principal para servir la SPA
app.get('/', (req, res) => {
    res.render('index');
});

// Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
