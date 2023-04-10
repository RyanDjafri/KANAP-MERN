import React, { useState, useEffect } from "react";
import axios from "axios";

const CartKanap = ({ element }) => {
  const [kanap, setKanap] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/products/${element.id}`,
    }).then((res) => {
      setKanap(res.data);
    });
  }, []);

  const deleteFunction = () => {
    const deleteButtons = document.getElementsByClassName("deleteItem");
    for (let i = 0; i < deleteButtons.length; i++) {
      const article =
        deleteButtons[i].parentNode.parentNode.parentNode.parentNode;
      const id = article.getAttribute("data-id");
      const color = article.getAttribute("data-color");

      article.remove();
      window.location.reload();
      var items = JSON.parse(localStorage.getItem("cart"));
      var index = items.findIndex((x) => x.id == id && x.color == color);
      if (index >= 0) {
        items.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(items));
      }
    }
  };

  function changeQuantity() {
    let inputs = document.getElementsByClassName("itemQuantity");
    for (let i = 0; i < inputs.length; i++) {
      const article = inputs[i].parentNode.parentNode.parentNode.parentNode;
      const id = article.getAttribute("data-id");
      const color = article.getAttribute("data-color");
      var cart = JSON.parse(localStorage.getItem("cart"));
      if (inputs[i].value == 0) {
        let index = cart.findIndex((x) => x.id == id && x.color == color);
        cart.splice(index, 1);
      } else {
        var item = cart.find((x) => x.id == id && x.color == color);
        item.quantity = Number(inputs[i].value);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    window.location.reload();
  }

  // delete button, quantity, price
  return (
    <article
      className="cart__item"
      data-id={kanap._id}
      data-color={element.color}
    >
      <div className="cart__item__img">
        <img src={kanap.imageUrl} alt="Photographie d'un canapé" />
      </div>
      <div className="cart__item__content">
        <div className="cart__item__content__description">
          <h2>{kanap.name}</h2>
          <p>{element.color}</p>
          <p>{kanap.price}£</p>
        </div>
        <div className="cart__item__content__settings">
          <div className="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input
              type="number"
              className="itemQuantity"
              name="itemQuantity"
              min="1"
              max="100"
              value={element.quantity}
              onChange={changeQuantity}
            />
          </div>
          <div className="cart__item__content__settings__delete">
            <p className="deleteItem" onClick={deleteFunction}>
              Supprimer
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
export default CartKanap;
