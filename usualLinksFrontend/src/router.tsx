import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AuthLayouts from "./layouts/AuthLayouts";
import AppLayout from "./layouts/AppLayout";
import UsualLinksView from "./views/UsualLinksView";
import ProfileView from "./views/ProfileView";

//ROUTER MANEJA LAS RUTAS

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayouts />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>
        <Route path='/admin' element={<AppLayout />}>
          <Route index={true} element={<UsualLinksView/>} /> {/*Hacemos esto para que el hijo herede el path='/admin' del padre */}
          <Route path='profile' element={<ProfileView/>} /> {/*El path no tiene '/' porque se genera automaticamente al ser hijo de un path='/admin'*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
