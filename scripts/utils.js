//модуль с утилитарными функциями

import {
	handleKeyboardCloseWindow
} from "./index.js"


//функция снимающая действие по умолчанию при нажатии на кнопку submit: при нажатии страница не перезагружается
const handleFormSubmit = (evt) => {
	evt.preventDefault();
};

//универсальная функция открытия попапа
function openPopup(popup) {
	popup.classList.add("page__popup_visible");
	document.addEventListener("keydown", handleKeyboardCloseWindow);
}

//универсальная функция закрытия попапа
function closePopup(popup) {
	popup.classList.remove("page__popup_visible");
	document.removeEventListener("keydown", handleKeyboardCloseWindow);
}


export {
	handleFormSubmit,
	openPopup,
	closePopup
}

