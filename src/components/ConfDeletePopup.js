import Popup from "./Popup";

class confirmDeletePopup extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this.popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  setCardElement(cardElement, cardId) {
    this._cardElement = cardElement;
    this._cardId = cardId; // did not understand the id and element attribution logics here
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardElement, this._cardId); // need to get the card element here
      // did not understand the id logics here
    });
    super.setEventListeners();
  }

  open() {
    super.open();
  }
}

export default confirmDeletePopup;
