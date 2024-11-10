// Import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import {
  addCardButton,
  profileAvatar,
  profileButtonEdit,
} from "../utils/constants.js";
import { config } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import ConfirmDeletePopup from "../components/ConfDeletePopup.js";
import ProfilePicPopup from "../components/ProfilePicPopup.js";

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "fbd43f39-bc6f-4ff1-b85c-3a8e63a0b02d",
    "Content-Type": "application/json",
  },
});

// Create the instances of the classes
const imagePopup = new PopupWithImage("#imageOpen");

function createCard(item) {
  const cardElement = new Card(
    item,
    "#card-template",
    () => imagePopup.open(item),
    (isLiked) => {
      if (isLiked) {
        api.dislikeCard(item._id).then((res) => {
          cardElement.updateLikeStatus(res.isLiked);
        });
      } else {
        api.likeCard(item._id).then((res) => {
          cardElement.updateLikeStatus(res.isLiked);
        });
      }
    },
    (cardId) => {
      api
        .deleteCard(cardId)
        .then(() => {
          console.log(cardId);
          cardElement.removeCard();
        })
        .catch((err) => console.error("Error deleting the card", err));
    }
  );
  return cardElement.getView();
}

const fetchedCards = api.getInitialCards().then((data) => {
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

  cardsList.renderItems();
  imagePopup.setEventListeners();

  // Creating a popup with add card form
  const newCardPopup = new PopupWithForm({
    popupSelector: "#addElement",
    handleFormSubmit: (userInput) => {
      api.addNewCard(userInput).then((data) => {
        console.log(data);
        const newUserCard = createCard({
          name: data.name,
          link: data.link,
        });
        cardsList.addItem(newUserCard);
        formValidators["new-card-form"].disableButton();
      });
    },
  });

  // Add new card button handler
  addCardButton.addEventListener("click", () => {
    newCardPopup.open();
  });

  // UserInfo Popup
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
    },
  });

  // User Info and Avatar Change
  const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__subtitle",
  });

  //Profile Avatar Change
  const profilePicPopup = new ProfilePicPopup({
    popupSelector: "#profilePicChange",
    avatarSelector: ".profile__avatar",
    handleFormSubmit: (inputValues) => {
      api
        .avatarUpdate(inputValues)
        .then((data) => {
          profilePicPopup.changeProfilePic(data);
        })
        .catch((err) => console.error(err));
    },
  });

  profileAvatar.addEventListener("click", () => {
    profilePicPopup.open();
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
});

// // Card delete confirmation popup
const confirmPopup = new ConfirmDeletePopup({
  popupSelector: "#cardDelete",
});

export default confirmPopup;
