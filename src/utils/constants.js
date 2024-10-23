export const initialCards = [
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

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  popupImageSelector: ".popup__image",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  closeButtonSelector: ".popup__close",
  popup: ".popup",
  cardsListSelector: ".cards__list",
  cardSelector: ".card",
};

// Templates
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Variables
export const profile = document.querySelector(".profile");
export const profileTitle = profile.querySelector(".profile__title");
export const profileSubtitle = profile.querySelector(".profile__subtitle");
export const profileModal = document.querySelector(".popup");
export const profileModalInputName = profileModal.querySelector("[name=name]");
export const profileModalInputSubtitle =
  profileModal.querySelector("[name=description]");
export const cardsList = document.querySelector(".cards__list");

// Variables for the Add Place Modal
export const modalAddCard = document.getElementById("addElement");
export const modalAddCardInputPlace =
  modalAddCard.querySelector("[name=title]");
export const modalAddCardInputUrl = modalAddCard.querySelector("[name=url]");

// Variables for image modal
export const modalImagePreview = document.getElementById("imageOpen");
export const modalImage = modalImagePreview.querySelector(".popup__image");
export const modalTitleSmall = modalImagePreview.querySelector(
  ".popup__title-small"
);

// Buttons
export const profileButtonEdit = profile.querySelector(".profile__edit-button");
export const addCardButton = profile.querySelector(".profile__add-button");

// Forms
export const modalAddCardForm = document.forms["new-card-form"];
export const profileModalForm = document.forms["profile-form"];
