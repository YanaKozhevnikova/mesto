import openPopup from './index.js';
export class Card {
  constructor(item, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = item.name;
    this._link = item.link;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  _likeCard() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _openImagePopup() {
    const _imagePopup = document.querySelector('.popup_type_image');
    const _imageOpened = _imagePopup.querySelector('.popup__image');
    const _imageOpenedName = _imagePopup.querySelector('.popup__image-heading');
    _imageOpened.src = this._link;
    _imageOpened.alt = this._name;
    _imageOpenedName.textContent = this._name;
    openPopup(_imagePopup);
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.element__like-button');
    const deleteButton = this._element.querySelector('.element__delete-button');
    const image = this._element.querySelector('.element__image');
    likeButton.addEventListener('click', () => {
      this._likeCard();
    });
    deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
    image.addEventListener('click', () => {
      this._openImagePopup();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    const image = this._element.querySelector('.element__image');
    const heading = this._element.querySelector('.element__heading');
    image.src = this._link;
    image.alt = this._name;;
    heading.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}





