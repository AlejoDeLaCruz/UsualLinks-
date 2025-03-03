//ESTE ARCHIVO SE ENCARGA DE MANEJAR EL REQUEST Y EL TIPO DE PETICION PARA REALIZAR LAS ACCIONES
//ES DECIR TIENE LA REALIZACION DE LOS METODOS.
import type { Request, Response } from "express"; //IMPORTAMOS LOS TIPOS DE REQ Y RES DESDE EXPRESS PARA QUE EL TYPE SEA CORRECTO
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import slug from "slug";
import { validationResult } from "express-validator";

export const createAccount = async (req: Request, res: Response) => {
  try {
    /* const user = await User.create(req.body); */ // <------- PRIMERA MANERA DE AGREGAR REGISTROS GRACIAS AL ORM PODEMOS USAR ESTA FORMA SIN HACER TODO EL SQL
    const { default: slugify } = await import("slug");
    const { email, password } = req.body;

    const userExists = await User.findOne({ email }); //findOne es un metodo de MONGOOSE que es similar al WHERE de SQL.

    if (userExists) {
      const error = new Error("El usuario ya esta registrado");
      res.status(409).json({ error: error.message });
      return;
    }

    const handle = slugify(req.body.handle, "");

    const handleExists = await User.findOne({ handle });
    if (handleExists) {
      const error = new Error("Nombre de usuario no disponible");
      res.status(409).json({ error: error.message });
      return;
    }

    const user = new User(req.body);
    user.password = await hashPassword(password); //MANERA DE HASHEAR EL PASSWORD CON BCRYPT
    user.handle = handle; //CREAMOS EL HANDLE CON SU FORMATO AMIGABLE (slugify es la libreria que hace esto)
    await user.save(); // <------- SEGUNDA MANERA DE AGREGAR REGISTROS
    res.status(200).json({ success: true, data: user }); //RETORNAR UN STATUS Y UNA RESPUESTA
  } catch (e: any) {
    res.status(404).json({ success: false, data: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email }); //ESTO TIENE QUE SER ASINCRONO PARA QUE SE EJECUTE CORRECTAMENTE
    if (!userExists) {
      const error = new Error("El usuario no existe");
      res.status(404).json({ error: error.message });
      return;
    }

    //Comprobar si la password es correcta

    const isPasswordCorrect = await checkPassword(password, userExists.password); //ESTO TIENE QUE SER ASINCRONO TAMBIEN CON EL AWAIT

    if (!isPasswordCorrect) {
      const error = new Error("La contraseña no es correcta");
      res.status(401).json({ error: error.message });
      return;
    }

    res.send('Autenticando...')
  } catch (e: any) {
    res.status(404).json({ success: false, data: e.message });
  }
};
