import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this.popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
  }

  _getInputValues() {
    const userInput = this._inputList.reduce((acc, input) => {
      const { name, value } = input;
      acc[name] = value;
      return acc;
    }, {});
    return userInput;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // Here you insert the `value` by the `name` of the input
      data[input.name] = input.value;
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this._popupForm.reset();
    });
    super.setEventListeners();
  }

  close() {
    // Comment to the reviewer - moved the form reset to the SEL method after a submission.
    super.close();
  }
}

export default PopupWithForm;
