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
    userId,
  }) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userJobSelector = document.querySelector(userJobSelector);
    this._userAvatarSelector = document.querySelector(userAvatarSelector);
    this._userId = userId;
  }

  /*
  getUserInfo = (userName, userJob) => {
    userName.value = this._userNameSelector.textContent;
    userJob.value = this._userJobSelector.textContent;
  };
*/

  getUserInfo() {
    return {
      userName: this._userNameSelector.textContent,
      userJob: this._userJobSelector.textContent,
      // userAvatar.style.backgroundImage = this._userAvatarSelector.style.backgroundImage,
      userId: this._userId,
    };
  }

  // setUserInfo(data) {
  //   const { userNameInput, userJobInput } = data;
  //   this._userNameSelector.textContent = userNameInput;
  //   this._userJobSelector.textContent = userJobInput;
  // }

  setUserInfo(data) {
    if (data.name) {
      this._userNameSelector.textContent = data.name;
    }
    if (data.about) {
      this._userJobSelector.textContent = data.about;
    }
    if (data.avatar) {
      this._userAvatarSelector.style.backgroundImage = `url(${data.avatar})`;
    }
    if (data._id) {
      this._userId = data._id;
    }
  }
}
