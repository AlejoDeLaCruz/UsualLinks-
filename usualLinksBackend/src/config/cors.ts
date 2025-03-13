//ARCHIVO PARA SOPORTAR Y CONFIGURAR CORS
import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {    //LE ASIGNAMOS EL TYPE
    origin: function (origin, callback) {     //RECIBE DOS PARAMETROS, origin es de donde se esta enviando la peticion, quien esta tratando de conectarse(si es seguro permitimos la conexion)
        console.log(origin); //ESTO DEVUELVE EL DOMINIO DEL FRONT O DESDE DONDE SE ESTE HACIENDO UNA PETICION AL SERVIDOR (EN ESTE CASO 'http://localhost:5173')
        console.log(process.argv); //VECTOR DE ARGUMENTOS 
        const whitelist = [process.env.FRONTEND_URL] //CREAMOS UN ARRAY CON LOS ORIGIN VALIDOS PARA QUE FUNCIONEN LOS CORS

        if (process.argv[2] === '--api') { //VALIDAMOS SI SE UTILIZO LA VARIABLE --api EN EL npm run dev:api (mirar scripts del package json) PARA SABER SI HAY QUE PERMITIR EL ORIGIN UNDEFINED O NO (permitimos el origin undefined para poder hacer pruebas desde POSTMAN)
            whitelist.push(undefined)   
        }

        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS'));
        }
    }
}