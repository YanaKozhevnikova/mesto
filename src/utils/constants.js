export const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

export const userInfoConfig = {
  usernameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__picture',
}

export const popupSelectors = {
  place: '.popup_type_place',
  profile: '.popup_type_profile',
  image: '.popup_type_image',
  delete: '.popup_type_delete-confirm',
  avatar: '.popup_type_avatar'
}

export const formsConfig = {
  profileFormSelector: '.form[name="profile"]',
  placeFormSelector: '.form[name="place"]',
  avatarFormSelector: '.form[name="avatar-form"]',
  nameInput: document.querySelector('.form__input_type_name'),
  aboutInput: document.querySelector('.form__input_type_about'),
}

export const buttons = {
  add: document.querySelector('.profile__button_type_add'),
  edit: document.querySelector('.profile__button_type_edit'),
  avatarEdit: document.querySelector('.profile__button_type_edit-picture')
}

export const cardConfig = {
  cardTemplateId: '#card',
  cardLikeSelector: '.element__like-button',
  cardLikeActiveSelector: 'element__like-button_active'
}

export const elementsSelector = '.elements';
