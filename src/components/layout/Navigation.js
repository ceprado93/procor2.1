import { useState, useContext } from "react";
import "./Layout.css";
import logo from "../../assets/bolas.svg";
import carrito from "../../assets/Carrito.png";
import burger from "../../assets/burger.png";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../context/shopContext";

const Navigation = () => {
  let location = useLocation();

  const { openCart } = useContext(ShopContext);

  const [showMenu, setShowMenu] = useState(false);
  const [showlanguage, setShowLanguage] = useState(false);

  function toogleLanguage() {
    showlanguage ? setShowLanguage(false) : setShowLanguage(true);
  }

  function toogleMenu() {
    showMenu ? setShowMenu(false) : setShowMenu(true);
  }

  function click(event) {
    openCart();
  }
  if (location.pathname === "/perfil-certificados" || location.pathname === "/perfil-reservas" || location.pathname.includes("/modificar-reserva")) return null;
  return (
    <>
      {!showMenu && (
        <div className="navigation">
          <img onClick={() => toogleMenu()} className="navigation_icon" src={burger} alt="logo" />
          <Link to="/">
            <img className="navigation_logo" src={logo} alt="logo" />
          </Link>
          <img className="navigation_icon1" onClick={click} src={carrito} alt="logo" />
        </div>
      )}

      {showMenu && (
        <section className="openMenu">
          <button className="menuButton__close" onClick={() => toogleMenu()}>
            X
          </button>
          <div>
            <Link to="/necesito-test" id="SemiBold" onClick={() => toogleMenu()}>
              Necesito un test / cita
            </Link>
            <Link to="/tienda" id="SemiBold" onClick={() => toogleMenu()}>
              Nuestro e-commerce
            </Link>
            <Link to="/info-covid" id="SemiBold" onClick={() => toogleMenu()}>
              Info COVID
            </Link>
            <Link to="/empresa-evento" id="SemiBold" onClick={() => toogleMenu()}>
              Soy una empresa / evento
            </Link>
            <Link to="/redes" id="SemiBold" onClick={() => toogleMenu()}>
              Redes Procor
            </Link>
            <Link to="/quienes-somos" id="SemiBold" onClick={() => toogleMenu()}>
              Quienes somos
            </Link>
            <Link id="SemiBold" to="/politicas" onClick={() => toogleMenu()}>
              Pol??ticas
            </Link>
          </div>
          <footer>
            <button id="SemiBold" onClick={() => toogleLanguage()}>
              IDIOMA
            </button>
            <Link id="SemiBold" to="/politicas" onClick={() => toogleMenu()}>
              POL??TICAS
            </Link>
            <Link id="SemiBold" to="/contacto" onClick={() => toogleMenu()}>
              CONTACTO
            </Link>
          </footer>
          {showlanguage && (
            <div className="language__box" onClick={() => toogleLanguage()}>
              <p>Espa??ol ????????</p>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Navigation;
