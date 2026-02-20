import mongoose from 'mongoose';

process.loadEnvFile()

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
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        process.exit(1);
    }
};

export default conectarDB;
