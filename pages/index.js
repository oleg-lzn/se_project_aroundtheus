// import Card from "../components/Card.js";

// const cardData = {
//   name: "Yosemite Valley",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
// };

// const card = new Card(cardData, "#card-template");
// card.getView();

//Declaring the variables
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

// Templates
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Variables
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const profileModal = document.querySelector(".popup");
const profileModalInputName = profileModal.querySelector("[name=name]");
const profileModalInputSubtitle =
  profileModal.querySelector("[name=description]");
const cardsList = document.querySelector(".cards__list");

// Variables for the Add Place Modal
const modalAddCard = document.getElementById("addElement");
const modalAddCardInputPlace = modalAddCard.querySelector("[name=title]");
const modalAddCardInputUrl = modalAddCard.querySelector("[name=url]");

// Variables for image modal
const modalImagePreview = document.getElementById("imageOpen");
const modalImage = modalImagePreview.querySelector(".popup__image");
const modalTitleSmall = modalImagePreview.querySelector(".popup__title-small");

// Buttons
// const profileButtonClose = profileModal.querySelector(".popup__close");
const profileButtonEdit = profile.querySelector(".profile__edit-button");
const addCardButton = profile.querySelector(".profile__add-button");
// const buttonCloseImageModal = modalImagePreview.querySelector(".popup__close");
// const addCardButtonClose = modalAddCard.querySelector(".popup__close");

// Forms
const modalAddCardForm = document.forms["new-card-form"];
const profileModalForm = document.forms["profile-form"];

//Universal functions for opening and closing modals

function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", escapeHandler);
}

//Universal popup close handler

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_open") ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", escapeHandler);
}

//Editing the profile & opening the modal

profileButtonEdit.addEventListener("click", function openEditProfile() {
  openPopup(profileModal);
  profileModalInputName.value = profileTitle.textContent;
  profileModalInputSubtitle.value = profileSubtitle.textContent;
});

//Submitting the form

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileModalInputName.value;
  profileSubtitle.textContent = profileModalInputSubtitle.value;
  closePopup(profileModal);
}
profileModalForm.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(cardData) {
  // Card rendering
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__title").textContent = `${cardData.name}`;
  cardImage.src = cardData.link;
  cardImage.alt = `${cardData.name}`;

  likeButton.addEventListener("click", likeButtonHandler);
  deleteButton.addEventListener("click", deleteButtonHandler);

  cardImage.addEventListener("click", () => {
    handleImageClick(cardData);
  });

  return cardElement;
}

// Like button handler
const likeButtonHandler = (evt) => {
  evt.currentTarget.classList.toggle("card__like-button_active");
};

//Delete buttons handler
const deleteButtonHandler = (evt) => {
  const card = evt.target.closest(".card");
  if (card) {
    card.remove();
  }
};

// Image Modal handler

const handleImageClick = (cardData) => {
  modalImage.src = cardData.link;
  modalTitleSmall.textContent = `${cardData.name}`;
  modalImage.alt = `${cardData.name}`;
  openPopup(modalImagePreview);
};

// Cards Prepending
initialCards.forEach((cardData) => {
  cardsList.prepend(getCardElement(cardData));
});

// New card handler
addCardButton.addEventListener("click", () => {
  openPopup(modalAddCard);
});

// Form Submit Handler

function submitAddPlaceModal(evt) {
  evt.preventDefault();
  const userInput = {
    name: modalAddCardInputPlace.value,
    link: modalAddCardInputUrl.value,
  };
  const newCard = getCardElement(userInput);
  cardsList.prepend(newCard);
  closePopup(modalAddCard);
  modalAddCardInputPlace.value = "";
  modalAddCardInputUrl.value = "";
}

modalAddCardForm.addEventListener("submit", submitAddPlaceModal);

// Escape button handler

function escapeHandler(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_open");
    closePopup(openedPopup);
  }
}

// export { handleImageClick };

// import FormValidator from "../components/FormValidator";

// Universal handler for close buttons
// const closeButtons = document.querySelectorAll(".popup__close");

// closeButtons.forEach((button) => {
//   const popup = button.closest(".popup");
//   button.addEventListener("click", () => {
//     closePopup(popup);
//   });
// });

//Adding an option to close the popup by the click outside of it

// popups.forEach((popup) => {
//   const popupContent = popup.querySelector("#popup__container");
//   popup.addEventListener("click", (evt) => {
//     // if click is committed outside of the popup - close it
//     if (!popupContent.contains(evt.target)) {
//       closePopup(popup);
//     }
//   });
// });

// function renderCard(item, method = "prepend") {
//   const cardElement = getCardElement(item);
//   cardsList[method](cardElement);
// }
