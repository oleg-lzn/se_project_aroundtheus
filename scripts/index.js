//Declaring the variables

let yosemiteValley = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

let lakeLouise = {
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
};

let baldMountains = {
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
};

let latemar = {
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
};

let vanoiseNationalPark = {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
};

let lagoDiBraies = {
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

let profile = document.querySelector(".profile");
let buttonEdit = profile.querySelector(".profile__edit-button");
let profileTitle = profile.querySelector(".profile__title");
let profileSubtitle = profile.querySelector(".profile__subtitle");
let modal = document.querySelector(".modal");
let buttonClose = modal.querySelector(".modal__close");
let modalInputName = modal.querySelector(".modal__form-input_name");
let modalInputSubtitle = modal.querySelector(".modal__form-input_description");
let modalForm = modal.querySelector(".modal__form");

//Editing the profile & opening the modal
buttonEdit.addEventListener("click", function openEditProfile() {
  modal.removeAttribute("style", "display:none");
  modal.classList.add("modal_opened");
  modalInputName.value = profileTitle.textContent;
  modalInputSubtitle.value = profileSubtitle.textContent;
});

//Closing withouth editing the profile
buttonClose.addEventListener("click", function closeModal() {
  modal.setAttribute("style", "display:none");
  modal.classList.remove("modal_opened");
  modalInputName.value = " ";
  modalInputSubtitle.value = " ";
});

//Submitting the form
function modalFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = modalInputName.value;
  profileSubtitle.textContent = modalInputSubtitle.value;
  modal.setAttribute("style", "display:none");
  modal.classList.remove("modal_opened");
}
modalForm.addEventListener("submit", modalFormSubmit);

//Rendering the cards
let cardsList = document.querySelector(".cards__list");
let cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//Adding the cards to the DOM
for (let i = 0; i < initialCards.length; i++) {
  function getCardElement(data) {
    let cardElement = cardTemplate.cloneNode(true);
    let cardTitle = cardElement.querySelector(".card__title");
    let cardImage = cardElement.querySelector(".card__image");
    let cardImageAlt = initialCards[i].name;
    cardTitle.textContent = initialCards[i].name;
    cardImage.src = initialCards[i].link;
    cardImage.alt = cardImageAlt;
    cardsList.append(cardElement);
  }
  getCardElement(initialCards);
}
