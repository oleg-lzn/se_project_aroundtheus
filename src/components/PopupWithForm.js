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
  // Comment to the reviewer.
  // I did not understand the logics of making a method. Could you please explain it?

  // getForm() {
  // return this._popupForm
  // }
  // Also, I did not understand your comment about setting input values using a method.
  // I get them using getInputValues and then they are passed to the SEL method on line 39
  // and on 40 it is executed (with the help of callback in index.js)
  //
  // //  setInputValues(data) {
  //   this._inputList.forEach((input) => {
  //     // Here you insert the `value` by the `name` of the input
  //     input.value = data[input.name];
  //   });
  // }

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

// _getInputValues() {
//   const userInput = {};
//   this._inputList = Array.from(
//     this._popupForm.querySelectorAll(".popup__input")
//   );
//   this._inputList.forEach((input) => (userInput[input.name] = input.value));
//   return userInput;
// }
