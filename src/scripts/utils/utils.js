//модуль с утилитарными функциями

import { selectors } from "./constants.js";

/*
//функция вывода ошибки в заданное поле.
export const showInputError = (inputElement, errorMessage, selectors) => {
  // const errorElement = formElement.querySelector(`#${inputElement.id}-error`); - вариант поиска по id
  //находим поле куда будем выводить ошибку
  const formSectionElement = inputElement.closest(selectors.formSection);
  const errorElement = formSectionElement.querySelector(
    selectors.errorsSelector
  );
  //указываем что в данное поле будет выводиться ошибка errorMessage
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.inputErrorSelector); //добавляем класс отвечающий за отображение ошибки
};

//функция скрывающая ошибку
export const hideInputError = (inputElement, selectors) => {
  // const errorElement = formElement.querySelector(`#${inputElement.id}-error`); -вариант поиска по id
  const formSectionElement = inputElement.closest(selectors.formSection);
  const errorElement = formSectionElement.querySelector(
    selectors.errorsSelector
  );

  errorElement.textContent = ""; //убираем отображение текста ошибки
  errorElement.classList.remove(selectors.inputErrorSelector); //удаляем класс отображающий ошибку
};
*/

/*

//функция для отключения кнопки submit. переводит кнопку в disabled и убирает класс, делающий кнопу активной
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
*/

/*//функция снимающая действие по умолчанию при нажатии на кнопку submit: при нажатии страница не перезагружается
export const handleDefaultSubmit = (evt) => {
  evt.preventDefault();
};*/
