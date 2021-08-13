import { useState, useContext, useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import "./Profile.scss";

const Login = () => {
  const [unregisteredUser, setuUregisteredUser] = useState({ dni: undefined, password: undefined });

  let history = useHistory();
  const { saveId, logIn, user } = useContext(UserContext);

  useLayoutEffect(() => {
    getSavedUser();
  }, []);

  const getSavedUser = async () => {
    const localuser = localStorage.getItem("user");
    const pass = localStorage.getItem("pss");
    if (localuser && pass != undefined) {
      const unsaveduser = { user: localuser, password: pass };
      const cargaUtil = JSON.stringify(unsaveduser);

      const respuesta = await fetch(`https://nuevo.procorlab.es/reservas.php`, {
        method: "post",
        body: cargaUtil,
      });

      const exitoso = await respuesta.json();
      if (exitoso) {
        saveId({ dni: exitoso }).then(() =>
          logIn().then(() => {
            history.push("/perfil-reservas");
          })
        );
      } else {
        console.log("error");
      }
    }
  };

  async function handleLogin(e) {
    e.preventDefault();

    localStorage.setItem("user", unregisteredUser.user);
    localStorage.setItem("pss", unregisteredUser.password);

    const cargaUtil = JSON.stringify(unregisteredUser);
    console.log(cargaUtil);

    const respuesta = await fetch(`https://nuevo.procorlab.es/reservas.php`, {
      method: "post",
      body: cargaUtil,
    });

    // const respuesta = await fetch(`https://back.procorlab.es/reservas.php`);

    const exitoso = await respuesta.json();
    if (exitoso) {
      console.log(exitoso);
      saveId({ dni: exitoso }).then(() =>
        logIn().then(() => {
          console.log(user);
          history.push("/perfil-reservas");
        })
      );
    } else {
      console.log("error");
    }
  }
  return (
    <div>
      <section className="login">
        <div className="login__div">
          <h2 id="SemiBold">Hola de nuevo.</h2>
          <p>Para mantenerte conectado con nuestro servicio, entre con sus datos.</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="DNI"
              name="username"
              onChange={(e) =>
                setuUregisteredUser((unregisteredUser) => {
                  return {
                    ...unregisteredUser,
                    user: e.target.value,
                  };
                })
              }
            />

            <input
              type="password"
              name="password"
              placeholder="CONTRASEÑA"
              onChange={(e) =>
                setuUregisteredUser((unregisteredUser) => {
                  return {
                    ...unregisteredUser,
                    password: e.target.value,
                  };
                })
              }
            />
            <Link to="/recuperar-contraseña">¿Has olvidado tu contraseña?</Link>

            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
