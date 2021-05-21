export default class FormValidate {
  constructor(validationConfig, formElement) {
    this._form = document.querySelector(formElement);
    this._validationConfig = validationConfig;
    this._inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
    this._button = this._form.querySelector(this._validationConfig.submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
     if (this._hasInvalidInput()) {
      this._button.classList.add(this._validationConfig.inactiveButtonClass);
      this._button.setAttribute('disabled', true);
     } else {
      this._button.classList.remove(this._validationConfig.inactiveButtonClass);
      this._button.removeAttribute('disabled');
     }
   }

  _setInputEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  clearValidationError() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }


  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._setInputEventListeners();
  }
}
