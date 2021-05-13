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

import './pages/index.css';

import Card from "./scripts/components/Card.js";

import { initialCards } from "./scripts/utils/initial-cards.js";

import FormValidator from "./scripts/components/FormValidator.js";

import Section from "./scripts/components/Section.js";

import {
  selectors,
  formUser,
  nameInput,
  jobInput,
  userNameInput,
  userJobInput,
  openUserPopupBtn,
  addUserCardBtn,
  popupUser,
  popupPlace,
  cardListSection,
  formPlace,
  placeName,
  placeLink,
  popupElements,
} from "./scripts/utils/constants.js";

import {
  handleDefaultSubmit,
  hideInputError,
  showInputError,
  handleDisableButton,
} from "./scripts/utils/utils.js";

import PopupWithImage from "./scripts/components/PopupWithImage.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import UserInfo from "./scripts/components/UserInfo.js";


//создаем карточку из класса Card
const createCard = (data) => {
  const card = new Card(data, '#cards-template', handleCardClick);
  return card.generateCard();
};

//обращаемся к классу section и выводим на страницу начальный массив данных
const cardList = new Section({
      items: initialCards,
      renderer: (data) => {
        cardList.addItem(createCard(data), false);
      }},
    cardListSection
);
//вывели начальный массив карточек
cardList.renderItems();


//инициализируем попап для картинки из класса PopupWithImage
const popupWithImage = new PopupWithImage("#picture-popup");
popupWithImage.setEventListener();

// открываем попап с картинокй (передаем даннные изображения для его отображения в полном размере)
function handleCardClick(link, name) {
  popupWithImage.open(link, name)
};


//< ----------блок создания попапа для добавления карточки-------->
//инстант попап добавления карточки пользователя
const addCardPopup = new PopupWithForm('#add-place', addPlaceSubmitHandler);
addCardPopup.setEventListener();

//Функция обработчик события на сабмите, которая добавляет элемент (карточка пользователя) в DOM
function addPlaceSubmitHandler(data) {

  const cardData = {
    name: data.placeNameInput,
    link: data.placeLinkInput};

  cardList.addItem(createCard(cardData), true);
  addCardPopup.close();
};

// слушатели для попапа добавления карточек
addUserCardBtn.addEventListener("click", () => {
      addCardPopup.open();
      handleDisableButton(formPlace);
      handleInputErrorsHide(formPlace);
    }
);



//< ----------блок создания и вызова попапа редакитрования данных о пользователе--------->
//создаем инстант и получаем данные имени пользователя и его работы
const userInfo = new UserInfo({
  userNameSelector:".profile__user-name",
  userJobSelector: ".profile__user-job"});
//инстант попапа редактирования данных пользователя
const editProfilePopup = new PopupWithForm('#edit-profile', editProfileSubmitHandler);
editProfilePopup.setEventListener();

//функция кнопки Сохранить информацию о пользователе
function editProfileSubmitHandler(data) {
  userInfo.setUserInfo(data)
  editProfilePopup.close();
};

//слушатель кнопки открытия попапа редактирования данных о пользователе
openUserPopupBtn.addEventListener('click', () => {
  editProfilePopup.open();
  userInfo.getUserInfo(userNameInput, userJobInput);
  handleDisableButton(formUser);
  handleInputErrorsHide(formUser);
});


// <---------Блок валадиции форм ---------->
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
