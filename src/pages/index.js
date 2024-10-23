// Import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import {
  initialCards,
  addCardButton,
  profileButtonEdit,
  profileModalInputName,
  profileModalInputSubtitle,
  profileModalForm,
} from "../utils/constants.js";
import { config } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Create the instances of the classes
const imagePopup = new PopupWithImage("#imageOpen");
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, "#card-template", () =>
        imagePopup.open(item)
      );
      cardsList.addItem(newCard.getView());
    },
  },
  config.cardsListSelector
);
// Initialize all my instances
cardsList.renderItems();
imagePopup.setEventListeners();

// Creating a popup with add card form
const newCardPopup = new PopupWithForm({
  popupSelector: "#addElement",
  handleFormSubmit: (userInput) => {
    const newUserCard = new Card(
      { name: userInput.title, link: userInput.url },
      "#card-template",
      () => imagePopup.open({ name: userInput.title, link: userInput.url })
    );
    cardsList.addItem(newUserCard.getView());
    ``;
    newCardPopup.close();
    formValidators["new-card-form"].disableButton();
  },
});

// Add new card button handler
addCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

newCardPopup.setEventListeners();

// UserInfo popup
const userPopup = new UserInfo(
  {
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__subtitle",
  },
  "#profileChange"
);

profileButtonEdit.addEventListener("click", () => {
  formValidators["profile-form"].resetValidation();
  userPopup.open();
  const userData = userPopup.getUserInfo();
  profileModalInputName.value = userData.name;
  profileModalInputSubtitle.value = userData.description;
});

userPopup.setEventListeners();

// Submitting the new profile data
profileModalForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newUserData = {
    name: profileModalInputName.value,
    description: profileModalInputSubtitle.value,
  };

  userPopup.setUserInfo(newUserData);
  userPopup.close();
});

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
