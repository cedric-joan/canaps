// création d'un lien
function createLink(id) {
  const link = document.createElement("a");
  link.href = "./product.html?id=" + id;
  const items = document.querySelector("#items");
  items.appendChild(link);
  return link;
}
// créer l'élément article
function createArticle(link) {
  const article = document.createElement("article");
  link.appendChild(article);
  return article;
}
// créer l'élément image du produit
function createImage(imageUrl, altTxt, article) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  article.appendChild(image);
}
// afficher le nom du produit
function createTitle(article, name) {
  const title = document.createElement("h3");
  title.classList.add("productName");
  title.innerText = name;
  article.appendChild(title);
}
// afficher une description du produit
function createParagraph(article, description) {
  const paragraph = document.createElement("p");
  paragraph.classList.add("productDescription");
  article.appendChild(paragraph);
  paragraph.innerText = description;
}
export { createArticle, createImage, createLink, createParagraph, createTitle };
