/*дополнительный класс, который наследует от Popup
- работает с попапом, у которого только одна функция - подтверждения действия.
- при открытии попапа, передает принимает в качестве аргумента cardID
- по события на сабмите вызывает функцию колбек, отвечающую за удаление карточки
и передает в качестве аргумента cardID
*/

import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handlerSubmit) {
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;

    this._form = document.querySelector(popupSelector);
    this._submitBtn = this._form.querySelector(".form__submit-btn");
  }

  //при открытии передаем Id карточки для ее опознания
  open(cardId) {
    this._cardId = cardId;
    super.open();
  }

  //слушатель добавляем слушатель на сабмит формы для вызова колбэка
  setEventListener() {
    super.setEventListener();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlerSubmit(this._cardId);
    });
  }
}
