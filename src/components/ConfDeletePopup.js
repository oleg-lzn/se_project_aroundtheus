import Popup from "./Popup";

class ConfirmDeletePopup extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this.popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._setEventListeners();
  }

  // Event Listeners setter and submit logics
  _setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (
        this._handleFormSubmit &&
        typeof this._handleFormSubmit === "function"
      ) {
        this._handleFormSubmit();
        this.close();
      }
    });
    super.setEventListeners();
  }

  open() {
    super.open();
  }
}

export default ConfirmDeletePopup;
