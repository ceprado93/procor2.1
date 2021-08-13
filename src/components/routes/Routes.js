import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Home from "../pages/Home";
import Tienda from "../pages/Tienda";
import Empresa from "../pages/Empresa";
import Redes from "../pages/Redes";
import Nosotros from "../pages/Nosotros";
import Funnel from "../funnel/Funnel";
import Pcr from "../pruebas/Pcr";
import Serologico from "../pruebas/Serologico";
import AntigenosSaliva from "../pruebas/Antigenos-saliva";
import Antigenos from "../pruebas/Antigenos";
import Saliva from "../pruebas/Saliva";
import Faqs from "../politicas/Faqs";
import Blogs from "../blog/Blog";
import BlogDetalles from "../blog/Blog-detalles";
import Contact from "../pages/Contacto";
import Viaje from "../funnel/Viaje";
import ContactoPositivo from "../funnel/ContactoPositivo";
import Otros from "../funnel/Otros";
import PoliticaPrivacidad from "../politicas/Politicas-privacidad";
import Envios from "../politicas/Envios";
import Devoluciones from "../politicas/Devoluciones";
import AvisoLegal from "../politicas/Legal";
import AvisoCookies from "../politicas/AvisoCookies";
import Reservas from "../pages/Reservas";
import Politicas from "../pages/Politicas";
import InfoKit from "../pages/Infokit";
import Login from "../profile/Login";
import Cerficicados from "../profile/Cerficicados";
import Contraseña from "../profile/Contaseña";
import Recuperar from "../profile/Recuperar";
import ReservasPerfil from "../profile/Reservas";
import UpdateBooking from "../profile/UpdateBooking";

const Routes = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/tienda" exact render={() => <Tienda />} />
        <Route path="/empresa-evento" exact render={() => <Empresa />} />
        <Route path="/info-covid" exact render={() => <Blogs />} />
        <Route exact path="/info-covid/:title/:id" render={(props) => <BlogDetalles {...props} />} />
        <Route path="/redes" exact render={() => <Redes />} />
        <Route path="/quienes-somos" exact render={() => <Nosotros />} />
        <Route path="/necesito-test" exact render={() => <Funnel />} />
        <Route path="/necesito-test/viaje" exact render={() => <Viaje />} />
        <Route path="/necesito-test/contactopositivo" exact render={() => <ContactoPositivo />} />
        <Route path="/necesito-test/otros" exact render={() => <Otros />} />
        <Route path="/reservas" exact render={() => <Reservas />} />
        <Route path="/pcr-saliva" exact render={() => <Pcr />} />
        <Route path="/igm-igg" exact render={() => <Serologico />} />
        <Route path="/antigenos-saliva" exact render={() => <AntigenosSaliva />} />
        <Route path="/antigenos-25" exact render={() => <Antigenos />} />
        <Route path="/anticuerpos-saliva" exact render={() => <Saliva />} />
        <Route path="/faqs" exact render={() => <Faqs />} />
        <Route path="/politicas" exact render={() => <Politicas />} />
        <Route path="/contacto" exact render={() => <Contact />} />
        <Route path="/privacidad" exact render={() => <PoliticaPrivacidad />} />
        <Route path="/envios" exact render={() => <Envios />} />
        <Route path="/devoluciones" exact render={() => <Devoluciones />} />
        <Route path="/legal" exact render={() => <AvisoLegal />} />
        <Route path="/aviso-cookies" exact render={() => <AvisoCookies />} />
        <Route exact path="/info-kit-procor" render={() => <InfoKit />} />
        <Route path="/login" exact render={() => <Login />} />
        <Route exact path="/recuperar-contraseña" render={(props) => <Recuperar {...props} />} />
        <Route exact path="/nueva-contraseña" render={(props) => <Contraseña {...props} />} />
        {user ? (
          <>
            <Route exact path="/perfil-certificados" render={(props) => <Cerficicados {...props} />} />
            <Route exact path="/perfil-reservas" render={(props) => <ReservasPerfil {...props} />} />
            <Route exact path="/modificar-reserva/:id" render={(props) => <UpdateBooking {...props} />} />{" "}
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </>
  );
};

export default Routes;
