/*
Класс `PopupWithForm`, который наследует от `Popup`.
Этот класс:
- Кроме селектора попапа принимает в конструктор колбэк сабмита формы.- submitHandler -
Это сабмит, вызывает приватный метод _getInputValues
- Содержит приватный метод `_getInputValues`, который собирает данные всех полей формы.
- Перезаписываем родительский метод `_setEventListeners`.
Метод `_setEventListeners` класса `PopupWithForm` должен не только добавляет обработчик клика иконке закрытия,
но и добавляет обработчик сабмита формы. При сабмите на кнопку поапа, собираются данные всех полей инпутов.
- Перезаписываем родительский метод `close`, так как при закрытии попапа форма должна ещё и сбрасываться.
	`PopupWithForm`
Для каждого попапа создаваем свой экземпляр класса `PopupWithForm`.
*/

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._handleSubmit = submitHandler;
    this._submitBtn = document
      .querySelector(this._popupSelector)
      .querySelector(".form__submit-btn");
    this._inputList = Array.from(this._popup.querySelectorAll(".form__input"));
  }

  _getInputValues() {
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListener = () => {
    super.setEventListener();

    this._form = this._popup.querySelector(".form");

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this._handleSubmit(data);
    });
  };

  close() {
    this._form.reset();

    super.close();
  }
}

/*
//функция индикации загрузки улучшение UX
renderLoading(isLoading) {
  if (isLoading) {
    this._submitBtn
      .querySelector(".jumping-dots")
      .classList.remove("jumping-dots_visibility_hidden");

  }else{
    this._submitBtn
      .querySelector(".jumping-dots")
      .classList.add("jumping-dots_visibility_hidden");
  }
}*/
