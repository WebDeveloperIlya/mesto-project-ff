export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', function (e){
  if (e.key === 'Escape'){
    closePopup(popup)
    EventTarget.removeEventListener;
    console.log('esscape')
  }
  })
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}