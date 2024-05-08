import { handleImageClick } from "../../pages/index.js";
import { template } from "./const.js";
import { deleteServerCard, putLikeOnCard, removeLikeOnCard } from './api.js'

export function likeCard(evt, id) {
  evt.target.classList.toggle("card__like-button_is-active");
  if (evt.target.classList === 'card__like-button_is-active'){
    putLikeOnCard(id)
  } else {
    removeLikeOnCard(id)
  }
  
}

export function deleteCard(evt, id) {
  evt.target.closest(".card").remove();
  deleteServerCard(id)
}

export function createCard(id, link, name, countLikes, deleteCard, likeCard, handleImageClick ) {
  const card = template.cloneNode(true);
  const cardImg = card.querySelector(".card__image");

  cardImg.src = link; 
  cardImg.alt = name;
  card.querySelector(".card__title").textContent = name;
  
  // Закраска кнопки лайка
  card.querySelector(".card__like-button").addEventListener("click", (evt) => {
    likeCard(evt, id)
  });
  card.querySelector('.countLikes').textContent = countLikes;

  // Открытие попапа картинки при нажатии на нее
  cardImg.addEventListener("click", () => handleImageClick(link, name));

  // Удаление карточки при нажатии кнопки
  card
  .querySelector(".card__delete-button")
  .addEventListener("click", (evt) => {
    deleteCard(evt, id);
  });
  return card;
}

