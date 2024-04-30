import { openPopup } from "./modal.js";
import { 
  template,
  photoItem,
  photoDescription,
  imagePopup 
} from "./const.js";

export function createCard(link, name) {
  const card = template.cloneNode(true);
  const cardImg = card.querySelector(".card__image");

  cardImg.src = link; 
  cardImg.alt = name;
  card.querySelector(".card__title").textContent = name;
  
  // Закраска кнопки лайка
  card.querySelector(".card__like-button").addEventListener("click", function likeCard(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  });

  // Открытие попапа картинки при нажатии на нее
  cardImg.addEventListener("click", function openPhoto() {
    photoItem.src = link;
    photoItem.alt = name;
    photoDescription.textContent = name;
    openPopup(imagePopup);
  });

  // Удаление карточки при нажатии кнопки
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", function deleteCard(element) {
      element.target.closest(".card").remove();
    });
  return card;
}

