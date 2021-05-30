import './index.css';
import Card from '../components/Card.js';
import FormValidate from '../components/FormValidate.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { validationConfig, userInfoConfig, popupSelectors, formsConfig, buttons, cardConfig, elementsSelector } from '../utils/constants.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm';



//создание карточки
function сreateCard(data) {
  const card = new Card(data, cardConfig.cardTemplateId, {
    userId: profileInfo.getUserId(),
    handleCardClick: () => imagePopup.open({name: data.name, link: data.link}),
    handleDelete: () => deleteConfirmPopup.open(card),
    handleLike:   () => {
      if (card.isLiked()) {
        api.removeLike(card)
        .then((res) => card.updateLikes(res))
        .catch(err => console.log(err))
      } else {
        api.putLike(card)
        .then((res) => card.updateLikes(res))
        .catch(err => console.log(err))
      }
    }
  })
  const cardElement = card.generateCard();
  return cardElement;
}

const cardsList = new Section({
  renderer: (cardItem) => {
    const cardElement = сreateCard(cardItem);
    cardsList.addItem(cardElement, 'append');
  }},
  elementsSelector)


//api
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-24/', '0c664d7d-5920-42ff-9591-f94b8c7db340')

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userInfo, cards]) => {
  profileInfo.setUserInfo(userInfo);
  cardsList.renderItems(cards);
})
.catch(err => console.log(err))


//валидация форм
const formPlace = new FormValidate(validationConfig, formsConfig.placeFormSelector);
formPlace.enableValidation();

const formProfile = new FormValidate(validationConfig, formsConfig.profileFormSelector);
formProfile.enableValidation();

const formAvatar = new FormValidate(validationConfig, formsConfig.avatarFormSelector);
formAvatar.enableValidation();

// place popup - открытие и создание карточки
const placePopup = new PopupWithForm(popupSelectors.place, {
  handleSubmitForm: (inputValuesList) => {
    placePopup.renderLoading(true);
    api.postCard({name: inputValuesList.placename, link: inputValuesList.link})
    .then(res => {
      const card = сreateCard(res);
      cardsList.addItem(card, 'prepend');
      placePopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => placePopup.renderLoading(false))
}})

placePopup.setEventListeners();

function openPlacePopup() {
  formPlace.clearValidationError();
  placePopup.open()
}

// image popup
const imagePopup = new PopupWithImage(popupSelectors.image);
imagePopup.setEventListeners();


//delete confirmation popup
const deleteConfirmPopup = new PopupWithConfirm(popupSelectors.delete, (card) => {
  deleteConfirmPopup.renderLoading(true);
  api.deleteCard(card)
  .then(() => {
    card.deleteCard();
    deleteConfirmPopup.close();
  })
  .catch(err => console.log(err))
  .finally(() => deleteConfirmPopup.renderLoading(false));
})
deleteConfirmPopup.setEventListeners();


// profile popup
const profileInfo = new UserInfo(userInfoConfig);

const profilePopup = new PopupWithForm(popupSelectors.profile, {
  handleSubmitForm: (inputValuesList) => {
    profilePopup.renderLoading(true);
    api.setUserInfo(inputValuesList)
    .then(res => {
        profileInfo.setUserInfo(res);
        profilePopup.close();
      })
    .catch(err => console.log(err))
    .finally(() => profilePopup.renderLoading(false))
}})

profilePopup.setEventListeners();

function openProfilePopup() {
  const info = profileInfo.getUserInfo();
  formsConfig.nameInput.value = info.name;
  formsConfig.aboutInput.value = info.about;
  formProfile.clearValidationError();
  profilePopup.open();
}

//avatar popup
const avatarPopup = new PopupWithForm(popupSelectors.avatar, {
  handleSubmitForm: (inputValuesList) => {
    avatarPopup.renderLoading(true);
    api.changeAvatar(inputValuesList.avatar)
    .then(res => {
      profileInfo.setUserInfo(res);
      avatarPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => avatarPopup.renderLoading(false))
  }
})
avatarPopup.setEventListeners();

function openAvatarPopup() {
  formAvatar.clearValidationError();
  avatarPopup.open()
}

//слушатели событий
buttons.add.addEventListener('click', openPlacePopup);
buttons.edit.addEventListener('click', openProfilePopup);
buttons.avatarEdit.addEventListener('click', openAvatarPopup);



