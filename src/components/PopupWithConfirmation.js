import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._deleteButton = this._popupElement.querySelector(".modal__button");
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit();
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleSubmit);
  }
}