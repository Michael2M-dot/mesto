// Токен: 99295e52-decf-4a30-8030-f17c65fb60b0
// Идентификатор группы: cohort-24

/*
fetch('https://mesto.nomoreparties.co/v1/cohort-24/cards', {
  headers: {
    authorization: '99295e52-decf-4a30-8030-f17c65fb60b0'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 
  */

const userName = document.querySelector(".profile__user-name");
const userJob = document.querySelector(".profile__user-job");
const userAvatar = document.querySelector(".profile__user-avatar");

export default class Api {
  constructor(serverUrl, headers) {
    this._serverUrl = serverUrl;
    this._headers = headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }

  getUserData() {
    return fetch(`${this._serverUrl}/user/me`, {
      headers: this._headers,
    })
      .then((res) => this._checkStatus(res))
  }

  getInitialCards() {
    return fetch(`${this._serverUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => this._checkStatus(res))
  }

  updateUserData() {
    return fetch(`${this._serverUrl}/user/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => this._checkStatus(res))
  }

  addCard() {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => this._checkStatus(res))
  }

  deleteCard(id) {
    return fetch(`${this._serverUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._checkStatus(res))
  }

  likeCard(method, id) {
    return fetch(`${this._serverUrl}/cards/likes/${id}`, {
      method: method,
      headers: this._headers,
    })
      .then((res) => this._checkStatus(res))
  }

  updateAvatar(){
    return fetch(`${this._serverUrl}/user/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => this._checkStatus(res))
  }
}




// function getUsedData() {
//   return fetch("https://nomoreparties.co/v1/cohort-24/users/me", {
//     method: "GET",
//     headers: {
//       authorization: "99295e52-decf-4a30-8030-f17c65fb60b0",
//     },
//   });
// }
//
// getUsedData()
//   .then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(res.status);
//   })
//   .then((data) => {
//     console.log(data);
//     renderUserData(data);
//   })
//   .catch((err) => {
//     console.log("Error", err);
//   });
//
// function renderUserData(data) {
//   userName.textContent = data.name;
//   userJob.textContent = data.about;
//   userAvatar.style.backgroundImage = data.avatar;
// }
