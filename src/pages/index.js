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

import {newCard} from '../scripts/components/card.js'

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

imagePopup.addEventListener("click", function () {
  closePopup(imagePopup);
});

profileFormElement.addEventListener("submit", function (element) {
  element.preventDefault();
  profileEdit();
  closePopup(popupProfile);
});

cardFormElement.addEventListener("submit", function (element) {
  element.preventDefault();
  cardsContainer.prepend(newCard(cardLink.value, cardName.value));
  closePopup(cardPopup);
  cardLink.value = null;
  cardName.value = null;
});

function profileEdit() {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}


initialCards.forEach(function (item) {
  cardsContainer.prepend(newCard(item.link, item.name));
});
