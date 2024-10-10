const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const setEventListeners = (form, config) => {
      // look for the inputs and the submit button inside the form
      const inputList = Array.from(form.querySelectorAll(config.inputSelector));
      const submitButton = form.querySelector(config.submitButtonSelector);
      //loop through the inputs to see if all is valid
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", (evt) => {
          //check input validity
          checkInputValidity(form, inputElement, config);
          //disable the button if input is not valid
          toggleButtonState(inputList, submitButton, config);
        });
      });
    };
    setEventListeners(form, config);
  });

  const showInputError = (form, inputElement, config, errorMessage) => {
    // if input is not valid - we'd like to take the validation message,
    const errorElement = form.querySelector("#" + `${inputElement.id}-error`);
    // Add error class to the input and show display error message.
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
  };

  const hideInputError = (form, inputElement, config) => {
    const errorElement = form.querySelector("#" + `${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
    // if all the inputs are correct
    // reset error messages
  };

  const checkInputValidity = (form, inputElement, config) => {
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
  };

  // Toggling the button state
  const disableButton = (submitButton, config) => {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  };

  const enableButton = (submitButton, config) => {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  const toggleButtonState = (inputList, submitButton, config) => {
    if (hasInvalidInput(inputList)) {
      disableButton(submitButton, config);
    } else {
      enableButton(submitButton, config);
    }
  };
};

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);

//resetting the validation
// const resetValidation = (config) => {
//   hideInputError(form, inputElement, config);
// };
