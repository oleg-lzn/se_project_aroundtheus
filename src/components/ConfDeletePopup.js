import Popup from "./Popup";

class ConfirmDeletePopup extends Popup {
  cardId = null;
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this.popupElement.querySelector(".popup__form");
    this.handleFormSubmit = handleFormSubmit;
    this._setEventListeners();
  }

  // Event Listeners setter and submit logics
  _setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (
        this.handleFormSubmit &&
        typeof this.handleFormSubmit === "function"
      ) {
        // здесь должна подтягиваться информация о карточке, которая будет удалена
        this.handleFormSubmit(this.cardId, this.cardElement); // сюда надо передавать информацию о карточке
        this.setCardId(null);
      }
    });
    super.setEventListeners();
  }

  setCardId(cardId) {
    this.cardId = cardId;
  }

  setCardElement(cardElement) {
    this.cardElement = cardElement;
  }

  open(cardId, cardElement) {
    this.setCardId(cardId);
    this.setCardElement(cardElement);
    super.open();
  }
}

export default ConfirmDeletePopup;
