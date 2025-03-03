import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

//MIDDLEWARE DE VALIDACION DE ERRORES (FORMA DE TENER CODIGO REUTILIZABLE)
 
//MIDDLEWARE PARA DETECTAR ERRORES EN EL REQUEST

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    //GRACIAS A ESTO NOS TIRAN LOS MENSAJES DE VALIDACION (las validaciones que hicimos en el router.ts como la de isEmpty(), etc.)
    let errors = validationResult(req); //FUNCION PARA VER EL RESULTADO DE LA VALIDACION GRACIAS A EXPRESS VALIDATOR
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() }); //MANDAMOS EL ERROR A LA RESPUESTA DEL SERVIDOR
        return;
    }
    next(); //FUNCION PARA IR A LA SIGUIENTE FUNCION UNA VEZ QUE SE HAYA EJECUTADO handleInputErrors y poder ejecutar por ejemplo login si es que no hay errores.
}