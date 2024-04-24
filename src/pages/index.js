import {initialCards} from '../scripts/components/cards.js'
import {openPopup, closePopup} from '../scripts/components/modal.js'
import './index.css';



const cardsContainer = document.querySelector(".places__list");
const template = document.querySelector("#card-template").content;

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileNameInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardName = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");
const popupProfile = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const photoItem = document.querySelector(".popup__image");
const photoDescription = document.querySelector(".popup__caption");

const profileFormElement = popupProfile.querySelector(".popup__form");
const cardFormElement = cardPopup.querySelector(".popup__form");

const popupProfileCloseButton = document.querySelector(".popup__close");
const cardPopupCloseButton = document.querySelector(".card__delete-button");

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

function newCard(link, name) {
  const card = template.cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  cardImg.src = link;
  cardImg.alt = name;
  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__like-button").addEventListener("click", cardLiked);
  cardImg.addEventListener("click", function () {
    openPhoto(this.alt, this.src);
  });
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", function (element) {
      element.target.closest(".photo__item").remove();
    });
  return card;
}

function cardLiked() {
  return this.classList.toggle("photo__btn_active");
}

function openPhoto(alt, src) {
  photoItem.src = src;
  photoItem.alt = alt;
  photoDescription.textContent = alt;
  openPopup(imagePopup);
}



initialCards.forEach(function (item) {
  cardsContainer.prepend(newCard(item.link, item.name));
});
