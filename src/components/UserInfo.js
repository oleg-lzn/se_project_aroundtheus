class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  // User Current Info getter
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  // User's new info setting
  setUserInfo({ name, description }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}

export default UserInfo;
