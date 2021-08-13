import { useState, useContext, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs-com";

import "./Profile.scss";
import logo from "../../assets/bolas.svg";
import download from "../../assets/download.svg";
import serologico from "../../assets/serologico3.png";
import antigenos from "../../assets/antigenos3.png";
import pcr from "../../assets/pcr3.png";

const Certificados = () => {
  let location = useLocation();
  const { user, updateUserInfo, logoutUser } = useContext(UserContext);

  const [orders, setOrders] = useState([]);
  const [updatedUser, setUpdatedUser] = useState(undefined);
  const [showUserModal, setShowUserModal] = useState(false);
  const [thanks, setThanks] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    getUser();
  }, []);

  const getUser = async () => {
    setUpdatedUser(user);
  };

  const toggleUserModal = () => {
    showUserModal ? setShowUserModal(false) : setShowUserModal(true);
  };

  function notify() {
    console.log("toast");
    toast("Hemos actualizado sus datos, gracias por contar con nosotros!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const handleUserModal = (e) => {
    e.preventDefault();
    updateUserInfo(updatedUser);
    notify();
    setShowUserModal(false);
    setThanks(true);
    sendEmail();
  };

  function sendEmail(e) {
    e.preventDefault();

    emailjs.send("service_ms36otd", "template_m51cwvr", updatedUser, "user_29SCJ5tSmyhfUETa03XNu").then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  }

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("pss");
    logoutUser();
  };
  return (
    <>
      <div className="profile__infoColumn">
        <h3>Mis datos</h3>
        <ul>
          <li>Nombre: {user?.nombre}</li>
          <li>Apellidos: {user?.apellidos}</li>
          <li>Email: {user?.email}</li>
          <li>DNI/NIE: {user?.dni}</li>
          <li>Telefono: {user?.phone}</li>
          <li>Fecha de nacimiento: {user?.nacimiento}</li>
          <button to="/perfil-reservas" onClick={() => toggleUserModal()} className="newBooking__link">
            Modificar perfil
          </button>
          <button to="/perfil-reservas" onClick={() => logout()} className="logout__link">
            Cerrar sesion
          </button>
        </ul>
      </div>
      <section className="profile__orders">
        <div className="profile__navigation">
          <Link to="/perfil-certificados" className={location.pathname === "/perfil-certificados" ? "underline" : ""}>
            Certificados
          </Link>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/perfil-reservas" className={location.pathname === "/perfil-reservas" ? "underline" : ""}>
            Citas
          </Link>
        </div>
        <div className="profile__infoBS">
          <h3>Mis datos</h3>
          <ul>
            <li>Nombre: {user?.nombre}</li>
            <li>Apellidos: {user?.apellidos}</li>
            <li>Email: {user?.email}</li>
            <li>DNI/NIE: {user?.dni}</li>
            <li>Telefono: {user?.phone}</li>
            <li>Fecha de nacimiento: {user?.nacimiento}</li>
            <button to="/perfil-reservas" onClick={() => toggleUserModal()} className="newBooking__link">
              Modificar perfil
            </button>
            <button to="/perfil-reservas" onClick={() => logout()} className="logout__link">
              Cerrar sesion
            </button>
          </ul>
        </div>
        {showUserModal && (
          <div className="userModal">
            <button className="button__closeModal" onClick={() => toggleUserModal()}>
              X
            </button>
            <form onSubmit={handleUserModal}>
              <h4>Modifique sus datos</h4>
              <div className="userModal__line">
                <input
                  type="text"
                  onChange={(e) =>
                    setUpdatedUser((updatedUser) => {
                      return {
                        ...updatedUser,
                        nombre: e.target.value,
                      };
                    })
                  }
                  placeholder="Nombre"
                  value={updatedUser.nombre}
                />
                <input
                  type="text"
                  onChange={(e) =>
                    setUpdatedUser((updatedUser) => {
                      return {
                        ...updatedUser,
                        apellidos: e.target.value,
                      };
                    })
                  }
                  placeholder="APELLIDO"
                  value={updatedUser.apellidos}
                />
              </div>
              <div className="userModal__line">
                <input
                  type="text"
                  onChange={(e) =>
                    setUpdatedUser((updatedUser) => {
                      return {
                        ...updatedUser,
                        email: e.target.value,
                      };
                    })
                  }
                  placeholder="Email"
                  value={updatedUser.email}
                />
              </div>

              <div className="userModal__line">
                <input
                  type="text"
                  onChange={(e) =>
                    setUpdatedUser((updatedUser) => {
                      return {
                        ...updatedUser,
                        phone: e.target.value,
                      };
                    })
                  }
                  placeholder="TELEFONO"
                  value={updatedUser.phone}
                />
                <input
                  type="text"
                  onChange={(e) =>
                    setUpdatedUser((updatedUser) => {
                      return {
                        ...updatedUser,
                        nacimiento: e.target.value,
                      };
                    })
                  }
                  placeholder="FECHA DE NACIMIENTO"
                  value={updatedUser.nacimiento}
                />
              </div>

              <button to="/perfil-reservas" type="submit" className="newBooking__link">
                Modificar datos
              </button>
            </form>
          </div>
        )}
        <h3>Mis certificados</h3>
        <div className="orders__column">
          {user.citas && user.citas[0].certificado ? (
            user.citas.map((elm, idx) => (
              <article key={idx} className="order__byDay">
                <p className="orders__day">{elm.dia}</p>
                <div className="order__card">
                  <img className="bookingimg" src={elm.prueba === "pcr" ? pcr : elm.prueba === "Antígenos" ? antigenos : serologico} alt="productImage" />
                  <div className="order__info">
                    <p>Test: {elm.prueba}</p>
                    <p>Resultado: {elm.horareserva}</p>
                    <p>Lugar: {elm.lugar}</p>
                  </div>
                  <a href={elm.certificado} download>
                    <img className="downloadImg" src={download} alt="download" />
                  </a>
                </div>
              </article>
            ))
          ) : (
            <p className="aviso__certificados">Aun no tiene certificados</p>
          )}
        </div>
        {thanks && <ToastContainer position="bottom-center" autoClose={5000000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />}
      </section>
    </>
  );
};

export default Certificados;
