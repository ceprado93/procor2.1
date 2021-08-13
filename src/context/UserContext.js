import { Component, createContext } from "react";

const UserContext = createContext();

class UserProvider extends Component {
  state = {
    dni: { id: "" },
    user: undefined,
    // user: {
    // _id: "7348378328ufhjn",
    // nombre: "Carlos",
    // apellidos: "Prado",
    // dni: "28397532f",
    // phone: "685403758",
    // mail: "carlosprado@gmail.com",
    // nacimiento: "10-03-1993",
    // citas: [
    //   {
    //     id: "1",
    //     fecha: "04-08-21",
    //     hora: "10:30",
    //     test: "serologico",
    //     lugar: "clinica",
    //     certificado: "eded",
    //   },
    //   {
    //     id: "4",
    //     fecha: "18-07-21",
    //     hora: "11:40",
    //     test: "pcr",
    //     lugar: "clinica",
    //     certificado: "",
    //   },
    //   {
    //     id: "2",
    //     fecha: "14-07-21",
    //     hora: "12:40",
    //     test: "antigenos",
    //     lugar: "clinica",
    //     certificado: "",
    //   },
    //   {
    //     id: "3",
    //     fecha: "18-07-21",
    //     hora: "11:40",
    //     test: "pcr",
    //     lugar: "clinica",
    //     certificado: "",
    //   },
    // ],
    //},
    password: "",
    certificates: [],
    bookings: [],
  };

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn = async () => {
    console.log("hola");
  };

  saveId = async (dni) => {
    this.setState({ dni: dni });
  };

  logIn = async () => {
    const cargaUtil = JSON.stringify(this.state.dni);
    console.log(cargaUtil);
    const respuesta = await fetch(`https://nuevo.procorlab.es/panel.php`, {
      method: "POST",
      body: cargaUtil,
    });
    const exitoso = await respuesta.json();
    if (exitoso) {
      const newUser = {};
      newUser.citas = [];

      exitoso.map((elm, idx) => {
        console.log(elm);
        newUser.nombre = elm.nombre;
        newUser.apellidos = elm.apellidos;
        newUser.dni = elm.dni;
        newUser.phone = elm.phone;
        newUser.email = elm.email;
        newUser.nacimiento = elm.nacimiento;
        const cita = {
          id_cita: undefined,
          dia: undefined,
          horareserva: undefined,
          lugar: undefined,
          prueba: undefined,
        };
        cita.id_cita = elm.id_cita;
        cita.dia = elm.dia;
        cita.horareserva = elm.horareserva;
        cita.lugar = elm.lugar;
        cita.prueba = elm.prueba;
        cita.certificado = elm.file_name;

        newUser.citas.splice(2, 0, cita);
      });
      this.setState({ user: newUser });
    } else {
      console.log("error");
    }
  };

  logoutUser = async () => {
    this.setState({ user: undefined });
  };

  updateUserInfo = async (user) => {
    const cargaUtil = JSON.stringify(user);

    const respuesta = await fetch(`https://nuevo.procorlab.es/modificar-usuario.php`, {
      method: "POST",
      body: cargaUtil,
    });

    const exitoso = await respuesta.json();
    if (exitoso) {
      console.log(exitoso);
    } else {
      console.log("error");
    }
    this.setState({ user });
  };

  updateUserBooking = async (booking, index) => {
    const newUser = this.state.user;
    const data = {
      booking: booking,
      index: index,
    };
    this.state.user.citas.map((elm, idx) => {
      if (elm.id_cita === index) {
        newUser.citas[idx] = booking;
      }
    });
    console.log(booking);
    const cargaUtil = JSON.stringify(booking);
    console.log(cargaUtil);

    const respuesta = await fetch(`https://nuevo.procorlab.es/modificar.php`, {
      method: "POST",
      body: cargaUtil,
    });

    const exitoso = await respuesta.json();
    if (exitoso) {
      console.log(exitoso);
    } else {
      console.log("error");
    }
    this.setState({ user: newUser });
  };

  deleteUserBooking = async (id) => {
    const newUser = this.state.user;

    this.state.user.citas.map((elm, idx) => {
      if (elm.id_cita === id) {
        newUser.citas.splice(idx, 1);
      }
    });
    const cargaUtil = JSON.stringify(id);

    const respuesta = await fetch(`https://nuevo.procorlab.es/eliminar.php`, {
      method: "POST",
      body: cargaUtil,
    });

    const exitoso = await respuesta.json();
    if (exitoso) {
      console.log(exitoso);
    } else {
      console.log("error");
    }
    this.setState({ user: newUser });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          saveId: this.saveId,
          logIn: this.logIn,
          updateUserInfo: this.updateUserInfo,
          updateUserBooking: this.updateUserBooking,
          deleteUserBooking: this.deleteUserBooking,
          logoutUser: this.logoutUser,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.UserConsumer;

export { UserConsumer, UserContext };
export default UserProvider;
