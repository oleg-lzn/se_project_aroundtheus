import Popup from "./Popup";
import { profileAvatar } from "../utils/constants";

class ProfilePicPopup extends Popup {
  constructor({
    popupSelector,
    avatarSelector,
    handleFormSubmit,
    // handleLoadError,
  }) {
    super(popupSelector);
    this._popupForm = this.popupElement.querySelector(".popup__form");
    this._avatarElement = document.querySelector(avatarSelector);
    this._handleFormSubmit = handleFormSubmit;
    // this._handleLoadError = handleLoadError;
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
    this._setEventListeners();
  }

  _getInputValues() {
    const userInput = this._inputList.reduce((acc, input) => {
      const { name, value } = input;
      acc[name] = value;
      return acc;
    }, {});
    return userInput;
  }

  _setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (
        this._handleFormSubmit &&
        typeof this._handleFormSubmit === "function"
      ) {
        const inputValues = this._getInputValues();
        this._handleFormSubmit(inputValues);
        this._popupForm.reset();
        this.close();
      }
    });
    super.setEventListeners();
  }

  changeProfilePic(inputValues) {
    this._avatarElement.src = inputValues.avatar;
  }
}

export default ProfilePicPopup;

// // The callback needs to be executed after
// // the image is loaded
// function imageLoadCallback(evt) {
//   // After the image is loaded, add the image object to the DOM
//   document.body.append(evt.target);
// }

// function errorCallback() {
//   // After the image is loaded, add the image object to the DOM
//   console.log("error");
// }

// // The function for loading the image
// function loadImage(imageUrl, loadCallback, errorCallback) {
//   const img = document.createElement("img");
//   img.src = imageUrl;
//   // This method will be used when loading the image
//   img.onload = loadCallback;
//   img.onerror = errorCallback;
// }

// // Now the image will appear in the layout only after the image is loaded
// loadImage(
//   "https://yastatic.net/q/logoaas/v1/Practicum.svg",
//   imageLoadCallback,
//   errorCallback
// );
