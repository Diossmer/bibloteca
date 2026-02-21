import mongoose from 'mongoose';

process.loadEnvFile()

/** Inicializa la conexión con MongoDB utilizando las credenciales del entorno. */
const conectarDB = async () => {
    try {
        // Accedemos directamente a process.env
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error('La variable MONGO_URI no está definida en el archivo .env');
        }

        const conn = await mongoose.connect(uri);

        console.log(`✅ Conexión Nativa Exitosa`);
        console.log(`Base de Datos: ${conn.connection.name}`);
        console.log(`URL de la Base de Datos: ${conn.connection.name}`);
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        process.exit(1);
    }
};

/** Punto de anclaje para iniciar la persistencia de datos al arrancar el servidor. */
export default conectarDB;
