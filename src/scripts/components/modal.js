function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

function handleWindow (evt){
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.target == openedPopup){
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener('keydown', handleEscape); 
  document.addEventListener('click', handleWindow)
}

export function closePopup(popup) {
  document.removeEventListener('keydown', handleEscape); 
  document.removeEventListener('click',  handleWindow)
  popup.classList.remove("popup_is-opened");
}