/* Скрипт, для валидации форм
*
* Project Mesto-Russia (Яндекс-Практикум)
*
* Version V-0.07.01a - 25.04.2021
*
* Что нового (ver. V-0.07.01a):
*
* - проведен рефакторинг кода с образованием класса FormValidator;
*
* - класс FormValidator принимает в конструктор качестве аргументов объект настроек с селекторами (selectors) формы и
* элемент формы (formElement), которая валидируется;
*
* - содержит приватные методы которые обрабатывают форму: проверяют валидность поля (_checkInputValidity),
* изменяют состояние кнопки сабмита (_toggleButtonState), устанавливают все обработчики (_setEventListener);
*
* - содержит один публичный метод enableValidation, который включает валидацию формы.
*
* - в модуль FormValidator импортируется объект настроек с селекторами (selectors), функция отключающая дефолтное
* действие кномки сабмита (handleFormSubmit), функция отключения (handleSubmitButtonDisabled) и
* включения (handleSubmitButtonEnabled) кнопки сабмита, функция отображения (showInputError) и скрытия (hideInputError)
* ошибки при заполнении поля ввода. В качестве текста ошибок используются стандартные браузерные ошибки.
*
* - из модуля экспортируется в index.js класс FormValidator, который используется для валидации форм.
*
*
*
* Version V-0.06.01a - 13.04.2021
*
* Description.
* Скрипт осуществляет валидацию форм на стороне пользователя при их заполнении и улучшает UX при работе пользователя
* с формами на странице.
* Валидация использует стандратные API браузера для заполнения форм с их частичной стилизацией и доработкой.
* Произведена следующая доработка стандартных браузерных откликов.
*
* 1. Ошибки выводятся под строкой ввода.
*
* 2. Поле ввода подсвечивается по нижней границе в случае если пользователь ввел неверные или некорректные данные.
*
* 3. Ошибка появляется в момент ввода некоректных данных и исчезает когда данные корректны.
*
* 4. Валидация осуществляется в момент ввода данных в поле и отслеживает процесс ввод данных.
*
* 5. В случае если хотя бы одно поле формы, не соответствует по типу данных или условиям заполнения, происходит отключение
* кнопки с невозможностью отправить или загрузить некорректные данные.
*
*
* Michael2M (c) 2021
* email: darak.ltd@yandex.ru
* */



/*Создайте класс `FormValidator`, который настраивает валидацию полей формы:

- принимает в конструктор объект настроек с селекторами и классами формы;
- принимает вторым параметром элемент той формы, которая валидируется;
- имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
- имеет один публичный метод `enableValidation`, который включает валидацию формы.

 Для каждой проверяемой формы создайте экземпляр класса `FormValidator`.*/

import {selectors,
        handleFormSubmit,
        handleSubmitButtonDisabled,
        handleSubmitButtonEnabled,
        showInputError,
        hideInputError
        } from './index.js';


class FormValidator {

    constructor(formElement, selectors) {
        this._inputSelector = selectors.inputSelector,
        this._submitBtnSelector = selectors.submitBtnSelector,
        this._formElement = formElement
    }


    //проверяет валидность поля ввода. В качестве аргумента передаем само поле
    _checkInputValidity(inputElement) {
        // const inputElement = this._formElement.querySelector(this._inputSelector);
        const isInputNotValid = !inputElement.validity.valid;//проверяет свойство из API браузера
        const errorMessage = inputElement.validationMessage;/*в случае ошибки в валидации, присваиваем errorMessage
        стандартную фразу описание ошибки браузером*/

        //добавляем условие проверки и действия, выводим стандартную браузерную ошибку или скрываем
        isInputNotValid ? showInputError(inputElement, errorMessage, selectors) : hideInputError(inputElement, selectors);
    }


