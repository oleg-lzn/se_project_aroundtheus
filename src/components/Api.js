class Api {
  constructor({ baseUrl, headers }) {
    this._baseURL = baseUrl;
    this._headers = headers;
  }

  _checkTheApiResponse(res) {
    if (res.ok) {
      return res.json();
    } else return Promise.reject(`Error: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkTheApiResponse(res));
  }

  editProfileData(userInput) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userInput.name,
        about: userInput.description,
      }),
    }).then((res) => this._checkTheApiResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkTheApiResponse(res));
  }

  addNewCard(newCard) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.title,
        link: newCard.url,
        isLiked: newCard.isLiked,
        _id: newCard._id,
      }),
    }).then((res) => this._checkTheApiResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkTheApiResponse(res));
  }

  likeCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkTheApiResponse(res));
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkTheApiResponse(res));
  }

  avatarUpdate(inputValues) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputValues.url,
      }),
    }).then((res) => this._checkTheApiResponse(res));
  }

  loadPageContent() {
    const promises = [this.getInitialCards(), this.getUserData()];
    return Promise.all(promises);
  }
}

export default Api;
