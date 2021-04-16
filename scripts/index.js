//card
const cardTemplate = document.querySelector('#card').content;
const card = cardTemplate.querySelector('.element');

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

//image
const imagePopup = document.querySelector('.popup_type_image');
const imageOpened = imagePopup.querySelector('.popup__image');
const imageOpenedName = imagePopup.querySelector('.popup__image-heading');


//создание карточки
function createCard(item) {
  const newCard = card.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardHeading =  newCard.querySelector('.element__heading');
  const cardLikeButton = newCard.querySelector('.element__like-button');
  const cardDeleteButton = newCard.querySelector('.element__delete-button');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardHeading.textContent = item.name;

  likeCard(cardLikeButton);
  deleteCard(cardDeleteButton);
  openImagePopup(cardImage);

  return newCard;
}

function renderCard(item, wrap) {
  wrap.prepend(createCard(item));
}

function likeCard(likeButton) {
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__like-button_active');
  });
}

function deleteCard(deleteButton) {
  deleteButton.addEventListener('click', () => {
    deleteButton.closest('.element').remove();
  });
}

function openPopup(popup) {
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

 //Очищение полей с ошибками
function clearValidationError(popupForm, validationObject) {
  const inputList = Array.from(popupForm.querySelectorAll(validationObject.inputSelector));
  const buttonElement = popupForm.querySelector(validationObject.submitButtonSelector);
  inputList.forEach(inputElement => {
    hideInputError(popupForm, inputElement, validationObject);
  });
  toggleButtonState(inputList, buttonElement, validationObject)
}

//profile popup
function openProfilePopup() {
  nameInput.value = username.textContent;
  aboutInput.value = about.textContent;
  clearValidationError(profileForm, validationObject);
  openPopup(profilePopup);
}

function handleProfileSubmit (evt) {
  evt.preventDefault();
  username.textContent = nameInput.value;
  about.textContent = aboutInput.value;
  closePopup(profilePopup);
}

//place popup
function openPlacePopup() {
  placeForm.reset();
  clearValidationError(placeForm, validationObject);
  openPopup(placePopup);
}

function handlePlaceSubmit (evt) {
  evt.preventDefault();
  renderCard({name: placeNameInput.value, link: placeLinkInput.value}, elements);
  closePopup(placePopup);
}

//image popup
function openImagePopup(image) {
  image.addEventListener('click', () => {
    imageOpened.src = image.src;
    imageOpened.alt = image.alt;
    imageOpenedName.textContent = image.alt;
    openPopup(imagePopup);
  });
}

initialCards.forEach(item => {renderCard(item, elements)});

//Закрытие всех попапов по крестику или overlay
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
     };
  });
})

//profile popup
editButton.addEventListener('click', openProfilePopup);
profileForm.addEventListener('submit', handleProfileSubmit);

//place popup
addButton.addEventListener('click', openPlacePopup);
placeForm.addEventListener('submit', handlePlaceSubmit);

