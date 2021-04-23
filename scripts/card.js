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
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeClick();
        });
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleDeleteClick();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handlePreviewPopupOpen();
        });
    };

    _handleLikeClick() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    };

    _handleDeleteClick() {
        this._element.querySelector('.element__trash').closest('.elements__list-item').remove();
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

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    };
};

export {Card}