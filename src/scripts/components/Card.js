/*Скрипт для создания карточки

Project Mesto-Russia (Яндекс-Практикум)
*
* Version C-0.07.01a - 25.04.2021

- Создаем класс Card, который создаёт карточку с текстом и ссылкой на изображение

- В конструктор класса Card передаем в качестве аргумента объект с данными карточки, функция колбэк, которая подставляет
 значения полей (handleCardClick) и селектор template-элемента (cardSelector) из HTML разметки страницы;

- Прописываем приватные методы, которые работают с разметкой (_getTemplate) и устанавливают слушателей событий
(_setEventListener);

- Класс содержит приватные методы для каждого обработчиков по LIke (_handleLikeClick),
удалению карточки (_handleDeleteClick) и открытию полноформатного просмотра изображения (_handlePreviewPopupOpen);

- Содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.

- В модуль импортируются переменные, которые передают значения для объекта создания карточки пользователем:
ссылка на изображение (currentPicture) и название карточки (currentTitle). А также функция открытия попапа (openPopup) и
переменная с селектором открытия попапа просмотра изображения.
*/

//Класс для создания карточки
export default class Card {
  static selectors = {
    likeSelector: ".element__like",
    trashSelector: ".element__trash",
    imageSelector: ".element__image",
    titleSelector: ".element__title",
    likeCountSelector: ".element__count"
  };

  constructor({data, handleCardClick, handleDeleteCardClick, handleAddLike, handleDeleteLike}, cardSelector) {
    const { name, link, likes, _id, owner, currentUserID} = data; //пример реструктуризации
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._cardId = _id;
    this._currentUserID = currentUserID;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(Card.selectors.imageSelector);
    this._cardName = this._element.querySelector(Card.selectors.titleSelector);
    this._cardLike = this._element.querySelector(Card.selectors.likeSelector);
    this._likesCount = this._element.querySelector(Card.selectors.likeCountSelector);
    this._cardTrash = this._element.querySelector(Card.selectors.trashSelector);
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardLike.addEventListener("click", () => this._handleLikeClick());

    // this._cardTrash.addEventListener("click", () => this._handleDeleteClick());

    this._cardTrash.addEventListener("click", this._handleDeleteCardClick);

    this._cardImage.addEventListener("click", () => {
      this._handlePreviewPopupOpen(this._link, this._name);
    });
  }

  _handleLikeClick(data) {
    this._cardLike.classList.toggle("element__like_active");
    this._cardLike.classList.contains("element__like_active") ? this._handleAddLike() : this._handleDeleteLike()
  }


  deleteCard() {
    this._element.remove()
  }

  getId(){
    return this._cardId;
  }

  _handlePreviewPopupOpen = () => {
    this._handleCardClick(this._link, this._name);
  };

  //проверяем лайки на карточках и выводим количество на карточку
  _getCardLikes() {
    this._likes.forEach(like => {
      if(like._id === this._currentUserID) {
        this._cardLike.classList.add("element__like_active")
      }
    });
    this._likesCount.textContent = this._likes.length;
  }


  getLikes({data}, isLiked){
    if(isLiked) {
      this._likesCount.textContent = data.likes.length
    }
    this._likesCount.textContent = data.likes.length
  }


  generateCard = () => {
    this._setEventListeners();

    this._getCardLikes();

    this._cardImage.src = this._link;
    this._cardImage.alt = `Нам очень жаль что вы не можете увидеть эту 
	красивую фотографию этого удивительного места ${this._name}`;
    this._cardName.textContent = this._name;

    if(this._owner._id === this._currentUserID) {
      this._element.querySelector('.element__trash').classList.remove('element__trash_hidden')
    }

    return this._element;
  };
}
