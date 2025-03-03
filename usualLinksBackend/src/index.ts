import colors from 'colors';    //colores para que se vean mejor los logs de la consola
import app from "./server";

//ESTE ARCHIVO SIRVE PARA INICIALIZAR SERVIDOR

const port = process.env.PORT || 3001; //process.env.PORT es el puerto que nos va a asignar el hosting que usemos.

app.listen(port, () => {
    console.log(colors.cyan.italic (`Servidor funcionando en: ${port}`) );
})          //PUERTO 3001 DEL SERVIDOR