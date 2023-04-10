export default function calculPrice(kanap) {
  let totalPr = 0;
  const items = JSON.parse(localStorage.getItem("cart"));
  let total = items.reduce(
    (total, item) => total + item.quantity * kanap.price,
    totalPr
  );
  console.log(total);
  document.getElementById("totalPrice").textContent = total;
}
