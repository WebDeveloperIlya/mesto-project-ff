// @todo: Функция создания карточки
const cardAddButton = document.querySelector('.profile__add-button');
const formNewCard = document.querySelector('.popup_type_new-card');
const formEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');

profileEditButton.addEventListener('click', function(){
  formEdit.style.display = 'flex';
})

cardAddButton.addEventListener('click', function(){
  formNewCard.style.display = 'flex';
})

function closeForm(form){
  form.parentNode.parentNode.style.display = 'none';
}

// @todo: Функция удаления карточки
function deleteCard(element){
  element.parentNode.remove();
}

// @todo: Вывести карточки на страницу
const placesContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;


const placeInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

function render() {
  placeInfo.forEach(renderCard);
}
const NewCardName = document.querySelector('.popup__input_type_card-name');
const newCardLink = document.querySelector('.popup__input popup__input_type_url');


function renderCard({ name, link }) {
  const placeElement = cardTemplate
    .querySelector(".card")
    .cloneNode(true);
  placeElement.querySelector(".card__title").textContent = name;
  placeElement.querySelector(".card__image").src = link;

  placesContainer.prepend(placeElement);
}

render();



function newCard({NewCardName, newCardLink}){
  const placeElement = cardTemplate
    .querySelector(".card")
    .cloneNode(true);
  placeElement.querySelector(".card__title").textContent = NewCardName.value;
  placeElement.querySelector(".card__image").src = newCardLink.value;

  placesContainer.prepend(placeElement);
}