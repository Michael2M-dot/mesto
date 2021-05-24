// Токен: 99295e52-decf-4a30-8030-f17c65fb60b0
// Идентификатор группы: cohort-24

export default class Api {
  constructor({ serverUrl, headers }) {
    this._serverUrl = serverUrl;
    this._headers = headers;
  }

  _checkStatus(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`${res.status} ${res.statusText}`);
  }

  getUserData() {
    return fetch(`${this._serverUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkStatus(res));
  }

  getInitialCards() {
    return fetch(`${this._serverUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkStatus(res));
  }

  updateUserData(data) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.userNameInput,
        about: data.userJobInput,
        _id: data._id,
        avatar: data.avatar,
      }),
    }).then((res) => this._checkStatus(res));
  }

  addCard(data) {
    return fetch(`${this._serverUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.placeNameInput,
        link: data.placeLinkInput,
        // owner: data.owner,
        // user: data.user
      }),
    }).then((res) => this._checkStatus(res));
  }

  deleteCard(id) {
    return fetch(`${this._serverUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkStatus(res));
  }

  likeCard(method, id) {
    return fetch(`${this._serverUrl}/cards/likes/${id}`, {
      method: method,
      headers: this._headers,
    }).then((res) => this._checkStatus(res));
  }

  updateAvatar(data) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarLinkInput,
      }),
    }).then((res) => this._checkStatus(res));
  }
}
