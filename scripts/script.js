const initialCards = [
  {
    name: 'Домбай',
    link: './images/dombay.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.jpg'
  },
  {
    name: 'Карачаевск',
    link: './images/karachayevsk.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/kamchatka.jpg'
  },
  {
    name: 'Карелия',
    link: './images/karelia.jpg'
  },
  {
    name: 'Зеленоградск',
    link: './images/zelenogradsk.jpg'
  }
];

const cardTemplate = document.querySelector('#card').content;

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
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardHeading =  card.querySelector('.element__heading');
  const cardLikeBtn = card.querySelector('.element__like-button');
  const cardDeleteBtn = card.querySelector('.element__delete-button');
  cardImage.src = link;
  cardImage.alt = name;
  cardHeading.textContent = name;

  elements.prepend(card);

  likeCard(cardLikeBtn);
  deleteCard(cardDeleteBtn);
  openImagePopup(cardImage);
}


function likeCard(likebtn) {
  likebtn.addEventListener('click', () => {
    likebtn.classList.toggle('element__like-button_active');
  });
}

function deleteCard(deletebtn) {
  deletebtn.addEventListener('click', () => {
    deletebtn.closest('.element').remove();
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
  placeNameInput.value = null;
  placeLinkInput.value = null;
  openPopup(placePopup);
}

function handlePlaceSubmit (evt) {
  evt.preventDefault();
  createCard(placeNameInput.value, placeLinkInput.value);
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

initialCards.forEach(item => {createCard(item.name, item.link)});

//profile popup
editButton.addEventListener('click', openProfilePopup);
profileCloseButton.addEventListener('click', () => {closePopup(profilePopup)});
profileForm.addEventListener('submit', handleProfileSubmit);

//place popup
addButton.addEventListener('click', openPlacePopup);
placeCloseButton.addEventListener('click', () => {closePopup(placePopup)});
placeForm.addEventListener('submit', handlePlaceSubmit);

//image popup
imageCloseButton.addEventListener('click', () => {closePopup(imagePopup)});


