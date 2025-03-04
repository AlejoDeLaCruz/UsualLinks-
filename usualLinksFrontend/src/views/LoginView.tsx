import { Link } from "react-router-dom";

export default function LoginView() {
  return (
    <>
      <div className=" py-10">
        <nav>
          <Link className=" text-white" to="/auth/register">
            {" "}
            {/*<Link/> ES MUCHO MEJOR QUE <a/> PARA NAVEGAR ENTRE URL´s */}
            No tienes cuenta, ¡registrate!
          </Link>
        </nav>
      </div>
    </>
  );
}
