import '../scripts/components/validation.js';

import {openPopup, closePopup} from '../scripts/components/modal.js'
import './index.css';
import {createCard, deleteCard, likeCard} from '../scripts/components/card.js'

import {
  addServerCards,
  userInfo,
  newUserInfo,
  newCardServer
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

editAvatarButton.addEventListener('click', function () {
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

popupEditAvatar.querySelector('.popup__form-avatar').addEventListener('submit', function(evt) {
  evt.preventDefault();
  editAvatarButton.style.background = `url(${evt.querySelector('.popup__input_type_avatar')})`;
})

cardFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard('', cardLink.value, '0', cardName.value, deleteCard, likeCard, handleImageClick));
  newCardServer(cardLink.value, cardName.value)
  closePopup(cardPopup);
  cardLink.value = null;
  cardName.value = null;
});

function editProfile() {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  newUserInfo(profileNameInput.value, profileDescriptionInput.value)
}

addServerCards();
userInfo();