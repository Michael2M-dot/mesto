//отвечает за открытие и закрытие попапа.
/*
Класс `Popup`, отвечает за открытие и закрытие попапа. Он ен используется на прямую, от него будут
наследоваться другие классы.
Этот класс:
- Принимает в конструктор единственный параметр — селектор попапа - popupSelector
- Содержит публичные методы `open` и `close`, которые отвечают за открытие и закрытие попапа.
- Содержит приватный метод `_handleEscClose`, который содержит логику закрытия попапа клавишей Esc.
- Содержит публичный метод `_setEventListeners`, который добавляет слушатель клика иконке закрытия попапа.
*/

import { ESC } from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popup = document.querySelector(this._popupSelector);
  }

  setEventListener() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("page__popup") ||
        evt.target.classList.contains("popup__button-close")
      ) {
        this.close();
      }
    });
  }

  _handleEscClose(evt) {
    if (evt.key === ESC) {
      this.close(); //чтобы не потерять контекст, можно либо стрелочную либо черз bind
    }
  }



  open() {
    this._popup.classList.add("page__popup_visible");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("page__popup_visible");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
