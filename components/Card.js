class Card {
  constructor(data, cardSelector, _handleImageClick) {
    this._cardTitle = data.name;
    this._cardImage = data.link;
    this._cardSelector = cardSelector;
    this._handeImageClick = handleImageClick;
    // this._card__like-button = data.likebutton;
    // this._card__delete-button = data.deletebutton;
  }

  _getCardTemplate() {
    // Here goes the functionf for card template creation and copy{
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    //Here goes the part of code, responsible for the event listeners

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  renderCard() {
    this.cardElement = this._getCardTemplate();
    this.cardElement.querySelector(".card__title").textContent =
      this._cardTitle;
    this.cardElement.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._cardImage})`;

    return this.cardElement;
  }

  _handleButtonsClick(cardElement) {
    // method for like button handling
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    // method for the delete button handling on the card
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });
  }
}

import { handleImageClick } from "../pages/index.js";
