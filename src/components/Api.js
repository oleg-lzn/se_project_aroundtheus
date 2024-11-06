class Api {
  constructor(options) {
    // constructor body
  }

  getUserData() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "fbd43f39-bc6f-4ff1-b85c-3a8e63a0b02d",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  editProfileData(userInput) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "fbd43f39-bc6f-4ff1-b85c-3a8e63a0b02d",
        "Content-Type": "application/json",
      },
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
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "fbd43f39-bc6f-4ff1-b85c-3a8e63a0b02d",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  addNewCard(newCard) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "fbd43f39-bc6f-4ff1-b85c-3a8e63a0b02d",
        "Content-Type": "application/json; charset=UTF-8",
      },
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
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "fbd43f39-bc6f-4ff1-b85c-3a8e63a0b02d",
    "Content-Type": "application/json",
  },
});

// api.getUserData();
// api.getInitialCards();
api.addNewCard({
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
});
// api.editProfileData();

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
