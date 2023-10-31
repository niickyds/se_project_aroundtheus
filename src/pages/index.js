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
const titleInput = document.querySelector("#profile-title-input");
const textInput = document.querySelector("#profile-text-input");
const addCardButton = document.querySelector(".profile__add-button");
const profileAvatarButton = document.querySelector(
  ".profile__pic-overlay_button"
);

// API

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6e53887a-44e7-4719-8efe-74af2f636950",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, initialCards]) => {
    userInfo.setUserInfo(data);
    userInfo.setAvatar(data.avatar);
    section = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          renderCard(item);
        },
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

let section;

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

// Card Form Popup //

const newCardPopup = new PopupWithForm(
  "#card-modal",
  handleCardFormSubmit,
  "Create"
);
newCardPopup.setEventListeners();

//  Profile Edit Popup //

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__text",
  ".profile__image"
);

const profileEditPopup = new PopupWithForm(
  "#edit-modal",
  handleProfileEdit,
  "Save"
);
profileEditPopup.setEventListeners();

// Image Popup //

const imagePopup = new PopupWithimage("#image-modal");
imagePopup.setEventListeners();

// Avatar Popup //

const avatarPopup = new PopupWithForm(
  "#avatar-modal",
  handleAvatarFormSubmit,
  "Save"
);
avatarPopup.setEventListeners();

// Delete Card Popup //

const deleteCardPopup = new PopupWithConfirmation(
  "#confirm-modal",
  "Deleting..."
);
deleteCardPopup.setEventListeners();

// functions //

function renderCard(data) {
  const cardEl = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteclick,
    handleLikeClick
  );
  section.addItem(cardEl.getView());
}

function handleCardFormSubmit(data) {
  newCardPopup.setLoading(true);
  api
    .addCard(data)
    .then((data) => {
      renderCard(data);
    })
    .then(() => {
      newCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newCardPopup.setLoading(false, "Create");
    });
}

function handleProfileEdit(data) {
  profileEditPopup.setLoading(true);
  api
    .editUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditPopup.setLoading(false);
    });
}

function handleLikeClick(card) {
  if (!card.isLiked) {
    api
      .addLike(card.id)
      .then(() => {
        card.updateLikeStatus(true);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .removeLike(card.id)
      .then(() => {
        card.updateLikeStatus(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function handleDeleteclick(item) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    api
      .deleteCard(item.getId())
      .then(() => {
        item.removeCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleAvatarFormSubmit(data) {
  avatarPopup.setLoading(true);
  api
    .updateProfilePic(data.link)
    .then((userData) => {
      userInfo.setAvatar(userData.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarPopup.setLoading(false, "Saving...");
    });
}

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

// Listeners //

editProfileBtn.addEventListener("click", () => {
  const profileData = userInfo.getUserInfo();
  titleInput.value = profileData.name;
  textInput.value = profileData.about;
  profileEditPopup.open();
});
addCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newCardPopup.open();
});
profileAvatarButton.addEventListener("click", () => {
  avatarPopup.open();
  avatarFormValidator.toggleButtonState();
});
