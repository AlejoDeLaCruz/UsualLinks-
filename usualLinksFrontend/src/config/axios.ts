//ARCHIVO DE CONFIGURACIONES DE AXIOS PARA PODER REUTILIZAR COSAS
import axios from "axios";

//CADA VEZ QUE HAGAMOS UN LLAMADO DE AXIOS ESTE VA A SER EL PRINCIPIO DE LA URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //MANERA DE LLAMAR VARIABLES DE ENTORNO EN VITE
});

//Un interceptor permite que cuando utilicemos la instancia de api tambien se envie el json web token automaticamente

//Usamos .request porque en este caso estamos enviando el JWT pero tambien podriamos usar response para recibir una respuesta. El .use es igual a express
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;   //ESTE IF ENVIA AUTOMATICAMENTE EL TOKEN SI ES QUE SE REQUIERE 
  }
  return config;
}); //ACTUALMENTE SE ESTA PASANDO EL INTERCEPTOR EN AUTOMATICO, es decir no hace falta llamarlo ni instanciarlo en ningun otro lado.

export default api;
