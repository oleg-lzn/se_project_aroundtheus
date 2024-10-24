class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}

export default UserInfo;

// //Editing the profile & opening the modal
// profileButtonEdit.addEventListener("click", function openEditProfile() {
//   //resetting validation and errors on opening the profile modal
//   formValidators["profile-form"].resetValidation();
//   openPopup(profileModal);
//   profileModalInputName.value = profileTitle.textContent;
//   profileModalInputSubtitle.value = profileSubtitle.textContent;
// });

// //Submitting the form
// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = profileModalInputName.value;
//   profileSubtitle.textContent = profileModalInputSubtitle.value;
//   closePopup(profileModal);
// }

// profileModalForm.addEventListener("submit", handleProfileFormSubmit);
