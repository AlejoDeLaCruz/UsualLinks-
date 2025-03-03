//ESTE ARCHIVO TIENE LAS RUTAS DE URL DE LOS METODOS (OSEA LAS URL QUE TIENEN LOS METODOS GET, POST, PUT, DELETE)
import { Router } from "express";
import { body } from "express-validator"; //EXPRESS VALIDATOR SIRVE PARA VALIDAR COSAS CON EXPRESS EN ESTE CASO EL BODY (LO QUE ENVIA EL USUARIO)
import { createAccount, login } from "./handlers/index";
import { handleInputErrors } from "./middleware/validation";

const router = Router();
 
//ROUTING

//EL GET SIEMPRE TOMA REQ Y RES
//Cuando usamos una url mandamos informacion como que navegador estamos usando, en que parte de la pagina estamos y mucho mas
//toda esa informacion es parte del REQ

//El RES es la respuesta de la app.

//RUTAS:

// router.get('/', (req, res) => {
//     res.send("Hola mundo en express")   //send es algo que vamos a enviar como html
// });

// router.get('/api/us', (req, res) => {
//     res.send("Us")   //send es algo que vamos a enviar como html
// });

// router.get('/blog', (req, res) => {
//     res.send("Blog")   //send es algo que vamos a enviar como html
// });

//LANDING PAG

router.get("/", (req, res) => {
  res.send("Hola mundo esta es la pagina principal");
});

//AUTENTICACION Y REGISTRO

//FORMA ORIGINAL DE HACERLO SIN REEMPAZAR EL CALLBACK:

// router.post('/auth/register', async (req, res) => {
//     try {
//         /* const user = await User.create(req.body); */
//         const user = new User(req.body);
//         await user.save();
//         res.status(201).json({success: true, data: user})
//     }catch(error: any){
//         res.status(400).json({success: false, data: error.message})
//     }
//     await User.create(req.body);
// })

//NUEVA FORMA DE HACERLO REEMPLAZANDO EL CALLBACK POR UNA FUNCION MAS PROLIJAMENTE:

router.post(
  "/auth/register",
  //VALIDACIONES DE EXPRESS VALIDATOR CON BODY()
  //que es la funcion que reconoce el body osea, lo que envia el usuario en wel formulario:
  body("handle")
    .notEmpty()
    .withMessage("El username no puede ser vacío"),
  body("name")
    .notEmpty()
    .withMessage("El nombre no puede ser vacío"),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Email no válido"),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  handleInputErrors,
  createAccount
);

router.post('/auth/login',
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Email no válido"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),
  handleInputErrors,
  login
);

export default router;
