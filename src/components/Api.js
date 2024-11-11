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
    })
      .then((res) => this._checkTheApiResponse(res))
      .catch((err) => console.error(err));
  }

  editProfileData(userInput) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userInput.name,
        about: userInput.description,
      }),
    })
      .then((res) => this._checkTheApiResponse(res))
      .catch((err) => console.error(err));
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    })
      .then((res) => this._checkTheApiResponse(res))
      .catch((err) => console.error(err));
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
    })
      .then((res) => this._checkTheApiResponse(res))
      .catch((err) => console.error(err));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._checkTheApiResponse(res))
      .catch((err) => console.error(err));
  }

  likeCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => this._checkTheApiResponse(res))
      .catch((err) => console.error(err));
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._checkTheApiResponse(res))
      .catch((err) => console.error(err));
  }

  avatarUpdate(inputValues) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputValues.url, // проверить, как в запросе реально
      }),
    })
      .then((res) => this._checkTheApiResponse(res))
      .catch((err) => console.error(err));
  }

  loadPageContent() {
    const promises = [this.getInitialCards(), this.getUserData()];
    return Promise.all(promises);
  }
}

// const promises = [getuserData(), getInitialCards()];

// // pass the array of promises to the Promise.all() method
// Promise.all(promises)
//   .then((results) => {
//     console.log(results); // ["Picture", "Text"]
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// // create an array of promises

export default Api;

// User routes

// GET /users/me – Get the current user’s info
// PATCH /users/me – Update your profile information
// PATCH /users/me/avatar – Update avatar
// Card routes

// GET /cards – Get all cards
// POST /cards – Create a card
// DELETE /cards/:cardId – Delete a card
// PUT /cards/:cardId/likes – Like a card
// DELETE /cards/:cardId/likes – Dislike a card

// Cards should be rendered after the user information is received from the server.
//  Сreate a function in Api.js and return the Promise.all() method.
//  Pass the array of function calls for getting user information and the list of cards to Promise.all()
//  as a parameter.

// const promise1 = Promise.resolve(3);
// const promise2 = new Promise((resolve) => setTimeout(resolve, 1000, "Hello"));
// const promise3 = Promise.resolve(42);

// Promise.all([promise1, promise2, promise3])
//   .then((results) => {
//     console.log(results); // [3, "Hello", 42]
//   })
//   .catch((error) => {
//     console.error("Ошибка:", error);
//   });
