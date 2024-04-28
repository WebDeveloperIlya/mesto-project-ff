function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', handleEscape); 
}

export function closePopup(popup) {
  document.removeEventListener('keydown', handleEscape); 
  popup.classList.remove("popup_opened");
}