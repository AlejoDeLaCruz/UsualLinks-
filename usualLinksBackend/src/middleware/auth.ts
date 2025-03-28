import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, {InterfaceUser} from "../models/User";

declare global {
    namespace Express {
        interface Request {
            user?: InterfaceUser
        }
    }
}   //TODO ESTE DECLARE LO QUE HACE ES MODIFICAR EL OBJETO Request QUE ES NATIVO DE EXPRESS Y LE AGREGA UN CAMPO user QUE TIENE COMO VALOR UNA INTERFACE USER

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //CADA USUARIO AUTENTICADO VA A ENVIAR SU JWT EN LOS HEADERS DE AUTORIZACION
  console.log(req.headers.authorization); //Esto retorna el JWT en el formato Bearer (JWT)
  const bearer = req.headers.authorization;

  if (!bearer) {
    const error = new Error("No Autorizado");
    res.status(401).json({ error: error.message });
    return;
  }

  //Validacion para manejar si el Bearer esta vacío
  const [, token] = bearer.split(" "); //Usamos array destructuring para separar 'Bearer' del JWT e ignorar el espacio del medio solamente tomames el JWT

  if (!token) {
    const error = new Error("No Autorizado");
    res.status(401).json({ error: error.message });
    return;
  }

  //Verificamos si el JWT es valido
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof result == "object" && result.id) {
      const user = await User.findById(result.id).select("-password"); //Gracias a mongoose (el select -password trae todos los campos menos el password)
      if (!user) {
        const error = new Error("El usuario no existe");
        res.status(404).json({ error: error.message });
        return;
      }
      req.user = user;
      next(); //Hacemos que pase al siguiente metodo
    }
  } catch (e) {
    res.status(500).json({ error: "Token no valido" });
  }
};
