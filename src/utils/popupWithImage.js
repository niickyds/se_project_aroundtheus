import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(".preview-image");
  }

  open({ link, name }) {
    this._popupElement.querySelector(".modal__preview-text").textContent = name;
    popupImage.src = link;
    popupImage.alt = name;
    super.open();
  }
}
