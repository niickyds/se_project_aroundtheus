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
const profileModalCloseBtn = document.querySelector("#profile-modal-close");
const profileFormEdit = profileModal.querySelector(".modal__form");

const addCardButton = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#card-modal");
const cardTitleInput = cardModal.querySelector("#add-title-input");
const cardUrlInput = cardModal.querySelector("#add-url-input");
const addCardModalCloseBtn = document.querySelector("#add-modal-close");
const addCardFormEdit = cardModal.querySelector(".modal__form");

const previewImageModal = document.querySelector("#image-modal");
const previewImage = previewImageModal.querySelector(".preview-image");
const previewText = previewImageModal.querySelector(".modal__preview-text");
const previewModalCloseBtn = document.querySelector("#preview-modal-close");

const cardList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector(".card-template").content.firstElementChild;
const likeButtons = document.querySelectorAll(".card__like-button");

// Functions

initialCards.forEach((cardData) => renderCard(cardData, cardList));

function openPopup(modal) {
  modal.classList.add("modal_opened");
}
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewText.textContent = data.name;
    openPopup(previewImageModal);
  });

  cardImage.src = data.link;
  cardTitle.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

// Keypress function

function modalEscClose(evt) {
  if (evt.key === "Escape") {
    const currentModal = document.querySelector(".modal_opened");
    closePopup(currentModal);
  }
}
document.addEventListener("keydown", modalEscClose);

// Modal Click Out

function modalClickClose(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

[profileModal, cardModal, previewImageModal].forEach((modal) => {
  modal.addEventListener("click", modalClickClose);
});

// event handlers

function handleProfileFormEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileText.textContent = textInput.value;
  closePopup(profileModal);
}
function handleCardFormEdit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardList);
  closePopup(cardModal);
}

// profile events

profileFormEdit.addEventListener("submit", handleProfileFormEdit);
editProfileBtn.addEventListener("click", () => {
  titleInput.value = profileTitle.textContent;
  textInput.value = profileText.textContent;
  openPopup(profileModal);
});
profileModalCloseBtn.addEventListener("click", () => closePopup(profileModal));

// new card events

addCardFormEdit.addEventListener("submit", handleCardFormEdit);
addCardButton.addEventListener("click", () => openPopup(cardModal));
addCardModalCloseBtn.addEventListener("click", () => closePopup(cardModal));

// preview image events

previewModalCloseBtn.addEventListener("click", () =>
  closePopup(previewImageModal)
);
