//card
const cardTemplate = document.querySelector('#card').content;
const card = cardTemplate.querySelector('.element');

//profile
const profilePopup = document.querySelector('.popup_type_profile');
const profileForm = profilePopup.querySelector('.form');
const nameInput = profileForm.querySelector('.form__input_type_name');
const aboutInput = profileForm.querySelector('.form__input_type_about');
const username = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const profileCloseButton = profilePopup.querySelector('.popup__close-button');
const elements =  document.querySelector('.elements');
const editButton = document.querySelector('.profile__button_type_edit');

//place
const placePopup = document.querySelector('.popup_type_place');
const placeForm = placePopup.querySelector('.form');
const placeNameInput = placeForm.querySelector('.form__input_type_place-name');
const placeLinkInput = placeForm.querySelector('.form__input_type_place-link');
const placeCloseButton = placePopup.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__button_type_add');

//image
const imagePopup = document.querySelector('.popup_type_image');
const imageOpened = imagePopup.querySelector('.popup__image');
const imageOpenedName = imagePopup.querySelector('.popup__image-heading');
const imageCloseButton = imagePopup.querySelector('.popup__close-button');


//создание карточки
function createCard(name, link) {
  const newCard = card.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardHeading =  newCard.querySelector('.element__heading');
  const cardLikeButton = newCard.querySelector('.element__like-button');
  const cardDeleteButton = newCard.querySelector('.element__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardHeading.textContent = name;

  likeCard(cardLikeButton);
  deleteCard(cardDeleteButton);
  openImagePopup(cardImage);

  return newCard;
}

function renderCard(name, link, wrap) {
  wrap.prepend(createCard(name, link));
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
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//profile popup
function openProfilePopup() {
  nameInput.value = username.textContent;
  aboutInput.value = about.textContent;
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
  // Я не стала переносить очищение полей, тк если их добавить после создания карточки,
  // то при закрытии попапа с помощю конпки "закрыть" без отправки формы поля не очистятся
  placeNameInput.value = '';
  placeLinkInput.value = '';
  openPopup(placePopup);
}

function handlePlaceSubmit (evt) {
  evt.preventDefault();
  renderCard(placeNameInput.value, placeLinkInput.value, elements);
  closePopup(placePopup);
}

//image popup
function openImagePopup(image) {
  image.addEventListener('click', function() {
    imageOpened.src = image.src;
    imageOpened.alt = image.alt;
    imageOpenedName.textContent = image.alt;
    openPopup(imagePopup);
  });
}

// Я пока не ссовсем знаю, как правильно работать с объектами,
// но в следующем спринте после изучения этой темы обязательно поправлю!
initialCards.forEach(item => {renderCard(item.name, item.link, elements)});

//profile popup
editButton.addEventListener('click', openProfilePopup);
profileCloseButton.addEventListener('click', () => closePopup(profilePopup));
profileForm.addEventListener('submit', handleProfileSubmit);

//place popup
addButton.addEventListener('click', openPlacePopup);
placeCloseButton.addEventListener('click', () => closePopup(placePopup));
placeForm.addEventListener('submit', handlePlaceSubmit);

//image popup
imageCloseButton.addEventListener('click', () => closePopup(imagePopup));

//Спасибо за комментарии! Я рада, что работа понравилась :)
