import Popup from './Popup.js';
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._form = this._popup.querySelector('.form');
    this._saveButton = this._form.querySelector('.form__save-button');
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirm(this._card);
    })
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = 'Удаление...';
     } else {
      this._saveButton.textContent = 'Да';
     }
  }
}
