import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithimage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/Constants.js";
import { config } from "../utils/Constants.js";
import "./index.css";
import Api from "../components/Api.js";

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

const avatarModal = document.querySelector("#avatar-modal");
const profilePicBtn = document.querySelector(".profile__pic-overlay");
const profileImage = document.querySelector(".profile__image");

// API

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6e53887a-44e7-4719-8efe-74af2f636950",
    "Content-Type": "application/json",
  },
});

let section;
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([data, initialCards]) => {
    userInfo.setUserInfo(data);
    section = new Section(
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
  })
  .catch((err) => {
    console.error(err);
  });

// Validation //

const editFormElement = document.querySelector("#edit-form");
const addFormElement = document.querySelector("#add-form");
const avatarFormelement = document.querySelector("#avatar-form");

const editFormValidator = new FormValidator(config, editFormElement);
const addFormValidator = new FormValidator(config, addFormElement);
const avatarFormValidator = new FormValidator(config, avatarFormelement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Card Form Popup

const newFormPopup = new PopupWithForm("#card-modal", handleFormSubmit);
newFormPopup.setEventListeners();

//  Profile Edit Popup

const userInfo = new UserInfo(".profile__title", ".profile__text");
const profileEditPopup = new PopupWithForm("#edit-modal", (data) => {
  userInfo.setUserInfo(data);
  profileEditPopup.close();
});
profileEditPopup.setEventListeners();

// Image Popup

const imagePopup = new PopupWithimage("#image-modal");
imagePopup.setEventListeners();

// Avatar Popup

const avatarPopup = new PopupWithForm("#avatar-modal", handleAvatarFormSubmit);
avatarPopup.setEventListeners();

// Delete Card Popup

const deleteCardPopup = new PopupWithConfirmation("#confirm-modal");
deleteCardPopup.setEventListeners();

// functions

function renderCard(data) {
  const cardEl = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteclick,
    handleLikeClick
  );
  return cardEl.getView();

  // const card = new Card(data, "#card-template", handleImageClick);
  // return card.getView();
}

function handleLikeClick(cardId, isLiked, SetLikesStatus) {
  if (isLiked) {
    api
      .unlikeCard(cardId)
      .then((cardData) => {
        setLikesStatus(cardData.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(cardId)
      .then((cardData) => {
        setLikesStatus(cardData.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function handleDeleteclick(item) {
  api.deleteCard(item.getId()).then(() => {
    item;
  });
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

function handleAvatarFormSubmit() {}

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

profilePicBtn.addEventListener("click", () => {
  avatarFormValidator.toggleButtonState();
});
