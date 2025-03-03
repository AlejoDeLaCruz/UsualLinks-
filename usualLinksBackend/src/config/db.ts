import colors from 'colors'; 
import mongoose from 'mongoose';

//CONEXION CON LA BASE DE DATOS DE MONGO ATLAS.

//LA BASE DE DATOS ES "linktree_node_typescript" Y SI NO EXISTE LA CREA PARA CONECTARSE A ELLA

export const connectDb = async () => {
    try{
        // "process.env.MONGO_URI" SE CONECTA CON LA VARIABLE DE ENTORNO QUE TIENE LA URL 
        // PARA CON LA CONEXION A LA BASE DE DATOS DE ATLAS (SE AGARRA DEL .env QUE ES EL QUE TIENE 
        // LA URL ESCONDIDA POR SEGURIDAD)
        //CONEXION DE MONGOOSE ORM
        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        //URL PARA VER QUE HOST Y QUE PUERTO ESTAMOS USANDO EN LA BASE DE DATOS
        const url =  `${connection.host}: ${connection.port}`
        console.log(colors.magenta.italic.bold (`mongo conectado en ${url}`));
    }catch (error: any){
        //MANEJO DE ERRORES
        console.log( colors.red.italic.bold (error?.message));
        process.exit(1);   //MANERA DE TERMINAR EL PROYECTO (PORQUE HAY UN ERROR EN LA BASE DE DATOS)
    }
}