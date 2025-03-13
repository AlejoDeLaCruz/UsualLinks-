import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { LoginForm } from "../types";
import { isAxiosError } from "axios";
import { api } from "../config/axios";
import { toast } from "sonner";

export default function LoginView() {
  const initialValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = async (formData: LoginForm) => {
    console.log(formData);
    try {
      const {data} = await api.post('/auth/login', formData)
      console.log(data)
      localStorage.setItem('AUTH_TOKEN', data); //PONEMOS EL TOKEN DE JWT EN LOCALSTORAGE
    }catch(e){
      if(isAxiosError(e) && e.response){
        toast.error(e.response.data.error);
      }
    }
  };

  return (
    <>
      <div className=" py-10 text-center">
        <h1 className=" text-4xl text-white font-bold">Iniciar sesión</h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="bg-white px-5 py-10 rounded-lg space-y-6 mt-10 max-w-lg mx-auto"
          noValidate
        >
          <div className="grid grid-cols-1 space-y-3">
            <label htmlFor="email" className="text-2xl text-slate-500">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <div className="grid grid-cols-1 space-y-3">
            <label htmlFor="password" className="text-2xl text-slate-500">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password de Registro"
              className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
            value="Iniciar Sesión"
          />
        </form>
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
