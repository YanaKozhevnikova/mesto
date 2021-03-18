let popup = document.querySelector('.popup');
let form = popup.querySelector('.form');
let editButton = document.querySelector('.profile__button_type_edit');
let closeButton = popup.querySelector('.popup__close-button');
let nameInput = form.querySelector('.form__input_type_name');
let aboutInput = form.querySelector('.form__input_type_about');
let username = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');

function openPopup() {
  nameInput.value = username.textContent;
  aboutInput.value = about.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function handleProfileSubmit (evt) {
    evt.preventDefault();
    username.textContent = nameInput.value;
    about.textContent = aboutInput.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', handleProfileSubmit);
