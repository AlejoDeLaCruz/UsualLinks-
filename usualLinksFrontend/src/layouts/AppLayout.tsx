import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import NavigationTabs from "../components/NavigationTabs";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/UsualLinksApi";

export default function AppLayout() {
  const {
    data, //Retorna los datos
    isLoading, //Retorna si esta cargando mientras carga es true y una vez que cargo false
    error, //Retorna el error
    isError, //Retorna un booleano
  } = useQuery({
    queryFn: getUser, //QUE FUNCION VA A HACER LA CONSULTA (la funcion axios o fetch)
    queryKey: ["User"], //ES LA FORMA EN LA QUE REACT QUERY IDENTIFICA EL QUERY Y ES UNICO PARA CADA FUNCION (en este caso getUser)
    retry: 1, //INTENTA UNA SOLA VEZ HACER LA QUERY
    refetchOnWindowFocus: false, //Esto hace que no se hagan mas consultas si cambiamos de pestaña y regresamos a la pagina, es decir evita llamadas reiteradas no deseadas.
  });

  console.log(data);
  console.log(isLoading);
  

  return (
    <>
      <header className="bg-slate-800 py-5">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
          <div className="w-full p-5 lg:p-0 md:w-1/3">
            <img src="/logo.svg" className="w-full block" />
          </div>
          <div className="md:w-1/3 md:flex md:justify-end">
            <button
              className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
              onClick={() => {}}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />
          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={""}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6"></div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
