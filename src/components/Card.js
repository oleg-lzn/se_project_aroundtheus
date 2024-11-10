import confirmPopup from "../pages/index.js";

class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleLikeToggle,
    handleCardDelete
  ) {
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeToggle = handleLikeToggle;
    this._handleCardDelete = handleCardDelete;
  }

  // Card template creation and copying
  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    return cardTemplate;
  }

  // Listeners creation function
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeToggle(this._isLiked); // должен передавать в index.js статус isLiked и id,
    });

    //Delete button
    this._trashButton.addEventListener("click", () => {
      confirmPopup.open();
      confirmPopup._handleFormSubmit = () => {
        this._handleCardDelete(this._id);
      };
    });

    //Image handler
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  // Like Status toggler
  updateLikeStatus(isLiked) {
    this._isLiked = isLiked;
    isLiked
      ? this._likeButton.classList.add("card__like-button_active")
      : this._likeButton.classList.remove("card__like-button_active");
  }

  // Card creation and listeners setting function
  _renderCard() {
    this._cardElement = this._getCardTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._trashButton = this._cardElement.querySelector(".card__delete-button");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
  }

  // Card Removal
  removeCard() {
    this._cardElement.remove();
  }

  // Opener
  open() {
    this.open();
  }

  // Card renderer
  getView() {
    this._renderCard();
    return this._cardElement;
  }
}

export default Card;
