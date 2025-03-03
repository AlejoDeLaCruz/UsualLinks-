import { Link } from "react-router-dom";

export default function RegisterView() {
  return (
    <>
      <div className="font-black">RegisterView</div>
      <nav>
        <Link to="/auth/register">
          {" "}
          {/*<Link/> ES MUCHO MEJOR QUE <a/> PARA NAVEGAR ENTRE URL´s */}
          ¿Ya tienes cuenta?, ¡inicia sesión!
        </Link>
      </nav>
    </>
  );
}
