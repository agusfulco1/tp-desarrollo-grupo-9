import mongoose from 'mongoose';

//Conexión a la Base de Datos
export class MongoDBClient {
    static async connect() {
        try {
            const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_DB_NAME}?authSource=admin`);

            console.log(`MongoDB is connected: ${conn.connection.host}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    }
}