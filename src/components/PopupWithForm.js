import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this.popupElement.querySelector(".popup__form");
    this._submitButton = this._popupForm.querySelector(".popup__button");
    this._defaultButtonText = this._submitButton.textContent;
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

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }

  // User input values setter
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  getForm() {
    return this._popupForm;
  }

  // Event Listeners setter and submit logics
  _setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
    super.setEventListeners();
  }
}

export default PopupWithForm;
