import {cardsContainer} from './const.js'
import {createCard, deleteCard, likeCard} from './card.js'
import {handleImageClick} from '../../pages/index.js'

/* Запрос карточек и последующее добавление их */
export function addServerCards(){ 
  fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
  headers: {
    authorization: 'b13f5d37-5775-4f5a-b71e-05763fae6d5e'
  }
})
  .then(res => res.json())
  .then((result) => {
    Array.from(result).forEach((item) => {
      cardsContainer.prepend(createCard(
        item._id, 
        item.link, 
        item.name, 
        item.likes.length, 
        deleteCard, 
        likeCard, 
        handleImageClick ));
    });
  });
}

/* Запрос данных о пользователе и подставление данных в шапке профиля */
export function userInfo() {
  fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me', {
  headers: {
    authorization: 'b13f5d37-5775-4f5a-b71e-05763fae6d5e'
  }
})
  .then(res => res.json())
  .then((result) => {
    const Name = result.name
    const About = result.about
    
    document.querySelector('.profile__title').textContent = Name;
    document.querySelector('.profile__description').textContent = About;
    document.querySelector('.profile__image').style.backgroundImage = `url(${result.avatar})`
  })
  newUserInfo()
}

/* Обновление данных о пользователе */
export function newUserInfo(name, about){
  fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'b13f5d37-5775-4f5a-b71e-05763fae6d5e',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: name,
    about: about
  })
});
}

/* Функция добавления карточки на сервер */
export function newCardServer(cardLink, cardName) {
  fetch('https://nomoreparties.co/v1/wff-cohort-12/cards', {
    method: 'POST',
    headers: {
      authorization: 'b13f5d37-5775-4f5a-b71e-05763fae6d5e',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
})}

/* Удаление карточки с сервера */
export function deleteServerCard(id){
  fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'b13f5d37-5775-4f5a-b71e-05763fae6d5e',
      'Content-Type': 'application/json'
    }
  })
}

/* Поставить лайк на карточку */
export function putLikeOnCard(id){
  fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: 'b13f5d37-5775-4f5a-b71e-05763fae6d5e',
      'Content-Type': 'application/json'
    }
  })
}

/* Удалить лайк с карточки */
export function removeLikeOnCard(id){
  fetch(`https://nomoreparties.co/v1/wff-cohort-12/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'b13f5d37-5775-4f5a-b71e-05763fae6d5e',
      'Content-Type': 'application/json'
    }
  })
}

/* Смена аватара */
export function newAvatar(link){
  fetch('https://nomoreparties.co/v1/wff-cohort-12/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'b13f5d37-5775-4f5a-b71e-05763fae6d5e',
      'Content-Type': 'application/json'
    },
    body: {
      avatar: link
    }
  })
}