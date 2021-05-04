//модуль с утилитарными функциями

import { ESC, selectors } from "./constants.js";

//функция снимающая действие по умолчанию при нажатии на кнопку submit: при нажатии страница не перезагружается
export const handleFormSubmit = (evt) => {
  evt.preventDefault();
};

//универсальная функция открытия попапа
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

//функция вывода ошибки в заданое поле.
export const showInputError = (inputElement, errorMessage, selectors) => {
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
export const hideInputError = (inputElement, selectors) => {
  // const errorElement = formElement.querySelector(`#${inputElement.id}-error`); -варинат поиска по id
  const formSectionElement = inputElement.closest(selectors.formSection);
  const errorElement = formSectionElement.querySelector(
    selectors.errorsSelector
  );

  errorElement.textContent = ""; //убираем отображение текста ошибки
  errorElement.classList.remove(selectors.inputErrorSelector); //удаляем класс отображающий ошибку
};

//функция для отключения кнопки submit. пtреводит кнопку в disabled и убирает класс, делающий кнопу активной
export const handleDisableButton = (popup) => {
  const submitButtons = popup.querySelectorAll(selectors.submitBtnSelector);
  submitButtons.forEach((buttonElement) =>
    handleSubmitButtonDisabled(buttonElement, selectors)
  );
};

//функция добавляет классы и атрибуты на кнопку и делает ее неактивной
export const handleSubmitButtonDisabled = (buttonElement, selectors) => {
  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.add(selectors.disabledBtnSelector);
};

// функция делающая кнопку активной убирает классы и атрибуты
export const handleSubmitButtonEnabled = (buttonElement, selectors) => {
  buttonElement.removeAttribute("disabled");
  buttonElement.classList.remove(selectors.disabledBtnSelector);
};
