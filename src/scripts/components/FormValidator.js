/* Скрипт, для валидации форм
 *
 * Project Mesto-Russia (Яндекс-Практикум)
 *
 * Version V-0.07.01a - 25.05.2021
 * Что нового (ver. V-0.07.01a):
 * - удалены импорты функций скрытия ошибок валидации, все функции добавлены в методы класса
 * - проведен рефакторинг кода.
 *
 *
 * Version V-0.07.01a - 25.04.2021
 * Что нового (ver. V-0.07.01a):
 * - проведен рефакторинг кода с образованием класса FormValidator;
 * - класс FormValidator принимает в конструктор в качестве аргументов объект настроек с селекторами (selectors) формы и
 * элемент формы (formElement), которая валидируется;
 * - содержит приватные методы, которые обрабатывают форму: проверяют валидность поля (_checkInputValidity),
 * изменяют состояние кнопки сабмита (_toggleButtonState), устанавливают все обработчики (_setEventListener);
 * - содержит один публичный метод enableValidation, который включает валидацию формы.
 * - в модуль FormValidator импортируется объект настроек с селекторами (selectors), функция отключающая дефолтное
 * действие кнопки Submit (handleFormSubmit), функция отключения (handleSubmitButtonDisabled) и
 * включения (handleSubmitButtonEnabled) кнопки Submit, функция отображения (showInputError) и скрытия (hideInputError)
 * ошибки при заполнении поля ввода. В качестве текста ошибок используются стандартные браузерные ошибки.
 * - из модуля экспортируется в index.js класс FormValidator, который используется для валидации форм.
 *
 *
 * Version V-0.06.01a - 13.04.2021
 * Description.
 * Скрипт осуществляет валидацию форм на стороне пользователя при их заполнении и улучшает UX при работе пользователя
 * с формами на странице.
 * Валидация использует стандартные API браузера для заполнения форм с их частичной стилизацией и доработкой.
 * Произведена следующая доработка стандартных браузерных откликов.
 * 1. Ошибки выводятся под строкой ввода.
 * 2. Поле ввода подсвечивается по нижней границе в случае если пользователь ввел неверные или некорректные данные.
 * 3. Ошибка появляется в момент ввода некорректных данных и исчезает когда данные корректны.
 * 4. Валидация осуществляется в момент ввода данных в поле и отслеживает процесс ввод данных.
 * 5. В случае если хотя бы одно поле формы, не соответствует по типу данных или условиям заполнения, происходит отключение
 * кнопки с невозможностью отправить или загрузить некорректные данные.
 *
 *
 * Michael2M (c) 2021
 * email: darak.ltd@yandex.ru
 * */


import { selectors } from "../utils/constants.js";

export default class FormValidator {

  constructor(formElement, selectors) {
    this._submitBtnSelector = selectors.submitBtnSelector;
    this._formElement = formElement;
    this._inputElements = this._formElement.querySelectorAll(".form__input");
    this._inputList = Array.from(this._inputElements);
    this._buttonElement = this._formElement.querySelector(this._submitBtnSelector);
  }


  //проверяет валидность поля ввода. В качестве аргумента передаем само поле
  _checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid; //проверяет свойство из API браузера
    const errorMessage =
      inputElement.validationMessage; /*в случае ошибки в валидации, присваиваем errorMessage
        стандартную фразу описание ошибки браузером*/

    //добавляем условие проверки и действия, выводим стандартную браузерную ошибку или скрываем
    isInputNotValid
      ? this._showInputError(inputElement, errorMessage)
      : this._hideInputError(inputElement);
  }


  //приватный метод отображения ошибки поля ввода.
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.inputErrorSelector); //добавляем класс отвечающий за отображение ошибки
  };


  //приватный метод скрытия ошибки поля ввода.
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = ""; //убираем отображение текста ошибки
    errorElement.classList.remove(selectors.inputErrorSelector); //удаляем класс отображающий ошибку
  };


  /* функция меняющая состояние кнопки в зависимости от условия. В качестве аргументов передаем массив всех инпутов и
   * элемент кнопку, по которой будет происходить изменение состояния*/
  _toggleButtonState() {
    //функция, которая ищет невалидное поле и в данном случае используются (!) если поле не прошло валидации возвращаем false
    const findInvalidInput = (inputElement) => !inputElement.validity.valid;

    /* функция, которая определяет состояние полей ввода методом some. Данный метод проходит по всем элементам
     * массива inputList и проверяет каждый элемент на валидность его полей, но в отличие от every останавливается
     * когда находит невалидное значение в свойстве validity.valid - и возвращает true если
     * хотя бы один из атрибутов формы не прошел валидацию и false если все атрибуты формы прошли валидацию*/
    const hasInvalidInput = this._inputList.some(findInvalidInput);

    //задаем условие, если есть невалидное поле, то меняем состояние кнопки и делаем ее неактивной.
    hasInvalidInput
      ? this.handleSubmitButtonDisabled()
      : this._handleSubmitButtonEnabled();
  }


  //публичный метод класса, который переводит submit формы в disabled
  handleSubmitButtonDisabled () {
    this._buttonElement.setAttribute("disabled", true);
    this._buttonElement.classList.add(selectors.disabledBtnSelector);
  };


  // приватный метод класса, который переводит submit формы в состояние active
  _handleSubmitButtonEnabled (){
    this._buttonElement.removeAttribute("disabled");
    this._buttonElement.classList.remove(selectors.disabledBtnSelector);
  };


  //приватный метод для элементов формы. на каждый элемент вешает обработчики события
  _setEventListener() {
    //добавляет функцию на каждый элемент формы.
    this._formElement.addEventListener("submit", (evt) =>
      evt.preventDefault()
    );

    //функция итератор, которая проходит по всем элементам массива
    /*на каждый инпут из элементов массива всех инпутов в данной форме добавляем обработчик события ввода input, в качестве
			аргумента передается сам элемент input*/
    const inputElementIterator = (inputElement) => {
      //функция вызывающая функции по событию
      const handleInput = () => {
        this._checkInputValidity(inputElement); //передаем аргументом поле ввода функции, отвечающей за проверку валидности
        this._toggleButtonState(); /*передаем аргументом форму и кнопку, по которой нужно изменить
            состояние согласно функции*/
      };
      //добавляем слушателей на инпуты и по событию вызываем функцию handleInput
      inputElement.addEventListener("input", () => handleInput());
    };

    //используя метод forEach проходим по массиву инпутов и вешаем обработчик события на событие ввода - input
    this._inputList.forEach((inputElement) => inputElementIterator(inputElement));

    /*передаем аргументом форму и кнопку, по которой нужно изменить состояние согласно функции для предварительной
     * проверки формы. Если при открытии формы уже имеются невалидные инпуты, передаем нужное состояние на кнопку.*/
    this._toggleButtonState();
    // this._toggleButtonState(this._inputList, this._buttonElement, selectors);
  }


  //публичный метод скрывающий ошибки валидации
  hideErrors() {
    this._inputList.forEach((inputElement) => this._hideInputError(inputElement))
  }


  //проходим по всем формам и добавляет обработчик события setEventListener на каждую форму
  enableValidation() {
    this._setEventListener();
  }
}
