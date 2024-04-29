function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener('keydown', handleEscape); 

  document.addEventListener('click', function (evt){
    if (evt.target == popup){
      closePopup(popup)
    }
  })
}

export function closePopup(popup) {
  document.removeEventListener('keydown', handleEscape); 
  popup.classList.remove("popup_is-opened");
}