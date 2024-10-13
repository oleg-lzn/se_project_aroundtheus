import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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
const profileButtonEdit = profile.querySelector(".profile__edit-button");
const addCardButton = profile.querySelector(".profile__add-button");

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
  //resetting validation and errors on opening the profile modal
  formValidators["profile-form"].resetValidation();
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

// Image Modal handler
const handleImageClick = (cardData) => {
  modalImage.src = cardData.link;
  modalTitleSmall.textContent = `${cardData.name}`;
  modalImage.alt = `${cardData.name}`;
  openPopup(modalImagePreview);
};

// Render card function
function renderCard(item, method = "prepend") {
  const newCard = new Card(item, "#card-template", handleImageClick);
  const readyCard = newCard.getView();
  cardsList[method](readyCard);
}

// Cards prepending
initialCards.forEach((card) => {
  renderCard(card);
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
  renderCard(userInput);
  closePopup(modalAddCard);
  modalAddCardInputPlace.value = "";
  modalAddCardInputUrl.value = "";
}

modalAddCardForm.addEventListener("submit", (evt) => {
  submitAddPlaceModal(evt);
  //resetting validation and errors on submitting the add card modal
  const submitCardButton = modalAddCardForm.querySelector(
    config.submitButtonSelector
  );
  formValidators["new-card-form"].disableButton();
});

// Escape button handler
function escapeHandler(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_open");
    closePopup(openedPopup);
  }
}

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Universal handler for forms validation
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formId = form.getAttribute("id");
    formValidators[formId] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

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
