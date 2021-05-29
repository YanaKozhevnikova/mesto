import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleSubmitForm}) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._saveButton = this._form.querySelector('.form__save-button');
  }
  _getInputValues() {
    this._inputValuesList = {};
    this._inputList.forEach(input => {
      this._inputValuesList[input.name] = input.value;
    });
    return this._inputValuesList;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    })
  }

  renderLoading(isLoading) {
    if (isLoading) {
     this._saveButton.textContent = 'Сохранение...';
    } else {
     this._saveButton.textContent = 'Сохранить';
    }
  }
}
