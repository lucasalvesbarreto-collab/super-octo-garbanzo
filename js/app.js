const products = [
  { id: 1, title: "Teclado Mecânico", price: "R$ 250,00" },
  { id: 2, title: "Mouse Gamer", price: "R$ 120,00" },
  { id: 3, title: "Monitor 144Hz", price: "R$ 1.100,00" }
];

function renderProductList(items) {
  const container = document.getElementById("product-list");
  const template = document.getElementById("card-template");

  if (!container || !template) return;

  container.innerHTML = "";

  const fragment = document.createDocumentFragment();

  items.forEach((product) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".card-title").textContent = product.title;
    clone.querySelector(".card-price").textContent = product.price;

    fragment.appendChild(clone);
  });

  container.appendChild(fragment);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductList(products);
});