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

let initialCards = [
  yosemiteValley,
  lakeLouise,
  baldMountains,
  latemar,
  vanoiseNationalPark,
  lagoDiBraies,
];

const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".profile__edit-button");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const modal = document.querySelector(".modal");
const buttonClose = modal.querySelector(".modal__close");
const modalInputName = modal.querySelector("[name=name]");
const modalInputSubtitle = modal.querySelector("[name=description]");
const modalForm = modal.querySelector(".modal__form");
const cardsList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// variables for the Add Place Modal
const modalAddCard = document.getElementById("addElement");
const buttonAdd = profile.querySelector(".profile__add-button");
const buttonCloseModal = modalAddCard.querySelector(".modal__close");

//Editing the profile & opening the modal
function closeModalProfile() {
  modal.classList.remove("modal_opened");
}

buttonEdit.addEventListener("click", function openEditProfile() {
  modal.classList.add("modal_opened");
  modalInputName.value = profileTitle.textContent;
  modalInputSubtitle.value = profileSubtitle.textContent;
});

//Closing withouth editing the profile
buttonClose.addEventListener("click", function closeModal() {
  closeModalProfile();
});

//Submitting the form
function submitModalForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = modalInputName.value;
  profileSubtitle.textContent = modalInputSubtitle.value;
  closeModalProfile();
}
modalForm.addEventListener("submit", submitModalForm);

function getCardElement(cardData) {
  let cardElement = cardTemplate.cloneNode(true);
  let cardTitle = cardElement.querySelector(".card__title");
  let cardImage = cardElement.querySelector(".card__image");
  let cardImageAlt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardImageAlt;
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement);
});

// Adding the new card form
buttonAdd.addEventListener("click", function openAddCard() {
  modalAddCard.classList.add("modal_opened");
});

//Closing modal withouth adding the new place
buttonCloseModal.addEventListener("click", function closeAddPlaceModal() {
  modalAddCard.classList.remove("modal_opened");
});
