import React, { useEffect, useState } from "react";
import Navbar from "../components/Divs/Navbar";
import CartKanap from "../components/Cart/CartKanap";
import calculPrice from "../components/Utils/calculPrice";

const CartPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const cartStorage = localStorage.getItem("cart");
  const cartElements = JSON.parse(cartStorage);
  function displayQuantity() {
    const totalQuantity = document.getElementById("totalQuantity");
    const total = cartElements.reduce(
      (total, item) => total + item.quantity,
      0
    );
    totalQuantity.textContent = total;
  }

  useEffect(() => {
    displayQuantity();
  }, []);
  return (
    <div>
      <Navbar />
      <main className="limitedWidthBlockContainer">
        <div className="limitedWidthBlock" id="limitedWidthBlock">
          <div className="cartAndFormContainer" id="cartAndFormContainer">
            <h1>Votre panier</h1>
            <section className="cart">
              <section id="cart__items">
                {cartElements.map((element) => {
                  return <CartKanap element={element} key={element.id} />;
                })}
              </section>
              <div className="cart__price">
                <p>
                  Total (<span id="totalQuantity"></span> articles) :{" "}
                  <span id="totalPrice"> </span> £
                </p>
              </div>
              <div className="cart__order">
                <form method="get" className="cart__order__form">
                  <div className="cart__order__form__question">
                    <label htmlFor="firstName">Prénom: </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <p id="firstNameErrorMsg"> </p>
                  </div>
                  <div className="cart__order__form__question">
                    <label htmlFor="lastName">Nom: </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <p id="lastNameErrorMsg"></p>
                  </div>
                  <div className="cart__order__form__question">
                    <label htmlFor="address">Adresse: </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <p id="addressErrorMsg"></p>
                  </div>
                  <div className="cart__order__form__question">
                    <label htmlFor="city">Ville: </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      required
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <p id="cityErrorMsg"></p>
                  </div>
                  <div className="cart__order__form__question">
                    <label htmlFor="email">Email: </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p id="emailErrorMsg"></p>
                  </div>
                  <div className="cart__order__form__submit">
                    <input type="submit" value="Commander !" id="order" />
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
