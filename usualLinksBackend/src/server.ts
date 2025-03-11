import express from "express";          //SINTAXIS DE ESM ECMASCRIPT MODULES (modificar el package.json para poder usarla)
import 'dotenv/config';
import router from "./router";
import { connectDb } from './config/db'
import { corsConfig } from "./config/cors";
import cors from 'cors'

//ESTE ARCHIVO TIENE LA CONFIGURACION DEL SERVIDOR, CONECTA EL SERVIDOR CON LA BASE DE DATOS, CORS, ETC.

//const express = require("express");       //SINTAXIS DE EXPORT CON COMMON.JS

//CONECTAMOS LA BASE AL SERVIDOR:

connectDb();

const app = express();          //INSTANCIA DEL SERVIDOR DE EXPRESS, CREACION DE APP EN EXPRESS

//HABILITAR CONFIGURACION DE CORS
app.use(cors(corsConfig))       //app.use añade globalmente cors

// HABILITAR LEER DATOS DE FORMULARIOS (la funcion es nativa de EXPRESS)

app.use(express.json())    //usamos "use" porque queremos que este en todos los request y le ponemos .json() para que acepte json

app.use('/', router);   //router va a entrar a router y va a buscar que ruta tiene el nombre especificado



//USAMOS NODEMON PARA QUE SE RECARGUE AUTOMATICAMENTE EL SERVIDOR AL HACER CAMBIOS.

// "scripts": {
//     "dev": "nodemon index.js"
//   },


export default app;