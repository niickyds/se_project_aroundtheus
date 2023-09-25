import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(".preview-image");
    this._popupImageText = document.querySelector(".modal__preview-text");
  }

  open(data) {
    if (data) {
      this._popupImageText.textContent = data.name;
      popupImage.alt = data.name;
      popupImage.src = data.link;
    }
    super.open();
  }
}
