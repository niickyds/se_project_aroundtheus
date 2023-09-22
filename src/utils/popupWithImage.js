import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  open({ link, name }) {
    this._popupElement.querySelector(".modal__preview-text").textContent = name;
    const popupImage = this._popupElement.querySelector(".preview-image");
    popupImage.src = link;
    popupImage.alt = name;
  }
}
