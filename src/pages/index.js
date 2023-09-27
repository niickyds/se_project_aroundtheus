import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/popupWithForm.js";
import PopupWithimage from "../components/popupWithImage.js";
import Section from "../components/section.js";
import UserInfo from "../components/userInfo.js";
import "./index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Elements

const editProfileBtn = document.querySelector(".profile__edit-button");
const profileModal = document.querySelector("#edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");
const titleInput = document.querySelector("#profile-title-input");
const textInput = document.querySelector("#profile-text-input");
const profileFormEdit = profileModal.querySelector(".modal__form");

const addCardButton = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#card-modal");
const cardTitleInput = cardModal.querySelector("#add-title-input");
const cardUrlInput = cardModal.querySelector("#add-url-input");
const addCardFormEdit = cardModal.querySelector(".modal__form");

const previewImageModal = document.querySelector("#image-modal");
const previewImage = previewImageModal.querySelector(".preview-image");
const previewText = previewImageModal.querySelector(".modal__preview-text");

const cardList = document.querySelector(".cards__list");

// Validation //

const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElement = document.querySelector("#edit-form");
const addFormElement = document.querySelector("#add-form");

const editFormValidator = new FormValidator(config, editFormElement);
const addFormValidator = new FormValidator(config, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// form popup
const newFormPopup = new PopupWithForm("#card-modal", () => {
  handleFormSubmit;
});
newFormPopup.setEventListeners();

//  profile edit popup
const userInfo = new UserInfo(".profile__title", ".profile__text");
const profileEditPopup = new PopupWithForm("#edit-modal", (data) => {
  userInfo.setUserInfo(data);
  profileEditPopup.close();
});
profileEditPopup.setEventListeners();

// image popup
const imagePopup = new PopupWithimage("#image-modal");
imagePopup.setEventListeners();

// section class
const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardEl = createCard(item);
    section.getView(cardEl);
    return cardEl;
  },
});

initialCards.forEach((cardData) => renderCard(cardData));

function renderCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  cardList.prepend(card.getView());
}

function handleFormSubmit() {
  const cardValue = renderCard(data);
  cardList.prepend(cardValue);
  addCardFormEdit.reset();
  newFormPopup.close();
  return cardValue;
}

function handleImageClick(data) {
  imagePopup.open(data);
}

// event handlers
// function handleProfileFormEdit(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = titleInput.value;
//   profileText.textContent = textInput.value;
//   closePopup(profileModal);
// }
// function handleCardFormEdit(evt) {
//   evt.preventDefault();
//   const name = cardTitleInput.value;
//   const link = cardUrlInput.value;
//   renderCard({ name, link }, cardList);
//   closePopup(cardModal);
//   addCardFormEdit.reset();
//   addFormValidator.toggleButtonState();
// }

// profile events

// profileFormEdit.addEventListener("submit", handleProfileFormEdit);
editProfileBtn.addEventListener("click", () => {
  userInfo.getUserInfo();
  profileEditPopup.open();
});

// new card events

// addCardFormEdit.addEventListener("submit", handleCardFormEdit);
addCardButton.addEventListener("click", () => newFormPopup.open());
