import Card from '../components/Card.js';
import FormValidate from '../components/FormValidate.js';
import { initialCards } from '../components/initial-cards.js'
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { validationConfig, userInfoSelectors, popupSelectors, formsConfig, buttons, cardTemplateId, elementsSelector } from '../utils/constants.js';

//создание карточки
function сreateCard({name, link}) {
  const card = new Card({name, link}, cardTemplateId, () => {
    const ImagePopup = new PopupWithImage(popupSelectors.image);
    ImagePopup.open({name, link});
    ImagePopup.setEventListeners();
  })
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

// initial cards
const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => сreateCard(cardItem)
  },
  elementsSelector
)

cardsList.renderItems();

//валидация форм
const formPlace = new FormValidate(validationConfig, formsConfig.placeFormSelector);
formPlace.enableValidation();

const formProfile = new FormValidate(validationConfig, formsConfig.profileFormSelector);
formProfile.enableValidation();

// place popup - открытие и создание карточки

const placePopup = new PopupWithForm(popupSelectors.place, {
  handleSubmitForm: (inputValuesList) => {
    сreateCard({name: inputValuesList.placename, link: inputValuesList.link});
}})

placePopup.setEventListeners();

function openPlacePopup() {
  formPlace.clearValidationError();
  placePopup.open()
}

// profile popup
const profileInfo = new UserInfo(userInfoSelectors);

const profilePopup = new PopupWithForm(popupSelectors.profile, {
  handleSubmitForm: (inputValuesList) => {
    profileInfo.setUserInfo(inputValuesList);
  }
})

profilePopup.setEventListeners();

function openProfilePopup() {
  const info = profileInfo.getUserInfo();
  formsConfig.nameInput.value = info.username;
  formsConfig.aboutInput.value = info.about;
  formProfile.clearValidationError();
  profilePopup.open();
}

//слушатели событий
buttons.add.addEventListener('click', openPlacePopup);
buttons.edit.addEventListener('click', openProfilePopup);



