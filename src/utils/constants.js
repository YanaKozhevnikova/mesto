export const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

export const userInfoSelectors = {
  usernameSelector: '.profile__name',
  aboutSelector: '.profile__about',
}

export const popupSelectors = {
  place: '.popup_type_place',
  profile: '.popup_type_profile',
  image: '.popup_type_image',
}

export const formsConfig = {
  profileFormSelector: '.form[name="profile"]',
  placeFormSelector: '.form[name="place"]',
  nameInput: document.querySelector('.form__input_type_name'),
  aboutInput: document.querySelector('.form__input_type_about'),
}

export const buttons = {
  add: document.querySelector('.profile__button_type_add'),
  edit: document.querySelector('.profile__button_type_edit'),
}

export const cardTemplateId = '#card';

export const elementsSelector = '.elements';
