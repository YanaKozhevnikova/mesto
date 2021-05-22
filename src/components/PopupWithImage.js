import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageOpened = this._popup.querySelector('.popup__image');
    this._imageOpenedName = this._popup.querySelector('.popup__image-heading');
  }

  open({name, link}) {
    this._imageOpened.src = link;
    this._imageOpened.alt = name;
    this._imageOpenedName.textContent = name;
    super.open();
  }
}