    /* функция меняющая состояние кнопки в зависимости от условия. В качестве аргументов передаем массив всех инпутов и
    * элемент кнопку, по которой будет происходить изменение состояния*/
    _toggleButtonState (inputList, buttonElement, selectors) {
        //функция которая ищет невалидное поле и в данном случае используюя (!) если поле не прошло валидацюи возврщаем false
        const findInvalidInput = ((inputElement) => !inputElement.validity.valid);

        /* функция которая определяет состояние полей ввода методом some. Данный метод проходит по всем элементам
        * массива inputList  и проверяет каждый элемент на валидность его полей, но в отличие от every останавливаетс
        * когда находит невалидное значениев совйстве validity.valid - и возвращает true если
        * хотябы один из атрибутов формы не прошел валидацию и false если все атрибуты формы прошли валадицюи*/
        const hasInvalidInput = inputList.some(findInvalidInput);

        //задаем усоловие, если есть невалидное поле, то меняем состояние кнопки и делаем ее не активной.
        hasInvalidInput ? handleSubmitButtonDisabled(buttonElement, selectors) : handleSubmitButtonEnabled(buttonElement, selectors)
    }

    //функция работает по элементам формы. на каждый элемент вешает обработчики
    _setEventListener() {
        //добавляет функцию на каждый элемент формы.
        this._formElement.addEventListener('submit', (evt) => handleFormSubmit(evt));

        //создаем массив из всех полей input в данной форме
        const inputElements = this._formElement.querySelectorAll(this._inputSelector);
        const inputList = Array.from(inputElements);
        //находим кнопку submit отвечающую за отправку формы.
        const buttonElement = this._formElement.querySelector(this._submitBtnSelector)

        //функция итератор, которая проходит по всем элеметам массива
        /*на каждый инпут из элемент массива всех инпутов в данной форме добавляем обработчкик события ввода input, в качестве
        аргумента передается сам элемент input*/
        const inputElementIterator = (inputElement) => {
            //функция вызывающая функции по событию
            const handleInput = () => {
                this._checkInputValidity(inputElement);//передаем аргументом поле ввода функции, отвечающей за проверку валидности
                this._toggleButtonState(inputList, buttonElement, selectors);/*передаем аргументом форму и кнопку, по которой нужно изменить
            состояние согласно функции*/
            }
            //добавляем слушателей на инпут и по событию вызываем функцию handleInput
            inputElement.addEventListener('input', () => handleInput());
        }

        //используя метод forEach проходим по массиву инпутов и вешаем обработчик события на событие ввода - input
        inputList.forEach((inputElement) => inputElementIterator(inputElement));

        /*передаем аргументом форму и кнопку, по которой нужно изменить состояние согласно функции для предварительной
        * проверки формы. Если при открытия формы уже имется неавалидные инпуты, передаем нужное состояние на кнопку.*/
        this._toggleButtonState(inputList, buttonElement, selectors);
    }


//проходим по всем формам и добавляет обработчик события setEventListener на каждую форму
    enableValidation() {
        this._setEventListener();
    }

}

export {FormValidator}


