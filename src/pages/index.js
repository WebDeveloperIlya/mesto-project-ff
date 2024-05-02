import {initialCards} from '../scripts/components/cards.js'


import {openPopup, closePopup} from '../scripts/components/modal.js'
import './index.css';
import {deleteCard, likeCard} from '../scripts/components/card.js'

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
  cardPopupCloseButton
} from '../scripts/components/const.js'

export function handleImageClick(link, name) {
  photoItem.src = link;
  photoItem.alt = name;
  photoDescription.textContent = name;
  openPopup(imagePopup);
};

import {createCard} from '../scripts/components/card.js'

profileEditButton.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent
  profileDescriptionInput.value = profileDescription.textContent
  openPopup(popupProfile);
});

profileAddButton.addEventListener("click", function () {
  openPopup(cardPopup);
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

cardFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(cardLink.value, cardName.value, deleteCard, likeCard, handleImageClick));
  closePopup(cardPopup);
  cardLink.value = null;
  cardName.value = null;
});

function editProfile() {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}


initialCards.forEach(function (item) {
  cardsContainer.prepend(createCard(item.link, item.name, deleteCard, likeCard, handleImageClick ));
});
