import Popup from "./Popup";

class confirmDeletePopup extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this.popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._setEventListeners();
  }

  setCardElement(cardElement, cardId) {
    this._cardElement = cardElement;
    this._cardId = cardId; // did not understand the id and element attribution logics here
  }

  _setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (
        this._handleFormSubmit &&
        typeof this._handleFormSubmit === "function"
      ) {
        this._handleFormSubmit();
      }
    });
    super.setEventListeners();
  }

  open() {
    super.open();
  }
}

export default confirmDeletePopup;
