import { useState } from "react";
import "./Profile.scss";

const Recuperar = () => {
  const [user, setUser] = useState({ username: undefined, password: undefined });

  return (
    <section className="recuperar">
      <div className="recuperar__div">
        <h1>¿Has olvidado tu contraseña?</h1>
        <p>Introduce los siguientes datos para recuperarla. </p>
        <form>
          <input
            type="text"
            placeholder="NOMBRE"
            name="username"
            onChange={(e) =>
              setUser((user) => {
                return {
                  ...user,
                  username: e.target.value,
                };
              })
            }
          />
          <input
            type="text"
            name="lastName"
            placeholder="APELLIDOS"
            onChange={(e) =>
              setUser((user) => {
                return {
                  ...user,
                  lastName: e.target.value,
                };
              })
            }
          />
          <input
            type="text"
            name="password"
            placeholder="EMAIL"
            onChange={(e) =>
              setUser((user) => {
                return {
                  ...user,
                  password: e.target.value,
                };
              })
            }
          />

          <button type="submit">Recuperar</button>
        </form>
      </div>
    </section>
  );
};

export default Recuperar;
