//EN ESTE ARCHIVO VAN TODAS LAS FUNCIONES QUE VAN A INTERACTUAR CON NUESTRA API (usando react query)

import { isAxiosError } from "axios";
import api from "../config/axios";

export async function getUser() {
  try {
    const { data } = await api.get("/user");
    return data;
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      throw new Error(e.response.data.error);
    }
  }
}