/*

//функция вывода ошибки в заданое поле.
const showInputError = (inputElement, errorMessage, selectors) => {
    // const errorElement = formElement.querySelector(`#${inputElement.id}-error`); - вариант поиска по id
    //находим поле куда будем выводить ошибку
    const formSectionElement = inputElement.closest(selectors.formSection);
    const errorElement = formSectionElement.querySelector(selectors.errorsSelector);
    //указываем что в данное поле будет выводиться ошибка errorMessage
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.inputErrorSelector);//добваляем класс отвечающий за отображение ошибки
}


//функция скрывающая ошибку
const hideInputError = (inputElement, selectors) => {
    // const errorElement = formElement.querySelector(`#${inputElement.id}-error`); -варинат поиска по id
    const formSectionElement = inputElement.closest(selectors.formSection);
    const errorElement = formSectionElement.querySelector(selectors.errorsSelector);

    errorElement.textContent = '';//убираем отображение текста ошибки
    errorElement.classList.remove(selectors.inputErrorSelector);//удаляем класс отображающий ошибку
}


//проверяет валидность поля ввода. В качестве аргумента передаем само поле
const checkInputValidity =  (inputElement, selectors) => {
    const isInputNotValid = !inputElement.validity.valid;//проверяет свойство из API браузера
    const errorMessage = inputElement.validationMessage;/!*в случае ошибки в валидации, присваиваем errorMessage
        стандартную фразу описание ошибки браузером*!/

    //добавляем условие проверки и действия, выводим стандартную браузерную ошибку или скрываем
    isInputNotValid ? showInputError(inputElement, errorMessage, selectors) : hideInputError(inputElement, selectors);
}


//функция добавляет классы и атрибуты на кнопку и делает ее неактивной
const handleSubmitButtonDisabled = (buttonElement, selectors) => {
    buttonElement.setAttribute('disabled', true,);
    buttonElement.classList.add(selectors.disabledBtnSelector);
}


// функция делающая кнопку активной убирает классы и атрибуты
const handleSubmitButtonEnabled = (buttonElement, selectors) => {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(selectors.disabledBtnSelector);
}


//функция которая ищет невалидное поле и в данном случае используюя (!) если поле не прошло валидацюи возврщаем false
const findInvalidInput = ((inputElement) => !inputElement.validity.valid);


/!* функция меняющая состояние кнопки в зависимости от условия. В качестве аргументов передаем массив всех инпутов и
* элемент кнопку, по которой будет происходить изменение состояния*!/
const toggleButtonState = (inputList, buttonElement, selectors) => {
    /!* функция которая определяет состояние полей ввода методом some. Данный метод проходит по всем элементам
    * массива inputList  и проверяет каждый элемент на валидность его полей, но в отличие от every останавливаетс
    * когда находит невалидное значениев совйстве validity.valid - и возвращает true если
    * хотябы один из атрибутов формы не прошел валидацию и false если все атрибуты формы прошли валадицюи*!/
    const hasInvalidInput = inputList.some(findInvalidInput);

    //задаем усоловие, если есть невалидное поле, то меняем состояние кнопки и делаем ее не активной.
    hasInvalidInput ? handleSubmitButtonDisabled(buttonElement, selectors) : handleSubmitButtonEnabled(buttonElement, selectors)
}


//функция работает по элементам формы. на каждый элемент вешает обработчики
const setEventListener = (formElement, selectors) => {
    //добавляет функцию на каждый элемент формы.
    formElement.addEventListener('submit', (evt) => handleFormSubmit(evt));

    //создаем массив из всех полей input в данной форме
    const inputElements = formElement.querySelectorAll(selectors.inputSelector);
    const inputList = Array.from(inputElements);
    //находим кнопку submit отвечающую за отправку формы.
    const buttonElement = formElement.querySelector(selectors.submitBtnSelector)

    //функция итератор, которая проходит по всем элеметам массива
    /!*на каждый инпут из элемент массива всех инпутов в данной форме добавляем обработчкик события ввода input, в качестве
    аргумента передается сам элемент input*!/
    const inputElementIterator = (inputElement) => {
        //функция вызывающая функции по событию
        const handleInput = () => {
            checkInputValidity(inputElement, selectors);//передаем аргументом поле ввода функции, отвечающей за проверку валидности
            toggleButtonState(inputList, buttonElement, selectors);/!*передаем аргументом форму и кнопку, по которой нужно изменить
            состояние согласно функции*!/
        }
        //добавляем слушателей на инпут и по событию вызываем функцию handleInput
        inputElement.addEventListener('input', handleInput);
    }

    //используя метод forEach проходим по массиву инпутов и вешаем обработчик события на событие ввода - input
    inputList.forEach(inputElementIterator);

    /!*передаем аргументом форму и кнопку, по которой нужно изменить состояние согласно функции для предварительной
    * проверки формы. Если при открытия формы уже имется неавалидные инпуты, передаем нужное состояние на кнопку.*!/
    toggleButtonState(inputList, buttonElement, selectors);
}


//проходим по всем формам и добавляет обработчик события setEventListener на каждую форму
const enableValidation = (selectors) => {
    //создаем массив из всех форм на странице
    const formElements = document.querySelectorAll(selectors.formSelector);
    const formList = Array.from(formElements);
    //методом forEach проходим по массиву всех форм и на каждую добавляем функцию обработчик события формы.
    formList.forEach((formElement) =>
        setEventListener(formElement, selectors));
}



enableValidation(selectors);
*/
