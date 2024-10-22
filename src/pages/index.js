// Import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import { initialCards, addCardButton } from "../utils/constants.js";
import { config } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

// Create the instances of the classes
const imagePopup = new PopupWithImage("#imageOpen");
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, "#card-template", () =>
        imagePopup.open(item)
      );
      const newCardElement = newCard.getView();
      cardsList.addItem(newCardElement);
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
  handleFormSubmit: () => {
    const userInput = newCardPopup._getInputValues();
    const newUserCard = new Card(
      { name: userInput.title, link: userInput.url },
      "#card-template"
    );
    cardsList.addItem(newUserCard.getView());
    newCardPopup.close();
  },
});

// Add new card button handler
addCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

newCardPopup.setEventListeners();

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
