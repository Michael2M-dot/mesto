/*
Project Mesto-Russia (Яндекс - Практикум)

Version 0.07a - 25.04.2021
Что нового (ver.0.07a):

- Добавлены классы Card и FormValidator, которые вынесены в отдельные файлы;

- Проведен рефакторинг кода по файлам JS с использованием import и export:

- Каждый класс экспортируется в index.js и создается прототип класса с одним публичным методом

- Selectors и переменные используемые в скрипте вынесены в constant.js.

- В класс Card - вынесен функционал создания картчки с обработчиками и приватными методами.

- Yтилитарные функции вынесены в отдельный файл utils.js.

- В модуль экспортируются данные из модулей:
 Card.js  -  класс Card,
 FormValidator.js - класс FormValidator,
 constants.js - переменные и селекторы,
 utils.js - утилитарные функции.



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

import { Card } from "./Card.js";

import { initialCards } from "./initial-cards.js";

import { FormValidator } from "./FormValidator.js";

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
  popupElements,
  ESC,
} from "./constants.js";

import {
  handleFormSubmit,
  openPopup,
  closePopup,
  handleMouseCloseWindow,
  handleKeyboardCloseWindow,
  hideInputError,
  showInputError,
  handleDisableButton,
} from "./utils.js";

function handleCardClick(link, name) {
  currentPicture.src = link;
  currentTitle.textContent = name;
  currentPicture.alt = `Нам очень жаль что вы не можете увидеть эту 
	красивую фотографию этого удивительного места ${name}`;
}

//функция создания карточки
const createCard = (cardClass, cardItem) => {
  const card = new cardClass(cardItem, handleCardClick, ".element__template");
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

//вспомагательная функция которая повторно вызывает hideInputError и скрывает вывод ошибок, когда форма закрывается без сохранения значений
const handleInputErrorsHide = (popup) => {
  //обнуляем поля ошибки при закрытии формы через вызов универсально функции hideInputError
  const inputElements = popup.querySelectorAll(selectors.formSection);
  inputElements.forEach((input) => hideInputError(input, selectors));
};

//функция проверки валидации полей формы.
const validateFormElement = (formElement) => {
  const formValidator = new FormValidator(formElement, selectors);

  formValidator.enableValidation();
};

//функции валидации попапов в глобально видимости
popupElements.forEach((popupElement) => {
  validateFormElement(popupElement);
});

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
