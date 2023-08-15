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
const cardModal = document.querySelector("#card-modal");
const profileModalCloseBtn = document.querySelector("#profile-modal-close");
const addCardModalCloseBtn = document.querySelector("#add-modal-close");
const profileTitle = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");
const titleInput = document.querySelector("#profile-title-input");
const textInput = document.querySelector("#profile-text-input");
const profileFormEdit = profileModal.querySelector(".modal__form");
const cardList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector(".card-template").content.firstElementChild;
const addCardButton = document.querySelector(".profile__add-button");

// Functions

function openPopup(modal) {
  modal.classList.add("modal_opened");
}
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = data.link;
  cardTitle.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

function handleProfileFormEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileText.textContent = textInput.value;
  closePopup();
}

// profile events

profileFormEdit.addEventListener("submit", handleProfileFormEdit);
editProfileBtn.addEventListener("click", () => {
  titleInput.value = profileTitle.textContent;
  textInput.value = profileText.textContent;
  openPopup(profileModal);
});
profileModalCloseBtn.addEventListener("click", () => closePopup(profileModal));

// add new card

addCardButton.addEventListener("click", () => openPopup(cardModal));
addCardModalCloseBtn.addEventListener("click", () => closePopup(cardModal));
profileModalCloseBtn.addEventListener("click", () => closePopup(profileModal));

// for Each

initialCards.forEach(function (data) {
  const cardElement = getCardElement(data);
  cardList.append(cardElement);
});
