/*
## Создайте класс `UserInfo`

Класс `UserInfo` отвечает за управление отображением информации о пользователе на странице. Этот класс:
- Принимает в конструктор объект с селекторами двух элементов:
элемента имени пользователя и элемента информации о себе.
- Содержит публичный метод `getUserInfo`, который возвращает объект с данными пользователя.
Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
- Содержит публичный метод `setUserInfo,` который принимает новые данные пользователя и добавляет их на страницу.
	*/

export default  class UserInfo {
	constructor({userNameSelector, userJobSelector}) {
		this._userNameSelector = document.querySelector(userNameSelector);
		this._userJobSelector = document.querySelector(userJobSelector);
	}

	getUserInfo = (userName, userJob) => {
		userName.value = this._userNameSelector.textContent;
		userJob.value = this._userJobSelector.textContent;
	}

	setUserInfo(data){
		const {userNameInput, userJobInput} = data;
		this._userNameSelector.textContent = userNameInput;
		this._userJobSelector.textContent = userJobInput;
	}
}
