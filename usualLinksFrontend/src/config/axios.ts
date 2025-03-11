//ARCHIVO DE CONFIGURACIONES DE AXIOS PARA PODER REUTILIZAR COSAS
import axios from 'axios';

//CADA VEZ QUE HAGAMOS UN LLAMADO DE AXIOS ESTE VA A SER EL PRINCIPIO DE LA URL
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL //MANERA DE LLAMAR VARIABLES DE ENTORNO EN VITE
})