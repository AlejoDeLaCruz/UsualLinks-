//ARCHIVO PARA SOPORTAR Y CONFIGURAR CORS
import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {    //LE ASIGNAMOS EL TYPE
    origin: function (origin, callback) {     //RECIBE DOS PARAMETROS, origin es de donde se esta enviando la peticion, quien esta tratando de conectarse(si es seguro permitimos la conexion)
        console.log(origin); //ESTO DEVUELVE EL DOMINIO DEL FRONT O DESDE DONDE SE ESTE HACIENDO UNA PETICION AL SERVIDOR (EN ESTE CASO 'http://localhost:5173')
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS'));
        }
    }
}