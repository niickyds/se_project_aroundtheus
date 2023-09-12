class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteIcon()
    );
    this._cardImage.addEventListener("click", () => this._handleImageClick());
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleImageClick() {
    const previewImageModal = document.querySelector("#image-modal");
    const previewImage = previewImageModal.querySelector(".preview-image");
    const previewText = previewImageModal.querySelector(".modal__preview-text");
    previewImage.src = this._link;
    previewImage.alt = this._name;
    previewText.textContent = this._name;
    openPopup(previewImageModal);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
