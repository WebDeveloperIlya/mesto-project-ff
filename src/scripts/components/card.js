import { openPopup } from "./modal.js";
import { 
  template,
  photoItem,
  photoDescription,
  imagePopup 
} from "./const.js";

import { openPhoto } from "../../pages/index.js";

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function createCard(link, name) {
  const card = template.cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  cardImg.src = link; 
  cardImg.alt = name;
  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__like-button").addEventListener("click", likeCard);
  cardImg.addEventListener("click", function () {
    openPhoto(name, link);
  });
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", function (element) {
      element.target.closest(".card").remove();
    });
  return card;
}

