// import des fonctions dans indexFonctions
import {
  createArticle,
  createLink,
  createImage,
  createTitle,
  createParagraph,
} from "./dom/indexFunctions.js";
// recupérer tous les produits du server
const urlApi = "http://localhost:3000/api/products";
fetch(urlApi)
  .then((res) => res.json())
  .then((data) => data.forEach(displayProducts))
  .catch((err) => console.error(err));

// ajouter des éléments aux produits
function displayProducts(kanap) {
  const { _id, imageUrl, altTxt, name, description } = kanap;
  const link = createLink(_id);
  const article = createArticle(link);
  createImage(imageUrl, altTxt, article);
  createTitle(article, name);
  createParagraph(article, description);
}
