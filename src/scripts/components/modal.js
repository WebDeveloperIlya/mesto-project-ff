function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener('keydown', function (e){
  if (e.key === 'Escape'){
    closePopup(popup)
  }
  })
  popup.addEventListener('click', closePopup(popup))
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

export {openPopup, closePopup}