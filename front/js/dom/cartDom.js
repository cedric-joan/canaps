export const cart = [];
// récupérer les éléments dans le panier
getCartFromCache();
cart.forEach((item) => {
  retrievePrice(item);
});
// récupérer les ids et les prix des produits
function retrievePrice(item) {
  fetch(`http://localhost:3000/api/products/${item.id}`)
    .then((res) => res.json())
    .then((data) => getPrice(data))
    .then((price) => (item.price = price))
    .then(() => displayItem(item))
    .catch((err) => console.error(err));
}
// récupérer les produits dans le localStorage
function getCartFromCache() {
  const numberOfProducts = localStorage.length;
  for (let i = 0; i < numberOfProducts; i++) {
    const dataProducts = localStorage.getItem(localStorage.key(i));
    const dataObject = JSON.parse(dataProducts);
    cart.push(dataObject);
  }
}
// ajouter des éléments au produit
export function displayItem(item) {
  createArticle(item);
  updateQuantity();
  updateTotal();
  return item;
}
// création d'un élément article
function createArticle(item) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  document.querySelector("#cart__items").appendChild(article);
  createImage(item, article);
}
// afficher une image du produit
function createImage(item, article) {
  const cartItemImg = document.createElement("div");
  cartItemImg.classList.add("cart__item__img");
  const img = document.createElement("img");
  img.src = item.productImg;
  img.alt = item.imgText;
  cartItemImg.appendChild(img);
  article.appendChild(cartItemImg);
  createDescription(item, article);
}
// afficher la description du produit
function createDescription(item, article) {
  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");
  const cartItemContentDescription = document.createElement("div");
  cartItemContentDescription.classList.add("cart__item__content__description");
  cartItemContent.appendChild(cartItemContentDescription);
  article.appendChild(cartItemContent);
  createSettings(cartItemContent, item);
  createName(item, cartItemContentDescription);
  createColor(item, cartItemContentDescription);
  addPriceToPage(item, cartItemContentDescription);
}
// afficher le nom du produit
function createName(item, cartItemContentDescription) {
  const title = document.createElement("h2");
  title.textContent = item.productName;
  cartItemContentDescription.appendChild(title);
}
// afficher la couleur
function createColor(item, cartItemContentDescription) {
  const colorsProduct = document.createElement("p");
  colorsProduct.textContent = item.color;
  cartItemContentDescription.appendChild(colorsProduct);
}
// ajouter le prix
function getPrice(sofa) {
  const productPrice = sofa.price;
  return productPrice;
}
// afficher le prix
function addPriceToPage(item, cartItemContentDescription) {
  const itemPrice = document.createElement("p");
  itemPrice.textContent = item.price + " €";
  cartItemContentDescription.appendChild(itemPrice);
}
// afficher la quantité
function createSettings(cartItemContent, item) {
  const cartItemContentSettings = document.createElement("div");
  cartItemContentSettings.classList.add("cart__item__content__settings");
  cartItemContent.appendChild(cartItemContentSettings);
  const cartItemContentSettingsQuantity = document.createElement("div");
  cartItemContentSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  const pQuantity = document.createElement("p");
  pQuantity.textContent = "Qté : ";
  cartItemContentSettingsQuantity.appendChild(pQuantity);
  cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
  makeQuantityInput(item, cartItemContentSettingsQuantity);
  addDelete(cartItemContentSettings, item);
}
// afficher l'élément supprimer
function addDelete(cartItemContentSettings, item) {
  const cartItemContentSettingsDelete = document.createElement("div");
  cartItemContentSettingsDelete.classList.add(
    "cart__item__content__settings__delete"
  );
  cartItemContentSettingsDelete.addEventListener("click", () =>
    deleteProduct(item)
  );
  const deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  deleteItem.textContent = "Supprimer";
  cartItemContentSettingsDelete.appendChild(deleteItem);
  cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
}
// supprimer un produit identique
function deleteProduct(item) {
  const deleteItems = cart.findIndex(
    (products) => products.id === item.id && products.color === item.color
  );
  cart.splice(deleteItems, 1);
  updateQuantity();
  updateTotal();
  deleteDataOfCache(item);
  deleteItemFromCart(item);
}
// supprimer un produit du panier
function deleteItemFromCart(item) {
  const deleteArticle = document.querySelector("article");
  const key = `${item.id}-${item.color}`;
  deleteArticle.remove(key);
}
// supprimer un produit du localstorage
function deleteDataOfCache(item) {
  const key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
}
// calculer le nombre de produit dans le panier
function updateQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity");
  const newQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  totalQuantity.textContent = newQuantity;
}
// calculer le prix total du panier
function updateTotal() {
  const totalPrice = document.querySelector("#totalPrice");
  const newTotal = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  totalPrice.textContent = newTotal;
}
// création d'un élément input
function makeQuantityInput(item, cartItemContentSettingsQuantity) {
  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.dataset.id = item.id;
  input.dataset.color = item.color;
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;
  cartItemContentSettingsQuantity.appendChild(input);
  input.addEventListener("change", () =>
    updateInput(item.id, input.value, item)
  );
}
// augmenter ou diminuer la quantité d'un produit
function updateInput(id, newValue, item) {
  const addValue = cart.find((item) => item.id === id);
  addValue.quantity = Number(newValue);
  updateQuantity();
  updateTotal();
  saveNewData(item);
}
// sauvegarder les nouvelles données dans le localStorage
function saveNewData(item) {
  const key = `${item.id}-${item.color}`;
  const saveData = JSON.stringify(item);
  localStorage.setItem(key, saveData);
}
