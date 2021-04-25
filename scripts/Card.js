/*Скрипт для созданич карточки

Project Mesto-Russia (Яндекс-Практикум)
*
* Version C-0.07.01a - 25.04.2021

- Создаем класс Card, который создаёт карточку с текстом и ссылкой на изображение

- В конструктор класса Card передаем в качестве аргумента объект с данными карточки  и селектор template-элемента
 из HTML страницы;

- Прописываем приватные методы, которые работают с разметкой (_getTemplate) и устанавливают слушателей событий
(_setEventListener);

- Класс содержит приватные методы для каждого обработчиков по LIke (_handleLikeClick),
удалению карточки (_handleDeleteClick) и  и открытию полнформатного просмотра изображения (_handlePreviewPopupOpen);

- Содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.

- В модуль импортируются переменные которые передают значения для объекта создания карточки пользователем:
ссылка на изображение (currentPicture) и название карточки (currentTitle). А также функция открытия попапа (openPopup) и
переменная с селектром открытия поапа просмотра изображения.


*/

import {currentPicture, currentTitle, openPopup, popupPicturePreview} from './index.js';

//Класс для создания карточки
class Card {

    static  selectors = {
        likeSelector: '.element__like',
        trashSelector: '.element__trash',
        imageSelector: '.element__image',
        titleSelector: '.element__title'
    }

    constructor(cardItem, cardSelector) {
        this._name = cardItem.name;
        this._link = cardItem.link;
        this._cardSelector = cardSelector
    };

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    };

    _setEventListeners() {
        this._element.querySelector(Card.selectors.likeSelector).addEventListener('click', () => {
            this._handleLikeClick();
        });
        this._element.querySelector(Card.selectors.trashSelector).addEventListener('click', () => {
            this._handleDeleteClick();
        });
        this._element.querySelector(Card.selectors.imageSelector).addEventListener('click', () => {
            this._handlePreviewPopupOpen();
        });
    };

    _handleLikeClick() {
        this._element.querySelector(Card.selectors.likeSelector).classList.toggle('element__like_active');
    };

    _handleDeleteClick() {
        this._element.querySelector(Card.selectors.trashSelector).closest('.elements__list-item').remove();
    };

    _handlePreviewPopupOpen() {
        currentPicture.src = this._link;
        currentTitle.textContent = this._name;
        currentPicture.alt = this._name;
        openPopup(popupPicturePreview);
    };

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector(Card.selectors.likeSelector).src = this._link;
        this._element.querySelector(Card.selectors.trashSelector).alt = this._name;
        this._element.querySelector(Card.selectors.titleSelector).textContent = this._name;

        return this._element;
    };
}

export {Card};