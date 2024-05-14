import '../scripts/components/validation.js';

import {enableValidation, clearValidation} from '../scripts/components/validation.js'

import {openPopup, closePopup} from '../scripts/components/modal.js'
import './index.css';
import {createCard, deleteCard, likeCard} from '../scripts/components/card.js'

import {
  getInitialCards,
  getUserInfo,
  addCard,
  editUserInfo,
  newAvatar
} from '../scripts/components/api.js'
import {
  cardsContainer,
  profileEditButton,
  profileAddButton,
  profileNameInput,
  profileDescriptionInput,
  profileName,
  profileDescription,
  cardName,
  cardLink,
  popupProfile,
  cardPopup,
  imagePopup,
  profileFormElement,
  photoItem,
  photoDescription,
  cardFormElement,
  popupProfileCloseButton,
  popupImageCloseButton,
  cardPopupCloseButton,
  editAvatarButton,
  popupEditAvatar,
  popupAvatarClose,
  popupAvatarInput
} from '../scripts/components/const.js'

const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export function handleImageClick(link, name) {
  photoItem.src = link;
  photoItem.alt = name;
  photoDescription.textContent = name;
  openPopup(imagePopup);
};

editAvatarButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup(popupEditAvatar)
  clearValidation(document.querySelector('.popup__form-avatar'), configValidation)
})

profileEditButton.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent
  profileDescriptionInput.value = profileDescription.textContent
  openPopup(popupProfile);
  
  clearValidation(profileFormElement, configValidation)
});

profileAddButton.addEventListener("click", function () {
  openPopup(cardPopup);

  clearValidation(cardFormElement, configValidation)
});

popupAvatarClose.addEventListener("click", function () {
  closePopup(popupEditAvatar);
});

popupProfileCloseButton.addEventListener("click", function () {
  closePopup(popupProfile);
});

popupImageCloseButton.addEventListener("click", function () {
  closePopup(imagePopup);
});

cardPopupCloseButton.addEventListener("click", function () {
  closePopup(cardPopup);
});

profileFormElement.addEventListener("submit", function (evt){
  submitEditProfile(evt);
})

document.querySelector('.popup__form-avatar').addEventListener('submit', function(evt) {
  submitNewAvatar(evt, popupAvatarInput.value)
})

cardFormElement.addEventListener("submit", function (evt) {
  submitAddNewCard(evt);
});

function submitNewAvatar(evt, input){
  evt.submitter.textContent = "Сохранение..."; 

  newAvatar(input)
    .then((res)=>{
      console.log(res)
      editAvatarButton.style.background = `url(${res.avatar})`
      closePopup(popupEditAvatar); 
    })
    .catch((error) => console.log(error)) 
    .finally(() => { 
      evt.submitter.textContent = "Создать"; 
    }); 
    document.querySelector('.popup__form-avatar').reset();
}


function submitAddNewCard(evt) { 
  evt.submitter.textContent = "Сохранение..."; 

  const card = { 
    name: cardName.value, 
    link: cardLink.value, 
  }; 

  addCard(card) 
    .then((data) => { 
      cardsContainer.prepend( 
        createCard(data.owner._id, data, deleteCard, likeCard, handleImageClick) 
      ); 
      closePopup(cardPopup); 
    }) 
    .catch((error) => console.log(error)) 
    .finally(() => { 
      evt.submitter.textContent = "Создать"; 
    }); 
    cardFormElement.reset();
} 

function submitEditProfile(evt) {  
  evt.submitter.textContent = "Сохранение..."; 
  editUserInfo(profileNameInput.value, profileDescriptionInput.value) 
    .then((data) => { 
      renderProfile(data.name, data.about); 
      closePopup(popupProfile); 
    }) 
    .catch((error) => console.log(error)) 
    .finally(() => { 
      evt.submitter.textContent = "Сохранить"; 
    }); 
    profileFormElement.reset();
}

function renderProfile(name, about) {
  profileName.textContent = name;
  profileDescription.textContent = about;
}

Promise.all([getUserInfo(), getInitialCards()])
  .then((values) => {
    console.log(values[0])
    profileName.textContent = values[0].name;
    profileDescription.textContent = values[0].about;
    editAvatarButton.style.background = `url(${values[0].avatar})`;
    console.log(values[1])
    values[1].forEach((card) => {
      
      let newCard = createCard(
        values[0]._id,
        card,
        deleteCard, 
        likeCard, 
        handleImageClick)
      document.querySelector('.places__list').append(newCard)
    })
    
  })
  .catch((err) => {
    console.log(err)
  })



const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  })

enableValidation(configValidation); 