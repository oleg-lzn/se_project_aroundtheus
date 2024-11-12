import Popup from "./Popup";

class ConfirmDeletePopup extends Popup {
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
        this.handleFormSubmit(); // сюда надо передавать информацию о карточке
      }
    });
    super.setEventListeners();
  }
}

export default ConfirmDeletePopup;
