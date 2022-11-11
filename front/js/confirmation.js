removeStorage();
// recupérer id dans url
const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
const orderId = searchParams.get("orderId");
// afficher l'identifiant de la commande
addOrderId(orderId);
function addOrderId(orderId) {
  const confirmation = document.getElementById("orderId");
  confirmation.textContent = orderId;
}
// supprimer les produits du localstorage
function removeStorage() {
  const storage = window.localStorage;
  storage.clear();
}
