import { template } from "./const.js";
import { deleteServerCard, getUserInfo, putLikeOnCard, removeLikeOnCard } from './api.js'

export function likeCard(evt, id) {
  
  if (evt.target.classList.contains('card__like-button_is-active')){
    removeLikeOnCard(id)
    .then((res)=>{
      evt.target.classList.remove("card__like-button_is-active");
      evt.target.closest(".card").querySelector(".countLikes").textContent = res.likes.length;
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
  } else {
    putLikeOnCard(id)
    .then((res)=>{
      evt.target.classList.add("card__like-button_is-active");
      evt.target.closest(".card").querySelector(".countLikes").textContent = res.likes.length;
    })

    .catch(err => console.log(`Ошибка.....: ${err}`))

  }
  
}

export function deleteCard(evt, id) {
  deleteServerCard(id, evt)
  .then(()=>{
    evt.target.closest(".card").remove();
  })
  .catch(err => console.log(`Ошибка.....: ${err}`))
}

export function createCard(userId, data, deleteCard, likeCard, handleImageClick ) {
  const card = template.cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button"); 

  const ownerCardId = data.owner._id
  const cardId = data._id
  const countLikes = data.likes

  const cardName = data.name
  const cardLink = data.link
 

  cardImg.src = cardLink; 
  cardImg.alt = cardName;
  card.querySelector(".card__title").textContent = cardName;

  if (countLikes.some((like) => like._id === userId)) { 
    card.querySelector(".card__like-button").classList.add("card__like-button_is-active"); 
  } 
  
  // Закраска кнопки лайка
  card.querySelector(".card__like-button").addEventListener("click", (evt) => {
    likeCard(evt, cardId)
  });
  card.querySelector('.countLikes').textContent = countLikes.length;

  // Открытие попапа картинки при нажатии на нее
  cardImg.addEventListener("click", () => handleImageClick(cardLink, cardName));

  // Удаление карточки при нажатии кнопки
  if (ownerCardId !== userId) { 
    cardDeleteButton.remove(); 
  } else { 
    cardDeleteButton.addEventListener("click", () => 
      cardDeleteButton
      .addEventListener("click", (evt) => {
        deleteCard(evt, cardId);
      })
    ); 
  }  


  return card;
}

