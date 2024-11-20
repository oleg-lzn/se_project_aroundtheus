// Import all the classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import {
  addCardButton,
  profileAvatarContainer,
  profileButtonEdit,
} from "../utils/constants.js";
import { config } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import ConfirmDeletePopup from "../components/ConfDeletePopup.js";

// Api Initialization
export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "fbd43f39-bc6f-4ff1-b85c-3a8e63a0b02d",
    "Content-Type": "application/json",
  },
});

// CARDS AND PAGE RENDERING
// Getting the user data and the initial cards on the initial page loading

let cardsList; // правильно ли так??? Было раньше как внизу, теперь CardsList объявлена так, чтобы использоваться в попапе

api
  .loadPageContent()
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });

    cardsList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const newCard = createCard(item);
          cardsList.addItem(newCard);
        },
      },
      config.cardsListSelector
    );

    cardsList.renderItems();
  })
  .catch((err) => console.error(err));

// Card creation function
function createCard(item) {
  function handleImageClick() {
    imagePopup.open(item);
    imagePopup.setEventListeners();
  }

  function handleLikeToggle(isLiked) {
    if (isLiked) {
      api
        .dislikeCard(item._id)
        .then((res) => {
          cardElement.updateLikeStatus(res.isLiked);
        })
        .catch((err) => console.error(err));
    } else {
      api
        .likeCard(item._id)
        .then((res) => {
          cardElement.updateLikeStatus(res.isLiked);
        })
        .catch((err) => console.error(err));
    }
  }

  function handleDeleteButton(cardElement) {
    confirmPopup.open(item._id, cardElement);
  }

  const cardElement = new Card(
    item,
    "#card-template",
    // image popup callback
    handleImageClick,
    // like handler callback
    handleLikeToggle,
    // delete popup open handler
    handleDeleteButton
  );
  return cardElement.getView();
}

// POPUPS

// Creating a card image popup
const imagePopup = new PopupWithImage("#imageOpen");

// Card delete confirmation popup
const confirmPopup = new ConfirmDeletePopup({
  popupSelector: "#cardDelete",
  handleFormSubmit: (cardId, cardElement) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.removeCard();
        confirmPopup.setCardId(null);
        confirmPopup.close();
      })
      .catch((err) => console.error("Error deleting the card", err));
  },
});

// Creating a popup with add card form
const newCardPopup = new PopupWithForm({
  popupSelector: "#addElement",
  handleFormSubmit: (userInput) => {
    newCardPopup.renderLoading(true);
    api
      .addNewCard(userInput)
      .then((data) => {
        const newUserCard = createCard({
          name: data.name,
          link: data.link,
          _id: data._id, // Разобраться с передачей данных при создании карточки
          isLiked: data.isLiked,
        });
        cardsList.addItem(newUserCard); // здесь контейнер в статусе undefined, потому что он не в глобальном скоупе
        formValidators["new-card-form"].disableButton();
        newCardPopup.getForm().reset();
        newCardPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => newCardPopup.renderLoading(false));
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
    userPopupForm.renderLoading(true);
    api
      .editProfileData(userInput)
      .then((data) => {
        userInfo.setUserInfo({
          name: data.name,
          description: data.about,
        });
        userPopupForm.close();
      })
      .catch((err) => console.error(err))
      .finally(() => userPopupForm.renderLoading(false));
  },
});

// PROFILE INFO CHANGES

// User Info and Avatar Change
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

//Profile Avatar Change
const profilePicPopup = new PopupWithForm({
  popupSelector: "#profilePicChange",
  handleFormSubmit: (inputValues) => {
    profilePicPopup.renderLoading(true);
    api
      .avatarUpdate(inputValues)
      .then((data) => {
        userInfo.setNewAvatar(data);
        formValidators["profile-pic-change"].disableButton();
        profilePicPopup.close();
        profilePicPopup.getForm().reset();
      })
      .catch((err) => console.error(err))
      .finally(() => profilePicPopup.renderLoading(false));
  },
});

profileAvatarContainer.addEventListener("click", () => {
  profilePicPopup.open();
});

profileButtonEdit.addEventListener("click", () => {
  formValidators["profile-form"].resetValidation();
  userPopupForm.open();
  const currentUserData = userInfo.getUserInfo();
  userPopupForm.setInputValues(currentUserData);
});

//VALIDATION

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

export default confirmPopup;
