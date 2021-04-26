/*
Project Mesto-Russia (Яндекс - Практикум)

Version 0.07a - 25.04.2021
Что нового (ver.0.07a):

- Добавлены классы Card и FormValidator, которые вынесены в отедльные файлы;

- Проведен рефакторинг кода по файлам JS с использованием import и export:

- Каждый класс экспортируется в index.js и создается прототип класса с одним публичным методомю

- Selectors используемые в классе вынесены в index.js.

- В класс Card - вынесен функционал создания картчки с обработчиками.

- В модуль экспортируются данные из модуля Card.js (Card) FormValidator.js и (FormValidator).



Version 0.06a - 13.04.2021

Что нового (ver.0.06a):

-  Добавлена валидация форм, вынесена в отедельный скрипт FormValidator.js

- Произведен рефакторинг функции отвечающе за созание карточки, теперь события не вешаются на каждую карточку,
а отслеживаются по всплытию на родителе.

- Появилась возможность закрытие попапа через нажатие клавиши Esc или кликом по оверлею.

- Добавлена функция деактивирующая кнопку при повторном открытии попапа и функция удаляющая ошибку после закрытия поапа.


Version 0.05a - 30.03.2021
Description: Скрипт запускает:
1. Форму заполнения данных пользователя на сайте
По клику на иконке редактирования, открывается попап-форма, где доступны к заполнению поля Имени пользователя и его профессии
Нажатие на кнопку Сохранить, перезаписывает введеные значения в карточку пользователя на сайте

2. По умолчанию подгружате карточки с картинкой и названием. Исходный ряд в 6 карточек подгружается из массива в JS.

3. Добавляет слушателей на лайки и удаление карточек. На каждой карточке есть возможность ставить лайки и удалать карточку при нажатии на корзину.

4. Добавляет карточки пользователя на страницу. При клике на иконку добавления картинки, открывает попап и форму для добавления карточки на страницу. Карточка добавляется в начало ряда. Для добавления карточки в поля вводим название и URL (в теге <input>  установлени атрибуту url)

5. Открывает попап с превью на картинку. По клику на изображение открывает попап с полноформатным фото и подписью к нему.


Michael2M (c) 2021
email: darak.ltd@yandex.ru
*/

import {Card} from "./Card.js";

import {initialCards} from "./initial-cards.js";

import {FormValidator} from "./FormValidator.js";

import {
	selectors,
	formUser,
	nameInput,
	jobInput,
	userNameInput,
	userJobInput,
	openUserPopupBtn,
	closeUserPopupBtn,
	openPlacePopupBtn,
	popupUser,
	popupPlace,
	closePlacePopupBtn,
	popupWindows,
	cardList,
	popupPicturePreview,
	currentPicture,
	currentTitle,
	closePreviewPicturePopupBtn,
	formPlace,
	placeName,
	placeLink,
	ESC
} from "./constants.js"

import {
	handleFormSubmit,
	openPopup,
	closePopup
} from "./utils.js"

//функция создания карточки
const createCard = (cardClass, cardItem) => {
	const card = new cardClass(cardItem, ".element__template");
	const cardElement = card.generateCard();
	return cardElement;
};

//функция рендеринга карточек
function renderCard(cardCalss, cardItem, isPrepend) {
	const element = createCard(cardCalss, cardItem);
	isPrepend ? cardList.prepend(element) : cardList.append(element);
}

//функция автоматического рендеринга карточек на старнице
initialCards.forEach((cardItem) => {
	renderCard(Card, cardItem, false);
}); //проходим по массиву и создаем карточки

//Функция обработчик события на сабмите, которая добавляет элемент (карточка пользователя) в DOM
function handleFormPlaceSubmit(evt) {
	handleFormSubmit(evt);
	renderUserCard(Card);
	closePopup(popupPlace);
}

//Функция добавляющая новую карточки от пользователя.
function renderUserCard(cardClass) {
	const cardItem = {
		name: placeName.value,
		link: placeLink.value,
	};
	renderCard(cardClass, cardItem, true);
}

/*
//функция передающая значения по клику на изображении
function handleCardClick(item) {
	currentPicture.src = item.link,
		currentTitle.textContent = item.name,
		currentPicture.alt = item.name
}
*/


/*
//
function handlePreviewPopupOpen(item) {
  currentPicture.src = item.link;
  currentTitle.textContent = item.name;
  currentPicture.alt = item.name;
  openPopup(popupPicturePreview);
}
*/

/*

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
*/

///функция открытия попапа для заполнения данных пользователя c заполнение полей формы текущими занчениями
function openUserPopup(popup) {
	openPopup(popup);
	userNameInput.value = nameInput.textContent;
	userJobInput.value = jobInput.textContent;
	handleDisableButton(popup);
	handleInputErrorsHide(popup);
}

