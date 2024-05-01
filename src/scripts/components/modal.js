function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

function handleOverlay (evt){
  if (evt.target.classList.contains('popup_is-opened')){
    closePopup(evt.target);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener('keydown', handleEscape); 
  document.addEventListener('click', handleOverlay)
}

export function closePopup(popup) {
  document.removeEventListener('keydown', handleEscape); 
  document.removeEventListener('click',  handleOverlay)
  popup.classList.remove("popup_is-opened");
}