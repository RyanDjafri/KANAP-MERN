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
  // delete button, quantity, price
  return (
    <article className="cart__item" data-id={kanap.id} data-color={kanap.color}>
      <div className="cart__item__img">
        <img src={kanap.imageUrl} alt="Photographie d'un canapé" />
      </div>
      <div className="cart__item__content">
        <div className="cart__item__content__description">
          <h2>{kanap.name}</h2>
          <p>{kanap.color}</p>
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
            />
          </div>
          <div className="cart__item__content__settings__delete">
            <p className="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartKanap;
