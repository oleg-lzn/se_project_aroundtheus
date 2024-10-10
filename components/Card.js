class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    // // this._handleImageClick = handleImageClick;
    // handleImageClick
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

    //handling image click button

    // this._cardImageElement.addEventListener("click", () => {
    //   this._handleImageClick(this);
    // });
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

// this._handeImageClick = handleImageClick;
// this._card__like-button = data.likebutton;
// this._card__delete-button = data.deletebutton;

//     this._cardImage.addEventListener("click", () => {
//       this._handleImageClick(this);
//     });
//   }

//   _handleButtonsClick(cardElement) {
//     // method for like button handling
//     const likeButton = cardElement.querySelector(".card__like-button");
//     likeButton.addEventListener("click", () => {
//       likeButton.classList.toggle("card__like-button_active");
//     });

//   }
// }

export default Card;
