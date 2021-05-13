/*
Класс PopupWithImage, который наследует от Popup.
Этот класс должен перезаписывает родительский метод open()
В методе open класса PopupWithImage вставляем в попап картинку и атрибут src изображения.*/

import Popup from "./Popup.js";
// import {currentPicture, currentTitle} from "../utils/constants.js";


export default class PopupWithImage extends Popup {
	constructor (popupSelector){
		super(popupSelector);
	}

	open(link, name) {
		this._popup.querySelector(".popup__image").src = link;
		this._popup.querySelector(".popup__caption").textContent = name;
		this._popup.querySelector(".popup__image").alt = `Нам очень жаль что вы не можете увидеть эту 
	красивую фотографию этого удивительного места ${name}`;

		super.open();
	}
}