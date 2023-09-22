import Popup from "./popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {}

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {}
}

// index

const newCardPopup = popupWithForm("card-modal", () => {
  // handleFormSubmit
});
