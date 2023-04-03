import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UidContext } from "../components/AppContext";

const KanapPage = () => {
  const uid = useContext(UidContext);
  const [kanaps, setKanaps] = useState([]);
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.href.split("/").reverse()[0]
    );
    const id = params.get("id");
    axios({
      method: "get",
      url: `http://localhost:5000/api/products/${id}`,
    }).then((res) => {
      setKanaps(res.data);
    });
  }, [kanaps]);

  return (
    <div className="header">
      <div className="limitedWidthBlockContainer inhtmlFormations">
        <div className="limitedWidthBlock">
          <ul>
            <li>
              <i className="fa-solid fa-phone inhtmlFormations__phone"></i>
              01 23 45 67 89
            </li>
            <li>
              <i className="fa-solid fa-envelope inhtmlFormations__mail"></i>
              support@name.com
            </li>
            <li>
              <i className="fa-solid fa-location-dot inhtmlFormations__address"></i>
              01 23 45 67 89
            </li>
          </ul>
        </div>
        <div className="link-container">
          <>
            {uid ? (
              <>
                <a href="/" className="links">
                  Home
                </a>
                <a href="/" className="links">
                  Cart
                </a>
              </>
            ) : (
              <>
                <a href="/register" className="links">
                  Sign Up
                </a>
                <a href="/login" className="links">
                  Sign In
                </a>
              </>
            )}
          </>
        </div>
      </div>

      <main className="limitedWidthBlockContainer">
        <div className="limitedWidthBlock">
          <section className="item">
            <article>
              <div className="item__img">
                <img src={kanaps.imageUrl} alt={kanaps.altTxt} />
              </div>
              <div className="item__content">
                <div className="item__content__titlePrice">
                  <h1 id="title">{kanaps.name} </h1>
                  <p>
                    Prix : <span id="price"> {kanaps.price} </span>€
                  </p>
                </div>

                <div className="item__content__description">
                  <p className="item__content__description__title">
                    Description :
                  </p>
                  <p id="description"> {kanaps.description}</p>
                </div>

                <div className="item__content__settings">
                  <div className="item__content__settings__color">
                    <label htmlFor="color-select">Choisir une couleur :</label>
                    <select name="color-select" id="colors"></select>
                  </div>

                  <div className="item__content__settings__quantity">
                    <label htmlFor="itemQuantity">
                      Nombre d'article(s) (1-100) :
                    </label>
                    <input
                      type="number"
                      name="itemQuantity"
                      min="1"
                      max="100"
                      value="0"
                      id="quantity"
                    />
                  </div>
                </div>

                <div className="item__content__addButton">
                  <button id="addToCart">Ajouter au panier</button>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
};

export default KanapPage;
