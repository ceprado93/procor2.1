import React, { useEffect, useContext, useLayoutEffect, useState } from "react";
import Flecha from "../../assets/Flecha.png";
import Casa from "../../assets/casa.png";
import Reloj from "../../assets/reloj.png";
import Rayo from "../../assets/rayo.png";
import "./Pruebas.css";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/shopContext";
import antigenosSaliva from "../../assets/antigenos-saliva5.png";

const AntigenosSaliva = () => {
  let { id } = useParams();
  const { fetchProductWithId, addItemToCheckout, product, openCart } = useContext(ShopContext);

  const [qtyModal, setqtyModal] = useState(false);
  const [comprar, setComprar] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // fetchProductWithId("Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3MTMwNDEzMjIxNjc=");
  }, [fetchProductWithId, id]);

  const openQTYModal = () => {
    setqtyModal(true);
  };

  async function selectQty(e) {
    console.log(e.target.value);
    if (e.target.value === "1ud -- 25€") await fetchProductWithId("Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3MTMwNDEzMjIxNjc=");
    else if (e.target.value === "3ud -- 67,5€") await fetchProductWithId("Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4ODY3NzUyOTIwODc=");
    else if (e.target.value === "5ud -- 99€") await fetchProductWithId("Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4ODY3NzY0MDYxOTk=");
    else if (e.target.value === "10ud -- 185€") await fetchProductWithId("Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4ODY3Nzc0NTQ3NzU=");

    setComprar(true);
  }

  function click(event) {
    addItemToCheckout(product.variants[0].id, 1);
    openCart();
    setqtyModal(false);
  }
  return (
    <div id="product__page" className="antigenosSaliva__page-product">
      {qtyModal && (
        <div className="qty__modal">
          <div className="qty__form">
            <button className="pack__closeButton" onClick={() => setqtyModal(false)}>
              X
            </button>
            <h2> Packs antígenos de saliva</h2>
            <select className="form-control-select" onChange={selectQty} style={{ width: "80%" }}>
              <option>Seleccione cantidad </option>
              <option>1ud -- 25€</option>
              <option>3ud -- 67,5€</option>
              <option>5ud -- 99€</option>
              <option>10ud -- 185€</option>
            </select>
            {comprar && (
              <button className="hero_link" onClick={() => click()}>
                Comprar
              </button>
            )}
          </div>
        </div>
      )}
      <section className="product__title">
        <p className="hero_heading">
          <strong> Antígenos </strong> de saliva
        </p>
        <p className="hero_copy">El test más rápido</p>
      </section>
      <section className="image-section">
        <div className="image__product" style={{ backgroundImage: `url(${antigenosSaliva})` }}></div>
      </section>
      <section className="product__caracteristics">
        <img className="arrow bounce" src={Flecha} alt="arrow" />
        <p>CARACTERÍSTICAS DE PRODUCTO</p>
        <p id="fiabilidad">
          97% de fiabilidad <br></br> entre los días
        </p>
        <p id="SemiBold" className="dias_semi">
          <strong> 4 - 10 </strong>
        </p>
      </section>
      <section className="product__times">
        <div className="phw">
          <img id="rayito" src={Rayo} alt="rayo" />
          <p>Detecta el virus en la fase de incubación</p>
        </div>
        <div className="phw">
          <img src={Casa} alt="casa" />
          <p>Toma de muestra no invasiva</p>
        </div>
        <div className="phw">
          <img src={Reloj} alt="reloj" />
          <p>
            Resultados en un máximo de <strong>20 minutos</strong>
          </p>
        </div>
      </section>
      <section className="small__text">
        <p>Se recomienda cuando sabemos la fecha del contacto y si presenta algún síntoma. Su sensibilidad es baja en asintomáticos.</p>
        <p style={{ marginBottom: "5rem" }}>
          Detecta proteína Ag, una proteína que hace de puente entre las células de nuestro cuerpo y el virus. Una vez que se ha producido esta fusión, nuestro cuerpo elimina la proteína, por eso su
          marco de efectividad es tan concreto.
        </p>
      </section>
      <section className="fixed--btn">
        <p id="SemiBold" style={{ marginTop: "2rem", marginBottom: "0rem", fontSize: "2rem" }}>
          25€
        </p>
        <div className=" boton--producto" style={{ paddingTop: "0rem" }}>
          <button onClick={() => openQTYModal()} className="hero_link">
            COMPRAR AHORA
          </button>
        </div>
      </section>
    </div>
  );
};

export default AntigenosSaliva;
