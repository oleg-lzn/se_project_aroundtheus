import confirmPopup from "../pages/index.js";
import Api from "../pages/index.js";

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
    this._id = _id; // понять, какая тут логика. До присвоения id карточке сам не дошел, тупой.
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeToggle = handleLikeToggle;
    this._handleCardDelete = handleCardDelete;
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
    // this._likeButton.addEventListener("click", () => {
    //   this._handleLikeButton();
    // });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeToggle(this._isLiked); // должен передавать в index.js статус isLiked и id,
      // чтобы отправить запрос на сервер в колбэке
    });

    //delete button
    this._trashButton.addEventListener("click", () => {
      confirmPopup.open();
      // confirmPopup.setCardElement(this._cardElement, this._id);
      confirmPopup._handleFormSubmit = () => {
        this._handleCardDelete(this._id);
      };
      // logics for getting the card ID should be here
    });

    //Image handler
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  updateLikeStatus(isLiked) {
    this._isLiked = isLiked;
    isLiked
      ? this._likeButton.classList.add("card__like-button_active")
      : this._likeButton.classList.remove("card__like-button_active");
  }

  _renderCard() {
    // Here goes the method for card rendering and filling it with data
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

  removeCard() {
    this._cardElement.remove();
  }

  // _handleLikeButton() {
  //   this._likeButton.classList.toggle("card__like-button_active");
  // }

  getView() {
    this._renderCard();
    return this._cardElement;
  }
}

export default Card;
