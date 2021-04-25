/*Скрипт длч созданич карточки

* Создает класс Card, который создаёт карточку с текстом и ссылкой на изображение:
    принимает в конструктор исходные данные картчки и селектор template-элемента из HTML страницы;
    содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
    содержит приватные методы для каждого обработчика;
    содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.

*/

import {currentPicture,
        currentTitle,
        popupPicturePreview,
        openPopup
   } from './index.js';

//Класс для создания карточки
class Card {

    static  selectors = {
        likeSelector: '.element__like',
        trashSelector: '.element__trash',
        imageSelector: '.element__image',
        titleSelector: '.element__title'
    }

    constructor(item, cardSelector) {
        this._name = item.name;
        this._link = item.link;
        this._cardSelector = cardSelector;


    };

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
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
};

export {Card};