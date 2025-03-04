import { Outlet } from "react-router-dom";

export default function AuthLayouts() {
  return (
    <>
      <div className=" bg-slate-800 min-h-screen relative">
        <div className=" max-w-lg mx-auto pt-10 px-5">
          <img
            src="/bg.svg"
            alt="loginViewBackground"
             className="absolute inset-0 w-full h-full object-contain scale-100 pointer-events-none"
          />
        </div>
        <Outlet />
      </div>
    </>
  );
}
