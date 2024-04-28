import {initialCards} from '../scripts/components/cards.js'


import {openPopup, closePopup} from '../scripts/components/modal.js'
import './index.css';

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
  cardFormElement,
  popupProfileCloseButton,
  cardPopupCloseButton
} from '../scripts/components/const.js'

import {createCard} from '../scripts/components/card.js'

export function openPhoto(alt, src) {
  photoItem.src = src;
  photoItem.alt = alt;
  photoDescription.textContent = alt;
  openPopup(imagePopup);
}


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
  cardsContainer.prepend(createCard(cardLink.value, cardName.value));
  closePopup(cardPopup);
  cardLink.value = null;
  cardName.value = null;
});

function editProfile() {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}


initialCards.forEach(function (item) {
  cardsContainer.prepend(createCard(item.link, item.name));
});
