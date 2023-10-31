import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(".preview-image");
    this._popupImageText = document.querySelector(".modal__preview-text");
  }

  open(name, link) {
    this._popupImageText.textContent = name;
    this._popupImage.alt = name;
    this._popupImage.src = link;
    super.open();
  }
}
