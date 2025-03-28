import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"; //Hook para formularios de react hook form
import type { RegisterForm } from "../types/index";
import ErrorMessage from "../components/ErrorMessage";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import api from "../config/axios";

export default function RegisterView() {
  const initialValues: RegisterForm = {
    name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register, //CONECTA EL CODIGO HTML CON REACT-HOOK-FORM
    watch,
    reset,
    handleSubmit, //ENVIA EL FORMULARIO
    formState: { errors }, //CONTIENE LOS MENSAJES DE ERROR DE LOS REQUIRED
  } = useForm({ defaultValues: initialValues }); //INSTANCIA DE useForm Y SUS METODOS (hanldeSubmit, register, etc) con los initialValues

  const handleRegister = async (formData: RegisterForm) => {
    console.log(formData);
    try {
      const { data } = await api.post(`/auth/register`, formData); //USAMOS api.post EN LUGAR DE AXIOS PORQUE CREAMOS LA CONFIGURACION PARA QUE EL INICIO DE TODAS LAS URL SEA EL MISMO (IR A CONFIG/AXIOS.TS)
      reset(); //RESETEA TODO EL FORMULARIO UNA VEZ ENVIADO
      console.log(data.message); //Esto trae el mensaje de que se agrego correctamente
      toast.success(data.message); //NOTIFICACION
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        toast.error(e.response.data.error);
        console.log(e.response.data.error);
      }
    }
  };

  const password = watch("password");

  return (
    <>
      <h1 className=" text-4xl text-white font-bold text-center">
        Crear cuenta
      </h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-10 rounded-lg space-y-6 mt-10 max-w-lg mx-auto"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("name", {
              required: "El nombre es obligatorio",
            })} //EL NAME 'name' TIENE QUE SER EL MISMO NOMBRE QUE EL CAMPO QUE RECIBE EL METODO
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
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
              required: "El email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido", //VALIDACION PARA QUE SEA FORMATO EMAIL
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("handle", {
              required: "El handle es obligatorio",
            })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener mínimo 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repetir contraseña
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Contraseña"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password_confirmation", {
              required: "La contraseña repetida es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener mínimo 8 caracteres",
              },
              validate: (value) =>
                value === password || "Las contraseñas no son iguales",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Crear Cuenta"
        />
      </form>
      <nav className=" mt-10  text-center">
        <Link className=" text-lg block text-white" to="/auth/login">
          {" "}
          {/*<Link/> ES MUCHO MEJOR QUE <a/> PARA NAVEGAR ENTRE URL´s */}
          ¿Ya tienes cuenta?, ¡inicia sesión!
        </Link>
      </nav>
    </>
  );
}
