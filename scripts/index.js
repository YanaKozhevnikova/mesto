import {Card} from './Card.js';
import {FormValidate} from './FormValidate.js';
import {initialCards} from './initial-cards.js'

const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

//попапы
const popups = document.querySelectorAll('.popup');

//profile
const profilePopup = document.querySelector('.popup_type_profile');
const profileForm = profilePopup.querySelector('.form');
const nameInput = profileForm.querySelector('.form__input_type_name');
const aboutInput = profileForm.querySelector('.form__input_type_about');
const username = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const elements =  document.querySelector('.elements');
const editButton = document.querySelector('.profile__button_type_edit');

//place
const placePopup = document.querySelector('.popup_type_place');
const placeForm = placePopup.querySelector('.form');
const placeNameInput = placeForm.querySelector('.form__input_type_place-name');
const placeLinkInput = placeForm.querySelector('.form__input_type_place-link');
const addButton = document.querySelector('.profile__button_type_add');

//Открытие и закрытие попапов
export default function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

//Закрытие попапа по нажатию на esc
function closeByEscape(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if(evt.key === 'Escape') {
    closePopup(popupOpened);
    };
  }

//Закрытие всех попапов по крестику или overlay
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
     };
  });
})

// Добавление карточки в разметку
function renderCard(item, templateSelector, wrap) {
  const card = new Card(item, templateSelector);
  const cardElement = card.generateCard();
  wrap.prepend(cardElement);
}

initialCards.forEach((item) => renderCard(item, '#card', elements));

//profile popup
const formProfile = new FormValidate(validationConfig, '.form[name="profile"]');
formProfile.enableValidation();

function openProfilePopup() {
  nameInput.value = username.textContent;
  aboutInput.value = about.textContent;
  formProfile.clearValidationError();
  openPopup(profilePopup);
}

function handleProfileSubmit (evt) {
  evt.preventDefault();
  username.textContent = nameInput.value;
  about.textContent = aboutInput.value;
  closePopup(profilePopup);
}

//place popup
const formPlace = new FormValidate(validationConfig, 'form[name="place"]');
formPlace.enableValidation();

function openPlacePopup() {
  placeForm.reset();
  formPlace.clearValidationError();
  openPopup(placePopup);
}

function handlePlaceSubmit (evt) {
  evt.preventDefault();
  renderCard({name: placeNameInput.value, link: placeLinkInput.value}, '#card', elements);
  closePopup(placePopup);
}

//profile popup
editButton.addEventListener('click', openProfilePopup);
profileForm.addEventListener('submit', handleProfileSubmit);

//place popup
addButton.addEventListener('click', openPlacePopup);
placeForm.addEventListener('submit', handlePlaceSubmit);

