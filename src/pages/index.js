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
function createCard(item) {
  const cardElement = new Card(item, "#card-template", () =>
    imagePopup.open(item)
  );
  return cardElement.getView();
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = createCard(item);
      cardsList.addItem(newCard);
    },
  },
  config.cardsListSelector
);
// Initialize an instance
cardsList.renderItems();
imagePopup.setEventListeners();

// Creating a popup with add card form
const newCardPopup = new PopupWithForm({
  popupSelector: "#addElement",
  handleFormSubmit: (userInput) => {
    const newUserCard = createCard({
      name: userInput.title,
      link: userInput.url,
    });
    cardsList.addItem(newUserCard);
    newCardPopup.close();
    formValidators["new-card-form"].disableButton();
  },
});

// Add new card button handler
addCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

// Initialize an instance
newCardPopup.setEventListeners();

// UserInfo popup
// Comment to the reviewer - I changed here the logics to use
// the PopupWithFormClass for Profile Data change
// and removed the extension of the popup class to the UserInfo class

const userPopupForm = new PopupWithForm({
  popupSelector: "#profileChange",
  handleFormSubmit: (userInput) => {
    const newUserInput = userInput;
    userInfo.setUserInfo({
      name: newUserInput.name,
      description: newUserInput.description,
    });
    userPopupForm.close();
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__subtitle",
});

profileButtonEdit.addEventListener("click", () => {
  formValidators["profile-form"].resetValidation();
  userPopupForm.open();
  const currentUserData = userInfo.getUserInfo();
  profileModalInputName.value = currentUserData.name;
  profileModalInputSubtitle.value = currentUserData.description;
});

// Initialize an instance
userPopupForm.setEventListeners();

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

// profileButtonEdit.addEventListener("click", () => {
//   formValidators["profile-form"].resetValidation();
//   userPopup.open();
//   const userData = userPopup.getUserInfo();
//   profileModalInputName.value = userData.name;
//   profileModalInputSubtitle.value = userData.description;
// });

// userPopup.setEventListeners();

// // Submitting the new profile data
// profileModalForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();

//   const newUserData = {
//     name: profileModalInputName.value,
//     description: profileModalInputSubtitle.value,
//   };

//   userPopup.setUserInfo(newUserData);
//   userPopup.close();
// });
