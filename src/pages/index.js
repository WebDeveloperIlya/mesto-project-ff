import '../scripts/components/validation.js';

import {enableValidation} from '../scripts/components/validation.js'

import {openPopup, closePopup} from '../scripts/components/modal.js'
import './index.css';
import {createCard, deleteCard, likeCard} from '../scripts/components/card.js'

import {
  getInitialCards,
  getUserInfo,
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
  popupAvatarClose
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

profileFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  editProfile();
  closePopup(popupProfile);
});

document.querySelector('.popup__form-avatar').addEventListener('submit', function(evt) {
  evt.preventDefault();
  newAvatar(evt.querySelector('.popup__input_type_avatar'))
  editAvatarButton.style.background = `url(${evt.querySelector('.popup__input_type_avatar')})`;
  closePopup(querySelector('.popup__form-avatar'))
})

cardFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard('', cardLink.value, cardName.value, '0',  deleteCard, likeCard, handleImageClick));
  addCard(cardLink.value,cardName.value)
  closePopup(cardPopup);
  cardLink.value = null;
  cardName.value = null;
});

function editProfile() {
  editUserInfo(profileNameInput.value, profileDescriptionInput.value)
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

}

Promise.all([getUserInfo(), getInitialCards()])
  .then((values) => {
    console.log(values)

    profileName.textContent = values[0].about;
    profileDescription.textContent = values[0].name;
    values[1].forEach((card) => {
      
      let newCard = createCard(
        card._id, 
        card.link, 
        card.name,
        card.likes.length,
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
  inactiveButtonClass: '.popup__button-inactive',
  errorClass: '.popup__input-error_active'
}); 