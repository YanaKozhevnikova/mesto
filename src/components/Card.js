
export default class Card {
  constructor(data, templateSelector, {userId, handleCardClick, handleDelete, handleLike}) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this.cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
    this.element = this._getTemplate();
    this._image = this.element.querySelector('.element__image');
    this._heading = this.element.querySelector('.element__heading');
    this.likeButton = this.element.querySelector('.element__like-button');
    this.likesNumber = this.element.querySelector('.element__like-count');
    this._deleteButton = this.element.querySelector('.element__delete-button');
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
    this._handleLike();
    this.likeButton.classList.toggle('element__like-button_active');
  }

  _setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      this._likeCard();
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDelete(this.cardId);
    });
    this._image.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  generateCard() {
    this._image.src = this._link;
    this._image.alt = this._name;;
    this._heading.textContent = this._name;
    this.likesNumber.textContent = this._likes.length;

    if (this._userId !== this._cardOwnerId) {
      this._deleteButton.remove();
    }
    if (this._likes.some(like => like._id === this._userId)) {
      this.likeButton.classList.add('element__like-button_active');
    }

    this._setEventListeners();
    return this.element;
  }
}





