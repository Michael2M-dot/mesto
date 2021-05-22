// Токен: 99295e52-decf-4a30-8030-f17c65fb60b0
// Идентификатор группы: cohort-24


export default class Api {
  constructor({serverUrl, headers}) {
    this._serverUrl = serverUrl;
    this._headers = headers;
  }

  _checkStatus(res) {
    // res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }

  getUserData() {
    return fetch(`${this._serverUrl}/users/me`, {
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

  updateUserData(data) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      // body: JSON.stringify(data),
      body: JSON.stringify({
        name: data.userNameInput,
        about: data.userJobInput,
      }),
    })
      .then((res) => this._checkStatus(res))
  }

  addCard(data) {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.placeNameInput,
        link: data.placeLinkInput
      }),
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
    return fetch(`${this._serverUrl}/users/me`, {
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
