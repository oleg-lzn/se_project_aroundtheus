class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getCardTemplate() {
    // Here goes the method for card template creation and copying
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    //Here goes the part of code, responsible for the event listeners

    //like button
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    //delete button
    this._trashButton.addEventListener("click", () => {
      this._deleteButtonHandler();
    });

    //Image handler
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _renderCard() {
    // Here goes the method for card rendering and filling it with data
    this._cardElement = this._getCardTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._trashButton = this._cardElement.querySelector(".card__delete-button");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._setEventListeners();
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  //   handlers for like and delete buttons
  _deleteButtonHandler() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  getView() {
    this._renderCard();
    return this._cardElement;
  }
}

export default Card;
