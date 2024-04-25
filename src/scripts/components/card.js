import { openPopup } from "./modal.js";
import { 
  template,
  photoItem,
  photoDescription,
  imagePopup 
} from "./const.js";

function cardLiked() {
  return this.classList.toggle("card__like-button_is-active");
}

export function newCard(link, name) {
  const card = template.cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  cardImg.src = link; 
  cardImg.alt = name;
  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__like-button").addEventListener("click", cardLiked);
  cardImg.addEventListener("click", function () {
    openPhoto(this.alt, this.src);
  });
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", function (element) {
      element.target.closest(".card").remove();
    });
  return card;
}

function openPhoto(alt, src) {
  photoItem.src = src;
  photoItem.alt = alt;
  photoDescription.textContent = alt;
  openPopup(imagePopup);
}
