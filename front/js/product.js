const itemImg = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const select = document.getElementById("colors");
const button = document.querySelector("#addToCart");
const currentUrl = window.location.search;
const urlParams = new URLSearchParams(currentUrl);
const id = urlParams.get("id");

fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((data) => displayKanap(data));

const displayKanap = (kanap) => {
  itemImg.innerHTML = `
    <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
    `;
  title.textContent = kanap.name;
  price.textContent = kanap.price;
  description.textContent = kanap.description;
  const colors = kanap.colors;
  colors.forEach((color) => {
    select.innerHTML += `
    <option value=${color}>${color}</option>
    `;
  });
};

button.addEventListener("click", handleClick);

function handleClick() {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  if (checkOrder(color, quantity)) return;
  saveOrder(color, quantity);
}

function saveOrder(color, quantity) {
  let cart = localStorage.getItem("cart");
  const data = {
    id: id,
    color: color,
    quantity: Number(quantity),
  };
  if (cart === null) {
    cart = [];
    cart.push(data);
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    let cartStorage = JSON.parse(cart);
    cartStorage = addCartItem(cartStorage, data);
    localStorage.setItem("cart", JSON.stringify(cartStorage));
  }
}
function checkOrder(color, quantity) {
  if (quantity > 100) {
    alert("La limite maximale autorisée est de 100");
    return true;
  }
  if (color == null || color === "" || quantity == null || quantity == 0) {
    alert("Veuillez sélectionner une couleur et une quantité entre 1 et 100");
    return true;
  }
}

function addCartItem(cartStorage, data) {
  // si on retrouve l'id et la couleur pour un meme item on modifie sa quantité sinon on ajoute l'item
  for (let i = 0; i < cartStorage.length; i++) {
    if (data.id === cartStorage[i].id && data.color === cartStorage[i].color) {
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
