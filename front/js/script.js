// url de l'api
const url = "http://localhost:3000/api/products";
const items = document.getElementById("items");
// fetch de l'api et appel de la fonction affichant les items
fetch(url)
  .then((res) => res.json())
  .then((data) => displayKanaps(data));
// fonction affichant les kanapés sur la page d'accueil
const displayKanaps = (kanaps) => {
  kanaps.forEach((kanap) => {
    items.innerHTML += `
        <a href="./product.html?id=${kanap._id}">
        <article>
        <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
        <h3 class="productName">${kanap.name}</h3> 
        <p class="productDescription">${kanap.description}</p>
        </article>
        </a>
        
        `;
  });
};
