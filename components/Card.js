// import { handleImageClick } from "../pages/index.js";

class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  getView() {
    this._getCardTemplate();
    this._renderCard();
    this._setEventListeners();
    // return the card
  }

  _setEventListeners() {
    // alert("You did it");
    //Here goes the part of code, responsible for the event listeners

    //like button
    const likeButton = this.cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    //delete button
    const deleteButton = this.cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      this.cardElement.remove();
    });

    // Image Click handler

    this.cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
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
    this.cardElement = this._getCardTemplate();
    this.cardElement.querySelector(".card__title").textContent = this._name;
    this.cardElement.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    // console.log(this.cardElement);

    return this.cardElement;
  }
}
export default Card;
