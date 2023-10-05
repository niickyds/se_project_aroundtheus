import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/popupWithhForm.js";
import PopupWithimage from "../components/popupWithhImage.js";
import Section from "../components/sectiohn.js";
import UserInfo from "../components/userInfho.js";
import { initialCards } from "../utils/Constants.js";
import { config } from "../utils/Constants.js";
import "./index.css";

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

const editFormElement = document.querySelector("#edit-form");
const addFormElement = document.querySelector("#add-form");

const editFormValidator = new FormValidator(config, editFormElement);
const addFormValidator = new FormValidator(config, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// form popup
const newFormPopup = new PopupWithForm("#card-modal", handleFormSubmit);
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
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardEl = renderCard(item);
      section.addItem(cardEl);
    },
  },
  ".cards__list"
);
section.renderItems();

// functions
function renderCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

function handleFormSubmit(data) {
  const cardValue = renderCard(data);
  section.addItem(cardValue);
  newFormPopup.close();
  return cardValue;
}

function handleImageClick(data) {
  imagePopup.open(data);
}

// listeners
editProfileBtn.addEventListener("click", () => {
  const profileData = userInfo.getUserInfo();
  titleInput.value = profileData.name;
  textInput.value = profileData.about;
  profileEditPopup.open();
});

addCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newFormPopup.open();
});
