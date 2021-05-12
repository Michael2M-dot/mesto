/*
## Создайте класс `PopupWithForm`
Создайте класс `PopupWithForm`, который наследует от `Popup`. Этот класс:
- Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
- Содержит приватный метод `_getInputValues`, который собирает данные всех полей формы.
- Перезаписывает родительский метод `_setEventListeners`.
Метод `_setEventListeners` класса `PopupWithForm` должен не только добавлять обработчик клика иконке закрытия,
но и добавлять обработчик сабмита формы.
- Перезаписывает родительский метод `close`, так как при закрытии попапа форма должна ещё и сбрасываться.
	`PopupWithForm`
Для каждого попапа создавайте свой экземпляр класса `PopupWithForm`.
*/

import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
	constructor(popupSelector, submitHandler) {
		super(popupSelector);
		this._handleSubmit = submitHandler;
	}

	_getInputValues() {
		const formValues = {};

		const inputList = Array.from(this._form.querySelectorAll('.form__input'));
		inputList.forEach(input => {
			formValues[input.name] = input.value;
		})

		return formValues;
	}

	setEventListener = () => {
		super.setEventListener();

		this._form = this._popup.querySelector('.form')

		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			const data = this._getInputValues()
			this._handleSubmit(data);
		})
	}

	close() {
		this._form.reset();

		super.close();
	}
}
