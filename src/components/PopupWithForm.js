import Popup from "./popup";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this.popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
    const userInput = this._inputList.reduce((acc, input) => {
      const { name, value } = input;
      acc[name] = value;
      return acc;
    }, {});
    return userInput;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;

// _getInputValues() {
//   const userInput = {};
//   this._inputList = Array.from(
//     this._popupForm.querySelectorAll(".popup__input")
//   );
//   this._inputList.forEach((input) => (userInput[input.name] = input.value));
//   return userInput;
// }
