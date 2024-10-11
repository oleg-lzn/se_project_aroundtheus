import { handleImageClick } from "../pages/index.js";

class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getCardTemplate() {
    // alert("You did it");
    // Here goes the method for card template creation and copying
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    return cardTemplate;
  }

  _renderCard() {
    // alert("You did it");
    // Here goes the method for card rendering and filling it with data
    this._cardElement = this._getCardTemplate();
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardElement.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    // console.log(this._cardElement);

    return this._cardElement;
  }

  _setEventListeners() {
    // alert("You did it");
    //Here goes the part of code, responsible for the event listeners

    //like button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    //delete button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._deleteButtonHandler();
      });

    //Image handler
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
  }

  //   handlers for like and delete buttons

  _deleteButtonHandler() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._getCardTemplate();
    this._renderCard();
    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
