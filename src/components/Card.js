export default class Card {
  constructor({name, link}, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
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
    this._element = null;
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
      this._handleCardClick();
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





