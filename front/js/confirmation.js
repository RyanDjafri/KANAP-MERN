const currentUrl = window.location.search;
const urlParams = new URLSearchParams(currentUrl);
const orderId = urlParams.get("orderId");
const orderIdText = document.getElementById('orderId');

orderIdText.textContent=orderId;
