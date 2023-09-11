class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputElement = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._inputSelector = config.inputSelector;
    this._submitButton = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError(inputElement) {
    this._errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    this._errorMessageElement.textContent = inputElement.validationMessage;
    this._errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorMessageElement = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    this._errorMessageElement.textContent = "";
    this._errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return !this._inputElement.every(
      (inputElement) => inputElement.validity.valid
    );
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputElement)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputElement = [this.form.querySelectorAll(this._inputSelector)];
    this._submitButton = this.form.querySelector(this._submitButton);

    inputElement.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(this.form, inputElement, options);
        toggleButtonState(inputElement, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  }
}

export default FormValidator;
