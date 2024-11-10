class Api {
  constructor(options) {
    this._baseURL = "https://around-api.en.tripleten-services.com/v1";
    this._headers = {
      authorization: "fbd43f39-bc6f-4ff1-b85c-3a8e63a0b02d",
      "Content-Type": "application/json",
    };
  }

  getUserData() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else return Promise.reject(`Error: ${res.status}`);
      })
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
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  addNewCard(newCard) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.title,
        link: newCard.url,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  likeCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else return Promise.reject(`Error: ${res.status}`);
      })
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }
}

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
