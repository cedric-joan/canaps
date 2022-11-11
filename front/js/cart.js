// import des fonctions dans indexFonctions
import { cart } from "./dom/cartDom.js";
// variables gobales pour vérification du panier
const lastName = document.querySelector("#lastName");
const firstName = document.querySelector("#firstName");
const inputEmail = document.querySelector("#email");
listenToSubmitButton();
listenToFirstName();
listenToLastName();
listenToEmail();
// vérification nom et prénom
function isNameValid(field) {
  const nameRegExp = new RegExp("[0-9]", "g");
  return !nameRegExp.test(field.value);
}
// vérification email
function isEmailValid(inputEmail) {
  const emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  return emailRegExp.test(inputEmail.value);
}
// saisie du prénom dans le champ
function listenToFirstName() {
  firstName.addEventListener("change", checkFirstName);
  firstName.addEventListener("keyup", checkFirstName);
}
// afficher un message erreur
function checkFirstName() {
  const errorMsg = document.querySelector("#firstNameErrorMsg");
  errorMsg.textContent = isNameValid(firstName) ? "" : "chiffres non autorisés";
}
// saisie du nom dans le champ
function listenToLastName() {
  lastName.addEventListener("change", checkLastName);
  lastName.addEventListener("keyup", checkLastName);
}
// afficher un message erreur
function checkLastName() {
  const errorMsg = document.querySelector("#lastNameErrorMsg");
  errorMsg.textContent = isNameValid(lastName) ? "" : "chiffres non autorisés";
}
// saisie de l'email dans le champ
function listenToEmail() {
  inputEmail.addEventListener("change", checkEmail);
}
// afficher un message erreur
function checkEmail() {
  const errorMsg = document.querySelector("#emailErrorMsg");
  errorMsg.textContent = isEmailValid(inputEmail)
    ? ""
    : "adresse email non valide";
}
// bouton valider la commande
function listenToSubmitButton() {
  const orderButton = document.querySelector("#order");
  orderButton.addEventListener("click", (e) => submitForm(e));
}
// vérification du panier
function submitForm(e) {
  e.preventDefault();
  if (cart.length == 0) {
    alert("Votre panier est vide");
    return;
  }
  if (!isNameValid(firstName)) return;
  if (!isNameValid(lastName)) return;
  if (!isEmailValid(inputEmail)) return;
  // vérification des champs saisies
  const inputForm = document.querySelectorAll("input");
  for (let i = 0; i < inputForm.length; i++) {
    if (inputForm[i].value === "") {
      alert("Veuillez renseigner tous les champs");
      return;
    }
  }
  // envoyer les données au server
  const body = contacRequest();
  const postData = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  fetch("http://localhost:3000/api/products/order", postData)
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href = "/html/confirmation.html" + "?orderId=" + orderId;
    })
    .catch((error) => console.log(error));
}
// élements du formulaire de contact
function contacRequest() {
  const form = document.querySelector(".cart__order__form").elements;
  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const address = form.address.value;
  const city = form.city.value;
  const email = form.email.value;
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: productsIds(),
  };
  return body;
}
// récupérer les identifiants de commande
function productsIds() {
  const ids = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const id = key.split("-")[0];
    ids.push(id);
  }
  return ids;
}
