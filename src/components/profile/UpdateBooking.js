import { useState, useContext, useEffect, useLayoutEffect } from "react";
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs-com";

import "./Profile.scss";
import logo from "../../assets/bolas.svg";
import { getSuggestedQuery } from "@testing-library/react";

const Reservas = () => {
  let location = useLocation();
  let { id } = useParams();
  let history = useHistory();

  const { user, logIn, updateUserBooking, updateUserInfo, logoutUser, deleteUserBooking } = useContext(UserContext);

  const [booking, setBooking] = useState(undefined);
  const [updatedUser, setUpdatedUser] = useState(undefined);

  const [showModal, setShowModal] = useState(false);
  const [thanks, setThanks] = useState(false);

  const [showUserModal, setShowUserModal] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    getBooking();
    getUser();
  }, []);

  useEffect(() => {
    setShowModal(false);
  }, [thanks]);

  const getBooking = async () => {
    user.citas.map((elm) => {
      if (elm.id_cita === id) setBooking(elm);
    });
  };

  function notify() {
    console.log("toast");
    toast("Hemos recibido su solicitud, en breves le llegara un email confirmando su nueva cita, gracias por contar con nosotros!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function notifyUser() {
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

  const getUser = async () => {
    setUpdatedUser(user);
  };

  const handleInputModal = () => {
    showModal ? setShowModal(false) : setShowModal(true);
  };

  const toggleUserModal = () => {
    showUserModal ? setShowUserModal(false) : setShowUserModal(true);
  };

  const handleModal = (e) => {
    e.preventDefault();
    updateUserBooking(booking, id);
    notify();
    sendEmailBooking();
    setThanks(true);
    setShowModal(false);
  };

  const handleUserModal = (e) => {
    e.preventDefault();
    updateUserInfo(updatedUser);
    notifyUser();
    sendEmail();
    setShowUserModal(false);
    setThanks(true);
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

  function sendEmailBooking(e) {
    e.preventDefault();

    emailjs.send("service_ms36otd", "template_ycwj301", booking, "user_29SCJ5tSmyhfUETa03XNu").then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  }

  const deleteBooking = () => {
    deleteUserBooking(id);
    history.push("/perfil-reservas");
  };

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
        <h3>Modificar reserva</h3>

        <div className="orders__column">
          <article className="order__byDay">
            <p className="orders__day">{booking?.dia}</p>
            <div className="bookingUpdate__card">
              <div className="order__info">
                <p>Fecha: {booking?.dia}</p>
                <p>Hora: {booking?.horareserva}</p>
                <p>Lugar: {booking?.lugar} </p>
                <p>Test: {booking?.prueba}</p>
              </div>
            </div>
          </article>
          <div className="buttonline">
            <button to="/perfil-reservas" onClick={() => handleInputModal()} className="newBooking__link">
              Modificar reserva
            </button>
            <button to="/perfil-reservas" onClick={() => deleteBooking()} className="deleteBooking__link">
              Cancelar reserva
            </button>
          </div>
          {showModal && (
            <div className="bookingModal">
              <button className="button__closeModal" onClick={() => handleInputModal()}>
                X
              </button>
              <form onSubmit={handleModal}>
                <h4>Modifique su reserva</h4>
                <input
                  type="text"
                  onChange={(e) =>
                    setBooking((booking) => {
                      return {
                        ...booking,
                        dia: e.target.value,
                      };
                    })
                  }
                  placeholder="FECHA DE LA CITA"
                  value={booking.dia}
                />
                <input
                  type="text"
                  onChange={(e) =>
                    setBooking((booking) => {
                      return {
                        ...booking,
                        horareserva: e.target.value,
                      };
                    })
                  }
                  placeholder="HORA DE LA CITA"
                  value={booking.horareserva}
                />
                <input
                  type="text"
                  onChange={(e) =>
                    setBooking((booking) => {
                      return {
                        ...booking,
                        lugar: e.target.value,
                      };
                    })
                  }
                  placeholder="LUGAR DE LA CITA"
                  value={booking.lugar}
                />
                <input
                  type="text"
                  onChange={(e) =>
                    setBooking((booking) => {
                      return {
                        ...booking,
                        prueba: e.target.value,
                      };
                    })
                  }
                  placeholder="PRUEBA"
                  value={booking.prueba}
                />
                <button to="/perfil-reservas" type="submit" className="newBooking__link">
                  Modificar reserva
                </button>
              </form>
            </div>
          )}
          {thanks && <ToastContainer position="bottom-center" autoClose={5000000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />}
        </div>
      </section>
    </>
  );
};

export default Reservas;
