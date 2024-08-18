let yosemiteValley = {
  name: "yosemiteValley",
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
let modal = document.querySelector(".modal");
let buttonClose = modal.querySelector(".modal__close");

buttonEdit.addEventListener("click", function openEditProfile() {
  modal.removeAttribute("style", "display:none");
  modal.classList.add("modal_opened");
});

buttonClose.addEventListener("click", function closeModal() {
  modal.setAttribute("style", "display:none");
  modal.classList.remove("modal_opened");
});
