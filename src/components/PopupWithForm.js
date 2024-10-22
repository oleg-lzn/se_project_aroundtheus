import Popup from "./popup";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this.popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const userInput = {};
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
    this._inputList.forEach((input) => (userInput[input.name] = input.value));
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
// const newCardPopup = new PopupWithForm("#new-card-form", () => {});
// newCardPopup.setEventListeners();

// selects the inputs
// sets the event listeners for the input
// Stores the user inputs in the object with userinput
// validates the inputs
// set the event listeners on the form with the input
// submits the form with the user's inputs
// renders the card with the users input
// prepends this card to the cardlist
// add the submit event listener and call the parent SEL method from Popup

// //Submitting the form
// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = profileModalInputName.value;
//   profileSubtitle.textContent = profileModalInputSubtitle.value;
//   closePopup(profileModal);
// }

// // Form Submit Handler
// function submitAddPlaceModal(evt) {
//   evt.preventDefault();
//   const userInput = {
//     name: modalAddCardInputPlace.value,
//     link: modalAddCardInputUrl.value,
//   };
//   renderCard(userInput);
//   closePopup(modalAddCard);
//   modalAddCardInputPlace.value = "";
//   modalAddCardInputUrl.value = "";
//   formValidators["new-card-form"].disableButton();
// }

// _setEventListeners() {
//   // look for the inputs and the submit button inside the form
//   this._inputList = Array.from(
//     this._form.querySelectorAll(this._inputSelector)
//   );
//   this._submitButton = this._form.querySelector(this._submitButtonSelector);
//   //loop through the inputs to see if all is valid
//   this._inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", (evt) => {
//       //check input validity
//       this._checkInputValidity(inputElement);
//       //disable the button if input is not valid
//       this._toggleButtonState(); // check
//     });
//   });
// }
