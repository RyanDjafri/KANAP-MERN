const url = "http://localhost:3000/api/products";
const items = document.getElementById("items");
fetch(url)
  .then((res) => res.json())
  .then((data) => displayKanaps(data));

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
