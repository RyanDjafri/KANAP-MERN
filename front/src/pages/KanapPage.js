import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UidContext } from "../components/AppContext";
import Navbar from "../components/Divs/Navbar";

const KanapPage = () => {
  const uid = useContext(UidContext);
  const [kanaps, setKanaps] = useState([]);
  const checkQuantity = (quantity) => {
    if (quantity >= 100 || quantity == 0 || quantity == null) {
      alert("Maximum authorized is 100 and minimum 1");
      return true;
    }
  };
  const checkColor = () => {
    const color = document.getElementById("colors").value;
    if (color == null || color === "") {
      alert("Please select a color");
      return true;
    }
  };
  function addCartItem(cartStorage, data) {
    for (let i = 0; i < cartStorage.length; i++) {
      if (
        data.id === cartStorage[i].id &&
        data.color === cartStorage[i].color
      ) {
        cartStorage[i].quantity = data.quantity + cartStorage[i].quantity;
        break;
      }
      if (i === cartStorage.length - 1) {
        cartStorage.push(data);
        break;
      }
    }
    return cartStorage;
  }
  const saveOrder = () => {
    const quantity = document.getElementById("quantity").value;
    const color = document.getElementById("colors").value;

    if (checkColor()) return;
    if (checkQuantity(quantity)) return;
    let cart = localStorage.getItem("cart");
    const data = {
      id: setId(),
      color: color,
      price: kanaps.price,
      quantity: Number(quantity),
    };
    if (!cart) {
      cart = [];
      cart.push(data);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Kanap added in cart");
    } else {
      let cartStorage = JSON.parse(cart);
      cartStorage.length !== 0
        ? addCartItem(cartStorage, data)
        : cartStorage.push(data);

      localStorage.setItem("cart", JSON.stringify(cartStorage));
      alert("Canapé(s) ajouté au panier");
    }
  };
  const handleClick = () => {
    saveOrder();
  };
  const setColors = (colors) => {
    colors.forEach((color) => {
      document.getElementById("colors").innerHTML += `
      <option value=${color}>${color}</option>
      `;
    });
  };
  const setId = () => {
    const params = new URLSearchParams(
      window.location.href.split("/").reverse()[0]
    );
    const id = params.get("id");
    return id;
  };
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
      setColors(res.data.colors);
      setId();
    });
  }, []);

  return (
    <div>
      <Navbar />

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
                <>
                  {uid ? (
                    <>
                      <div className="item__content__settings">
                        <div className="item__content__settings__color">
                          <label htmlFor="color-select">
                            Choisir une couleur :
                          </label>
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
                            id="quantity"
                            onChange={(e) => checkQuantity(+e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="item__content__addButton">
                        <button id="addToCart" onClick={handleClick}>
                          Ajouter au panier
                        </button>
                      </div>
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
            </article>
          </section>
        </div>
      </main>
    </div>
  );
};

export default KanapPage;
