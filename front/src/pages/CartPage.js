import React, { useEffect, useState } from "react";
import Navbar from "../components/Divs/Navbar";
import CartKanap from "../components/Cart/CartKanap";
import axios from "axios";

const CartPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const cartStorage = localStorage.getItem("cart");
  const cartElements = JSON.parse(cartStorage);
  // function checkForm() {
  //   const firstName = document.getElementById("firstNameErrorMsg");
  //   const firstNameInput = document.getElementById("firstName");
  //   const lastName = document.getElementById("lastNameErrorMsg");
  //   const lastNameInput = document.getElementById("lastName");
  //   const address = document.getElementById("addressErrorMsg");
  //   const addressInput = document.getElementById("address");
  //   const city = document.getElementById("cityErrorMsg");
  //   const cityInput = document.getElementById("city");
  //   const email = document.getElementById("emailErrorMsg");
  //   const emailInput = document.getElementById("email");
  //   const orderButton = document.getElementById("order");
  //   orderButton.addEventListener("click", (e) => {
  //     e.preventDefault();

  //     if (!firstNameInput.value) {
  //     }
  //   });

  //   firstNameInput.addEventListener("change", (e) => {
  //     if (e.target.value === "") {
  //       firstName.textContent = "Veuillez remplir ce champs";
  //       orderButton.disabled = true;
  //     } else {
  //       firstName.textContent = "";
  //       orderButton.disabled = false;
  //     }
  //   });

  //   lastNameInput.addEventListener("change", (e) => {
  //     if (e.target.value === "") {
  //       lastName.textContent = "Veuillez remplir ce champs";
  //       orderButton.disabled = true;
  //     } else {
  //       lastName.textContent = "";
  //       orderButton.disabled = false;
  //     }
  //   });

  //   addressInput.addEventListener("change", (e) => {
  //     if (e.target.value === "") {
  //       address.textContent = "Veuillez remplir ce champs";
  //       orderButton.disabled = true;
  //     } else {
  //       address.textContent = "";
  //       orderButton.disabled = false;
  //     }
  //   });

  //   cityInput.addEventListener("change", (e) => {
  //     if (e.target.value === "") {
  //       city.textContent = "Veuillez remplir ce champs";
  //       orderButton.disabled = true;
  //     } else {
  //       city.textContent = "";
  //       orderButton.disabled = false;
  //     }
  //   });

  //   emailInput.addEventListener("change", () => {
  //     const regex = /^[A-Za-z0-9+*_.-]+@(.+)$/;

  //     if (regex.test(emailInput.value) === false) {
  //       email.textContent = "Veuillez entrez un email valide";
  //       orderButton.disabled = true;
  //     } else {
  //       email.textContent = "";
  //       orderButton.disabled = false;
  //     }
  //   });
  // }

  function displayQuantity() {
    const totalQuantity = document.getElementById("totalQuantity");
    const totalPrice = document.getElementById("totalPrice");
    if (cartElements) {
      const total = cartElements.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const totalPr = cartElements.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      totalPrice.textContent = totalPr;
      totalQuantity.textContent = total;
    }
  }
  const sendForm = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/products/order`,
      data: {
        contact: {
          firstName,
          lastName,
          address,
          city,
          email,
        },
        products: getIdsFromCache(),
      },
    }).then((res) => {
      console.log(res);
      const orderId = res.orderId;
      if (res) {
        const orderSuccess = document.getElementById("orderSuccess");
        orderSuccess.textContent = "Order number" + orderId;
        localStorage.clear();
      }
    });
  };
  function getIdsFromCache() {
    const numberOfProducts = cartElements.length;
    const ids = [];
    for (let i = 0; i < numberOfProducts; i++) {
      ids.push(cartElements[i].id);
    }
    console.log(ids);
    return ids;
  }
  useEffect(() => {
    displayQuantity();
    // checkForm();
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
                <>
                  {cartElements ? (
                    <>
                      {cartElements.map((element) => {
                        return <CartKanap element={element} key={element.id} />;
                      })}
                    </>
                  ) : (
                    <>
                      <h2>No Item</h2>
                    </>
                  )}
                </>
              </section>
              <div className="cart__price">
                <p>
                  Total (<span id="totalQuantity"></span> articles) :{" "}
                  <span id="totalPrice"> </span> £
                </p>
              </div>
              <div className="cart__order">
                <form
                  method="get"
                  className="cart__order__form"
                  onSubmit={sendForm}
                >
                  <div className="cart__order__form__question">
                    <label htmlFor="firstName">Prénom: </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={firstName}
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
                      value={lastName}
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
                      value={address}
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
                      value={city}
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
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p id="emailErrorMsg"></p>
                  </div>
                  <div className="cart__order__form__submit">
                    <input type="submit" value="Commander !" id="order" />
                    <h4 id="orderSuccess"></h4>
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
