import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this.popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
    this._setEventListeners();
  }

  // User Input values getter and returning an object with them
  _getInputValues() {
    const userInput = this._inputList.reduce((acc, input) => {
      const { name, value } = input;
      acc[name] = value;
      return acc;
    }, {});
    return userInput;
  }

  // User input values setter
  setInputValues(data) {
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });
  }

  // Event Listeners setter and submit logics
  _setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this._popupForm.reset();
      this.close();
    });
    super.setEventListeners();
  }

  // Popup Closer
  close() {
    super.close();
  }
}

export default PopupWithForm;
