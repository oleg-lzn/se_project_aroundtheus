class FormValidator {
  constructor(config, form) {
    this.form = form;
    this.config = config;
  }

  enableValidation() {
    // ultimate method for form validation
  }

  setEventListeners() {
    // for setting the listeners on input and toggling the button state
  }

  checkInputValidity(form, inputElement, config) {
    //for checking the input validity
    if (!inputElement.validity.valid) {
      showInputError(
        form,
        inputElement,
        config,
        inputElement.validationMessage
      );
    } else {
      hideInputError(form, inputElement, config);
    }
  }

  disableButton(submitButton, config) {
    //for button disable
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  }

  enableButton(submitButton, config) {
    //for button enabling
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  }

  hasInvalidInput(inputList) {
    //for checking invalid input
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState(inputList, submitButton, config) {
    // for toggling the button
    if (hasInvalidInput(inputList)) {
      disableButton(submitButton, config);
    } else {
      enableButton(submitButton, config);
    }
  }
}

export default FormValidator;
