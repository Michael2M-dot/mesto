/*
Класс PopupWithImage, который наследует от Popup.
Этот класс должен перезаписывает родительский метод open()
В методе open класса PopupWithImage вставляем в попап картинку и атрибут src изображения.*/

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor (popupSelector){
		super(popupSelector);
		this._popupPlacePicture = this._popup.querySelector(".popup__image");
		this._popupPlaceName = this._popup.querySelector(".popup__caption");
	}

	open(link, name) {
		this._popupPlacePicture.src = link;
		this._popupPlaceName.textContent = name;
		this._popupPlacePicture.alt = `Нам очень жаль что вы не можете увидеть эту 
	красивую фотографию этого удивительного места ${name}`;

		super.open();
	}
}