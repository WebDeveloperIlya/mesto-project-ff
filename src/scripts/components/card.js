import { handleImageClick } from "../../pages/index.js";
import { template } from "./const.js";
import { deleteServerCard, putLikeOnCard, removeLikeOnCard } from './api.js'

export function likeCard(evt, id) {
  
  if (evt.target.classList.contains('card__like-button_is-active')){
    removeLikeOnCard(id)
    .then((res)=>{
      evt.target.classList.remove("card__like-button_is-active");
      evt.target.closest(".countLikes") == res.likes.length;
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
  } else {
    putLikeOnCard(id)
    .then((res)=>{
      evt.target.classList.add("card__like-button_is-active");
      evt.target.closest(".countLikes") == res.likes.length;
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

export function createCard(id, cardId, link, name, countLikes, deleteCard, likeCard, handleImageClick ) {
  const card = template.cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  const myId = 'bb65451046017648d2b9dec0';
  const cardDeleteButton = card.querySelector(".card__delete-button"); 

  cardImg.src = link; 
  cardImg.alt = name;
  card.querySelector(".card__title").textContent = name;

  if (countLikes.some((like) => like._id === myId)) { 
    card.querySelector(".card__like-button").classList.add("card__like-button_is-active"); 
  } 
  
  // Закраска кнопки лайка
  card.querySelector(".card__like-button").addEventListener("click", (evt) => {
    likeCard(evt, cardId)
  });
  card.querySelector('.countLikes').textContent = countLikes.length;

  // Открытие попапа картинки при нажатии на нее
  cardImg.addEventListener("click", () => handleImageClick(link, name));

  // Удаление карточки при нажатии кнопки
  if (id !== myId) { 
    cardDeleteButton.remove(); 
  } else { 
    cardDeleteButton.addEventListener("click", () => 
      cardDeleteButton
      .addEventListener("click", (evt) => {
        deleteCard(evt, id);
      })
    ); 
  }  


  return card;
}

