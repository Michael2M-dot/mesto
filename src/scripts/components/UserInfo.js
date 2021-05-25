/*
Класс `UserInfo` отвечает за управление отображением информации о пользователе на странице:
- Принимает в конструктор объект с селекторами двух элементов:
элемента имени пользователя и элемента информации о себе.
- Содержит публичный метод `getUserInfo`, который возвращает объект с данными пользователя.
Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
- Содержит публичный метод `setUserInfo,` который принимает новые данные пользователя и добавляет их на страницу.
*/

export default class UserInfo {
  constructor({
    userNameSelector,
    userJobSelector,
    userAvatarSelector,
    userID,
  }) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userJobSelector = document.querySelector(userJobSelector);
    this._userAvatarSelector = document.querySelector(userAvatarSelector);
    this._userId = userID;
  }

  getUserInfo() {
    return {
      userName: this._userNameSelector.textContent,
      userJob: this._userJobSelector.textContent,
      userId: this._userId,
    };
  }

  setUserInfo(data, userID) {
    const { name, about, avatar } = data;
    if (name) {
      this._userNameSelector.textContent = name;
    }
    if (about) {
      this._userJobSelector.textContent = about;
    }
    if (avatar) {
      this._userAvatarSelector.style.backgroundImage = `url(${avatar})`;
    }
    this._userId = userID;
  }
}