//открытие popup places с обнулением полей
function openUserCardPopup(popup) {
	openPopup(popup);
	formPlace.reset(popup);
	handleDisableButton(popup);
	handleInputErrorsHide(popup);
}

//функция кнопки Сохранить информацию о пользователе
function handleFormUserSubmit(evt) {
	handleFormSubmit(evt);
	nameInput.textContent = userNameInput.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются
	jobInput.textContent = userJobInput.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются
	closePopup(popupUser); //используем уже готовую функцию для закрытия попапа
}

//функция управляющая закрытием всех попапов как от нажатия кнопок так и по кликам на оверлее
function handleMouseCloseWindow(popup, evt) {
	if (
		evt.target.classList.contains("page__popup") ||
		evt.target.classList.contains("popup__button-close")
	) {
		closePopup(popup);
	}
}

//функция управляющая закрытием попапа по клику на клавиатуре
function handleKeyboardCloseWindow(evt) {
	const currentPopup = document.querySelector(".page__popup_visible");
	if (evt.key === ESC) {
		closePopup(currentPopup);
	}
}

//вспомагательная функция которая повторно вызывает hideInputError и скрывает вывод ошибок, когда форма закрывается без сохранения значений
const handleInputErrorsHide = (popup) => {
	//обнуляем поля ошибки при закрытии формы через вызов универсально функции hideInputError
	const inputElements = popup.querySelectorAll(selectors.formSection);
	inputElements.forEach((input) => hideInputError(input, selectors));
};

//функция для отключения кнопки submit. преводит кнопку в disabled  и убирает класс, делающий кнопу активной
const handleDisableButton = (popup) => {
	const submitButtons = popup.querySelectorAll(selectors.submitBtnSelector);
	submitButtons.forEach((buttonElement) =>
		handleSubmitButtonDisabled(buttonElement, selectors)
	);
};

//функция добавляет классы и атрибуты на кнопку и делает ее неактивной
const handleSubmitButtonDisabled = (buttonElement, selectors) => {
	buttonElement.setAttribute("disabled", true);
	buttonElement.classList.add(selectors.disabledBtnSelector);
};

// функция делающая кнопку активной убирает классы и атрибуты
const handleSubmitButtonEnabled = (buttonElement, selectors) => {
	buttonElement.removeAttribute("disabled");
	buttonElement.classList.remove(selectors.disabledBtnSelector);
};


//функция проверки валидации полей формы.
const validateFormElement = (formElement) => {
	const formValidator = new FormValidator(formElement, selectors);

	formValidator.enableValidation();
};

//функции валидации попапов в глобально видимости
validateFormElement(popupUser);
validateFormElement(popupPlace);


//функция вывода ошибки в заданое поле.
const showInputError = (inputElement, errorMessage, selectors) => {
	// const errorElement = formElement.querySelector(`#${inputElement.id}-error`); - вариант поиска по id
	//находим поле куда будем выводить ошибку
	const formSectionElement = inputElement.closest(selectors.formSection);
	const errorElement = formSectionElement.querySelector(
		selectors.errorsSelector
	);
	//указываем что в данное поле будет выводиться ошибка errorMessage
	errorElement.textContent = errorMessage;
	errorElement.classList.add(selectors.inputErrorSelector); //добваляем класс отвечающий за отображение ошибки
};

//функция скрывающая ошибку
const hideInputError = (inputElement, selectors) => {
	// const errorElement = formElement.querySelector(`#${inputElement.id}-error`); -варинат поиска по id
	const formSectionElement = inputElement.closest(selectors.formSection);
	const errorElement = formSectionElement.querySelector(
		selectors.errorsSelector
	);

	errorElement.textContent = ""; //убираем отображение текста ошибки
	errorElement.classList.remove(selectors.inputErrorSelector); //удаляем класс отображающий ошибку
};


//универсальная функция которая запускает все закрытия попапов
popupWindows.forEach((popup) => {
	popup.addEventListener("click", (evt) => handleMouseCloseWindow(popup, evt));
});

//слушатели для попапа добавления карточек
openPlacePopupBtn.addEventListener("click", () =>
	openUserCardPopup(popupPlace)
);
formPlace.addEventListener("submit", handleFormPlaceSubmit);

//слушатели для попапа редактирования данных пользователя
openUserPopupBtn.addEventListener("click", () => openUserPopup(popupUser)); //слушатель для открытия попапа для редактирования профиля пользователя
formUser.addEventListener("submit", handleFormUserSubmit); //слушатель для сохранеия формы.

export {
	currentPicture,
	currentTitle,
	popupPicturePreview,
	openPopup,
	handleFormSubmit,
	selectors,
	handleSubmitButtonDisabled,
	handleSubmitButtonEnabled,
	showInputError,
	hideInputError,
	handleKeyboardCloseWindow
};
