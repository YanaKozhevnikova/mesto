import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({name, link}) {
    const imageOpened = this._popup.querySelector('.popup__image');
    const imageOpenedName = this._popup.querySelector('.popup__image-heading');
    imageOpened.src = link;
    imageOpened.alt = name;
    imageOpenedName.textContent = name;
    super.open();
  }
}
