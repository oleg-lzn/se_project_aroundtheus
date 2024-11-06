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
import Api from "../components/Api.js";
import confirmDeletePopup from "../components/ConfDeletePopup.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "fbd43f39-bc6f-4ff1-b85c-3a8e63a0b02d",
    "Content-Type": "application/json",
  },
});

// Create the instances of the classes
const imagePopup = new PopupWithImage("#imageOpen");
function createCard(item) {
  const cardElement = new Card(item, "#card-template", () =>
    imagePopup.open(item)
  );
  return cardElement.getView();
}

api.getInitialCards().then((data) => {
  const cardsList = new Section(
    {
      items: data,
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
});

// Creating a popup with add card form
const newCardPopup = new PopupWithForm({
  popupSelector: "#addElement",
  handleFormSubmit: (userInput) => {
    api.addNewCard(userInput).then((data) => {
      console.log(data);
      const newUserCard = createCard({
        name: data.title,
        link: data.url,
      });
      cardsList.addItem(newUserCard);
      newCardPopup.close();
      formValidators["new-card-form"].disableButton();
    });
  },
});

// Add new card button handler
addCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

// Initialize an instance
newCardPopup.setEventListeners();

// UserInfo popup
const userPopupForm = new PopupWithForm({
  popupSelector: "#profileChange",
  handleFormSubmit: (userInput) => {
    api
      .editProfileData(userInput)
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          description: data.about,
        });
      })
      .catch((err) => console.error(err));
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
  api
    .getUserData()
    .then((data) => {
      userPopupForm.setInputValues(data);
    })
    .catch((err) => console.error(err));
  // const currentUserData = userInfo.getUserInfo();
  // userPopupForm.setInputValues(currentUserData);
});

// Initialize an instance
userPopupForm.setEventListeners();

// // Card delete confirmation popup
// const confirmPopup = new confirmDeletePopup({
//   popupSelector: "cardDelete",
//   handleFormSubmit: (cardElement) => {
//     cardElement.remove();
//     cardElement = null;
//   },
// });

// // Initialize an instance
// confirmPopup.setEventListeners();

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
