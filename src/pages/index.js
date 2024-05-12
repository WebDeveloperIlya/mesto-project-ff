import '../scripts/components/validation.js';

import {enableValidation} from '../scripts/components/validation.js'

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

export function handleImageClick(link, name) {
  photoItem.src = link;
  photoItem.alt = name;
  photoDescription.textContent = name;
  openPopup(imagePopup);
};

editAvatarButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup(popupEditAvatar)
})

profileEditButton.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent
  profileDescriptionInput.value = profileDescription.textContent
  openPopup(popupProfile);
});

profileAddButton.addEventListener("click", function () {
  openPopup(cardPopup);
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
  evt.preventDefault();
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
}


function submitAddNewCard(evt) { 
  evt.preventDefault(); 
  evt.submitter.textContent = "Сохранение..."; 

  const card = { 
    name: cardName.value, 
    link: cardLink.value, 
  }; 
  addCard(card) 
    .then((data) => { 
      cardsContainer.prepend( 
        createCard(data.owner._id, data._id, data.link, data.name, data.likes, deleteCard, likeCard, handleImageClick) 
      ); 
      closePopup(cardPopup); 
    }) 
    .catch((error) => console.log(error)) 
    .finally(() => { 
      evt.submitter.textContent = "Создать"; 
    }); 
} 

function submitEditProfile(evt) { 
  evt.preventDefault(); 
  evt.submitter.textContent = "Сохранение..."; 
  editUserInfo(profileNameInput.value, profileDescriptionInput.value) 
    .then((data) => { 
      renderProfile(); 
      closePopup(popupProfile); 
    }) 
    .catch((error) => console.log(error)) 
    .finally(() => { 
      evt.submitter.textContent = "Сохранить"; 
    }); 
}

function renderProfile() {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

Promise.all([getUserInfo(), getInitialCards()])
  .then((values) => {
    console.log(values)

    profileName.textContent = values[0].name;
    profileDescription.textContent = values[0].about;
    editAvatarButton.style.background = `url(${values[0].avatar})`;

    values[1].forEach((card) => {
      
      let newCard = createCard(
        card.owner._id, 
        card._id,
        card.link, 
        card.name,
        card.likes,
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

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}); 