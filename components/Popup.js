//отвечает за открытие и закрытие попапа.
/*
Создайте класс `Popup`, который отвечает за открытие и закрытие попапа.
Этот класс:
- Принимает в конструктор единственный параметр — селектор попапа.
- Содержит публичные методы `open` и `close`, которые отвечают за открытие и закрытие попапа.
- Содержит приватный метод `_handleEscClose`, который содержит логику закрытия попапа клавишей Esc.
- Содержит публичный метод `_setEventListeners`, который добавляет слушатель клика иконке закрытия попапа.
*/

// import {handleKeyboardCloseWindow} from "../utils/utils";
import {ESC} from "../utils/constants.js";

export default class Popup {

	constructor(popupSelector) {
		this._popupSelector = popupSelector;
		this._handleEscClose = this._handleEscClose.bind(this);
		this._popup = document.querySelector(this._popupSelector);
	}

	setEventListener(){
		this._popup.addEventListener ('click', (evt) => {
			if (
				evt.target.classList.contains("page__popup") ||
				evt.target.classList.contains("popup__button-close")
			) {
				this.close();
			}
		})
	}

	_handleEscClose(evt){
		// this._currentPopup = document.querySelector(".page__popup_visible");
		if (evt.key === ESC) {
			this.close();//чтобы не потерять контекст, можно либо стрелочную либо черз bind
		}
	}

	open() {
		this._popup.classList.add("page__popup_visible");
		document.addEventListener("keydown", this._handleEscClose)
	}

	close(){
		this._popup.classList.remove("page__popup_visible");
		document.removeEventListener("keydown", this._handleEscClose)
	}
}


/*
/универсальная функция открытия попапа
export function openPopup(popup) {
  popup.classList.add("page__popup_visible");
  document.addEventListener("keydown", handleKeyboardCloseWindow);
}

//универсальная функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove("page__popup_visible");
  document.removeEventListener("keydown", handleKeyboardCloseWindow);
}

//функция управляющая закрытием всех попапов как от нажатия кнопок так и по кликам на оверлее
export function handleMouseCloseWindow(popup, evt) {
  if (
    evt.target.classList.contains("page__popup") ||
    evt.target.classList.contains("popup__button-close")
  ) {
    closePopup(popup);
  }
}

//функция управляющая закрытием попапа по клику на клавиатуре
export function handleKeyboardCloseWindow(evt) {
  const currentPopup = document.querySelector(".page__popup_visible");
  if (evt.key === ESC) {
    closePopup(currentPopup);
  }
}
//универсальная функция которая запускает все закрытия попапов
popupWindows.forEach((popup) => {
  popup.addEventListener("click", (evt) => handleMouseCloseWindow(popup, evt));
});
*/
