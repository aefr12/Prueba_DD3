import express, {Application} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import gameRoutes from '../routes/game';
import db from '../database/connection';
import { FillPalabras } from '../database/fillPalabras';

class Server {
    private app: Application;
    private port: string;
    private paths = {
        usuarios: '/api/game'
    }

    constructor(){
        this.app = express();
        this.port = process.env.puerto || '3500';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    async dbConnection(){
        try{
            await db.authenticate();
            console.log("Conexion a BD establecida");
            FillPalabras();
        }
        catch(error:any){
            throw new Error(error);
        }
    }

    routes(){
        this.app.use(this.paths.usuarios, gameRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto: ",this.port);
        });
    }
}

export default Server;