class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // User Current Info getter
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  // User's new info setting
  setUserInfo({ name, description, avatar }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
    if (avatar) {
      this._avatarElement.src = avatar; // не работает замена этой строки на метод
    }
  }

  setNewAvatar(data) {
    this._avatarElement.src = data.avatar;
  }
}

export default UserInfo;
