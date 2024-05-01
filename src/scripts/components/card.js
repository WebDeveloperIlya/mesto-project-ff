import { handleImageClick } from "../../pages/index.js";
import { 
  template,
} from "./const.js";

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

export function createCard(link, name, deleteCard, likeCard, handleImageClick ) {
  const card = template.cloneNode(true);
  const cardImg = card.querySelector(".card__image");

  cardImg.src = link; 
  cardImg.alt = name;
  card.querySelector(".card__title").textContent = name;
  
  // Закраска кнопки лайка
  card.querySelector(".card__like-button").addEventListener("click", likeCard);

  // Открытие попапа картинки при нажатии на нее
  cardImg.addEventListener("click", () => handleImageClick(link, name));

  // Удаление карточки при нажатии кнопки
  card
  .querySelector(".card__delete-button")
  .addEventListener("click", (evt) => {
    deleteCard(evt);
  });
  return card;
}

