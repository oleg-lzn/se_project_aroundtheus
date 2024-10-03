//Declaring the variables

const yosemiteValley = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const lakeLouise = {
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
};

const baldMountains = {
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
};

const latemar = {
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
};

const vanoiseNationalPark = {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
};

const lagoDiBraies = {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
};

const initialCards = [
  yosemiteValley,
  lakeLouise,
  baldMountains,
  latemar,
  vanoiseNationalPark,
  lagoDiBraies,
];

const profile = document.querySelector(".profile");
const profileButtonEdit = profile.querySelector(".profile__edit-button");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const profileModal = document.querySelector(".popup");
const profileButtonClose = profileModal.querySelector(".popup__close");
const profileModalInputName = profileModal.querySelector("[name=name]");
const profileModalInputSubtitle =
  profileModal.querySelector("[name=description]");
const profileModalForm = document.forms["profile-form"];
const cardsList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// variables for the Add Place Modal
const modalAddCard = document.getElementById("addElement");
const buttonAdd = profile.querySelector(".profile__add-button");
const addCardButtonClose = modalAddCard.querySelector(".popup__close");
const modalAddCardInputPlace = modalAddCard.querySelector("[name=title]");
const modalAddCardInputUrl = modalAddCard.querySelector("[name=url]");
const modalAddCardForm = document.forms["new-card-form"];

// variables for image modal
const modalImagePreview = document.getElementById("imageOpen");
const modalImage = modalImagePreview.querySelector(".popup__image");
const modalTitleSmall = modalImagePreview.querySelector(".popup__title-small");
const buttonCloseImageModal = modalImagePreview.querySelector(".popup__close");

//Universal functions for opening and closing modals
function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", escapeHandler);

  // Remarks to the reviewer.
  // Thanks a lot for the explanation! Very cool and helpful.
}

//Task 3 Universal popup close handler
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_open")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
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
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  // Task 6 - Image Modal Creation
  cardImage.addEventListener("click", () => {
    openPopup(modalImagePreview);
    modalImage.src = cardImage.src;
    modalTitleSmall.textContent = cardTitle.textContent;
    modalImage.alt = cardTitle.textContent;
  });
  const cardImageAlt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardImageAlt;
  //Task 4 Making the like buttons work
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  //Task 5 Making the delete buttons work
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  return cardElement;
}

//Task 1 Changing the for loop to forEach method
initialCards.forEach((cardData) => {
  renderCard(cardData);
});

function renderCard(cardData, method = "prepend") {
  const cardElement = getCardElement(cardData);
  cardsList[method](cardElement);
}

//Task 2 Adding the new card
buttonAdd.addEventListener("click", () => {
  openPopup(modalAddCard);
});

//Adding the new place and submitting the form
function submitAddPlaceModal(evt) {
  evt.preventDefault();
  const userInput = {
    name: modalAddCardInputPlace.value,
    link: modalAddCardInputUrl.value,
  };
  const newCard = getCardElement(userInput);
  renderCard(newCard);
  closePopup(modalAddCard);
  modalAddCardInputPlace.value = "";
  modalAddCardInputUrl.value = "";
}

modalAddCardForm.addEventListener("submit", submitAddPlaceModal);

//Adding an option to close the popup by the click outside of it

popups.forEach((popup) => {
  const popupContent = popup.querySelector("#popup__container");
  popup.addEventListener("click", (evt) => {
    // if click is committed outside of the popup - close it
    if (!popupContent.contains(evt.target)) {
      closePopup(popup);
    }
  });
});

// Adding an option to close the popup by the ESC press
function escapeHandler(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_open");
    closePopup(openedPopup);
  }
}

// Universal handler for close buttons
// const closeButtons = document.querySelectorAll(".popup__close");

// closeButtons.forEach((button) => {
//   const popup = button.closest(".popup");
//   button.addEventListener("click", () => {
//     closePopup(popup);
//   });
// });
