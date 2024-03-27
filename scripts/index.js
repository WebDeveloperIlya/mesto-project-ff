// @todo: Функция создания карточки
const cardAddButton = document.querySelector('.profile__add-button');
const formNewCard = document.querySelector('.popup_type_new-card');
const formCloseButton = document.querySelector('.popup__close');

cardAddButton.addEventListener('click', function(){
  formNewCard.style.display = 'flex';
})

formCloseButton.addEventListener('click', function(){
  formNewCard.style.display = 'none';
})


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

function renderCard({ name, link }) {
  const placeElement = cardTemplate
    .querySelector(".card")
    .cloneNode(true);
  placeElement.querySelector(".card__title").textContent = name;
  placeElement.querySelector(".card__image").src = link;

  placesContainer.prepend(placeElement);
}

render();