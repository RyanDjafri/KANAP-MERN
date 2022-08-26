//constantes nécessaires pour la page
const cartItems = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
const cartStorage = localStorage.getItem("cart");
const cartElements = JSON.parse(cartStorage);
const orderButton = document.getElementById("order");
const inputNames = ["firstName", "lastName"];
const buttonCommander = document.getElementById("order");
let totalPr = 0;
// forEach du cart
cartElements.forEach((element) => {
  const id = element.id;
  const color = element.color;
  const quantity = element.quantity;
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      totalPr += data.price * element.quantity;
      totalPrice.textContent = totalPr;
      displayData(data);
    });
  function displayData(kanap) {
    const { imageUrl, name, altTxt, price, description } = kanap;
    const article = `
    <article class="cart__item" data-id="${id}" data-color="${color}">
                <div class="cart__item__img">
                  <img src="${imageUrl}" alt="${altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${name}</h2>
                    <p>${color}</p>
                    <p>${price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
    cartItems.innerHTML += article;
    const deleteButtons = document.getElementsByClassName("deleteItem");
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", () => {
        const article =
          deleteButtons[i].parentNode.parentNode.parentNode.parentNode;
        const id = article.getAttribute("data-id");
        const color = article.getAttribute("data-color");

        article.remove();

        var items = JSON.parse(localStorage.getItem("cart"));
        var index = items.findIndex((x) => x.id == id && x.color == color);
        if (index >= 0) {
          items.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(items));
        }
      });
    }
    changeQuantity();
  }
});
// fonction affichant la quantité du panier
function displayQuantity() {
  // pour avoir la quantité totale
  const total = cartElements.reduce((total, item) => total + item.quantity, 0);
  totalQuantity.textContent = total;
}

displayQuantity();
//fonction calculant la nouvelle quantité et le prix lorsqu'on change la quantité
function changeQuantity() {
  let inputs = document.getElementsByClassName("itemQuantity");
  // modifier la fonction pour que la quantité soit modifier
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", () => {
      const article = inputs[i].parentNode.parentNode.parentNode.parentNode;
      const id = article.getAttribute("data-id");
      const color = article.getAttribute("data-color");
      var cart = JSON.parse(localStorage.getItem("cart"));
      var item = cart.find((x) => x.id == id && x.color == color);
      item.quantity = Number(inputs[i].value);
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  }
}

orderButton.addEventListener("click", () => submitForm(event));
// fonction gerant le formulaire
function submitForm(event) {
  event.preventDefault();
  if (cartElements.length === 0) {
    alert("Veuillez sélectionner des canapés à acheter");
    return;
  }
  if (isFormInvalid()) return;
  if (isEmailInvalid()) return;
  const body = makeRequestBody();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href = "./confirmation.html" + "?orderId=" + orderId;
      return console.log(data);
    })
    .catch((err) => console.log(err));
}
function makeRequestBody() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getIdsFromCache(),
  };
  console.log(body);
  return body;
}

function getIdsFromCache() {
  const numberOfProducts = cartElements.length;
  const ids = [];
  for (let i = 0; i < numberOfProducts; i++) {
    ids.push(cartElements[i].id);
  }
  return ids;
}

const firstName = document.getElementById("firstNameErrorMsg");
const firstNameInput = document.getElementById("firstName");
firstNameInput.addEventListener("change", (e) => {
  if (e.target.value === "") {
    firstName.textContent = "Veuillez remplir ce champs";
    buttonCommander.disabled = true;
  } else {
    firstName.textContent = "";
    buttonCommander.disabled = false;
  }
});

const lastName = document.getElementById("lastNameErrorMsg");
const lastNameInput = document.getElementById("lastName");
lastNameInput.addEventListener("change", (e) => {
  if (e.target.value === "") {
    lastName.textContent = "Veuillez remplir ce champs";
    buttonCommander.disabled = true;
  } else {
    lastName.textContent = "";
    buttonCommander.disabled = false;
  }
});

const address = document.getElementById("addressErrorMsg");
const addressInput = document.getElementById("address");
addressInput.addEventListener("change", (e) => {
  if (e.target.value === "") {
    address.textContent = "Veuillez remplir ce champs";
    buttonCommander.disabled = true;
  } else {
    address.textContent = "";
    buttonCommander.disabled = false;
  }
});

const city = document.getElementById("cityErrorMsg");
const cityInput = document.getElementById("city");
cityInput.addEventListener("change", (e) => {
  if (e.target.value === "") {
    city.textContent = "Veuillez remplir ce champs";
    buttonCommander.disabled = true;
  } else {
    city.textContent = "";
    buttonCommander.disabled = false;
  }
});

const email = document.getElementById("emailErrorMsg");
const emailInput = document.getElementById("email");
emailInput.addEventListener("change", () => {
  const regex = /^[A-Za-z0-9+*_.-]+@(.+)$/;

  if (regex.test(emailInput.value) === false) {
    email.textContent = "Veuillez entrez un email valide";
    buttonCommander.disabled = true;
  } else {
    email.textContent = "";
    buttonCommander.disabled = false;
  }
});
