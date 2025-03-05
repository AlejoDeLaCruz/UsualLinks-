import { Link } from "react-router-dom";

export default function LoginView() {
  return (
    <>
      <div className=" py-10">
        <h1 className=" text-4xl text-white font-bold">Iniciar sesión</h1>
        <nav className=" mt-10">
          <Link className=" text-lg block text-white" to="/auth/register">
            {" "}
            {/*<Link/> ES MUCHO MEJOR QUE <a/> PARA NAVEGAR ENTRE URL´s */}
            No tienes cuenta, ¡registrate!
          </Link>
        </nav>
      </div>
    </>
  );
}
