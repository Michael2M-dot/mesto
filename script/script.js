/*
Project Mesto-Russia
Version 0.04a - 30.03.2021

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

// при вводе в сроке имени, меняем имя вывода на странице
// при вовде текста в строке должности, менем текст на странице 

const formUser = document.querySelector('#user-profile');
const nameInput = document.querySelector('.profile__user-name');
const jobInput = document.querySelector('.profile__user-job');
const currentUserName = document.querySelector('#user-name'); //получаем и записываем значение переменной из поля по id user-name
const currentUserJob = document.querySelector('#user-job'); //получаем и записываем значение переменной из поля по id user-job
const popupUser = document.querySelector('#edit-profile');
const popupPlace = document.querySelector('#add-place');
const openUserPopupBtn = document.querySelector('#profile-editBtn');
const closeUserPopupBtn = document.querySelector('#close-userPopup');
const openPlacePopupBtn =document.querySelector('.profile__button-add');
const closePlacePopupBtn = document.querySelector('#close-placePopup');
const formPlace = document.querySelector('#place-form');
const closePreviewPicturePopupBtn = document.querySelector('#close-PicturePopup');
const popupPicturePreview = document.querySelector('#picture-popup');
const currentPicture = document.querySelector('.popup__image');
const currentTitle = document.querySelector('.popup__caption');
const placeName = document.querySelector('#place-name');
const placeLink = document.querySelector('#place-link');


// работем по карточкам
// оптимальный вариант
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

//функция создания новой карточек подгружает из массива
const cardList = document.querySelector('.elements__list');// место куда добавляем карточку

function insertCard (item){
  const cardTemplate = document.querySelector('#cards-template').content; //достаем шаблон из template
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__title').textContent = item.name;
  cardElement.querySelector('.element__image').src = item.link;

  const likeButton = cardElement.querySelector('.element__like');
  likeButton.addEventListener('click', addLike);

  const deleteButton = cardElement.querySelector('.element__trash');
  deleteButton.addEventListener('click', deleteItemCard);

  const openPreviewBtn = cardElement.querySelector('.element__image');
  openPreviewBtn.addEventListener('click', e => openPreviewPicturePopop(item));

  return cardElement;
}

function renderCard(item, isPrepend) {
  const element = insertCard(item);
  isPrepend ? cardList.prepend(element) : cardList.append(element);
}

initialCards.forEach(function(item){
  renderCard(item);
});//проходим по массиву и создаем карточки

//сабмит для добавления карточек пользователя
function formPlaceSubmitHandler(evt) {
  evt.preventDefault();
  renderUserCard();
  closePopup(popupPlace);
};

//добавляем событие like
function addLike (evt){
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like_active');
}

//добавляем событие для удаления карточки
function deleteItemCard (evt) { 
  const eventTarget = evt.target;
  const placeItemCard = eventTarget.closest('.elements__list-item');
  placeItemCard.remove();
};

//функция добавляет в превью фото картинки и название в попап просмотра изображения
function openPreviewPicturePopop (item){
  openPopup(popupPicturePreview);
  currentPicture.src = item.link;
  currentTitle.textContent = item.name;
}

//универсальная функция закрытия попапа
function closePopup (elm){
  elm.classList.remove('page__popup_visible')
}

//универсальная функция открытия попапа
function openPopup(elm) {
  elm.classList.add('page__popup_visible');
}

//popup user-profile //функция открытия попапа c заполнение полей
function openUserPopup() {
  openPopup(popupUser);
  currentUserName.value = nameInput.textContent;
  currentUserJob.value = jobInput.textContent;
}; 

//функция кнопки Сохранить информацию о пользователе
function formUserSubmitHandler(evt){
  evt.preventDefault();
  nameInput.textContent = currentUserName.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются
  jobInput.textContent = currentUserJob.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются
  closePopup(popupUser); //используем уже готовую функцию для закрытия попапа
} 

//слушатели для попапа редактирования данных пользователя
openUserPopupBtn.addEventListener('click', openUserPopup);//слушатель для открытия попапа для редактирования профиля пользователя
closeUserPopupBtn.addEventListener('click', e => closePopup(popupUser));//слушатель для закрытия попапа
formUser.addEventListener('submit', formUserSubmitHandler); //слушатель для сохрания формы.

//заведение новой карточки места
//добавлем карточки от пользователя.
function renderUserCard (){
const item = {
    name: placeName.value,
    link: placeLink.value
  };
  renderCard(item, true);
}

//открытие popup places с обнулением полей
function openUserCardPopup() {
  openPopup(popupPlace);

  placeName.value = '';
  placeLink.value = '';
}

//слушатели для попапа добавления карточек
openPlacePopupBtn.addEventListener('click', openUserCardPopup);
closePlacePopupBtn.addEventListener('click', e => closePopup(popupPlace));
formPlace.addEventListener('submit', formPlaceSubmitHandler);

//слушателя для попапа картинки
closePreviewPicturePopupBtn.addEventListener('click', e => closePopup(popupPicturePreview));


// function insertCard (itemName, itemLink){
//   const cardTemplate = document.querySelector('#cards-template').content; //достаем шаблон из template
//   const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

//   cardElement.querySelector('.element__title').textContent = itemName;
//   cardElement.querySelector('.element__image').src = itemLink;

//   const likeButton = cardElement.querySelector('.element__like');
//   likeButton.addEventListener('click', addLike);

//   const deleteButton = cardElement.querySelector('.element__trash');
//   deleteButton.addEventListener('click', deleteItemCard);

//   const openPreviewBtn = cardElement.querySelector('.element__image');
//   openPreviewBtn.addEventListener('click', e => openPreviewPicturePopop(itemName, itemLink));

//   cardList.prepend(cardElement);
// }

// initialCards.forEach(function(item){
//   insertCard(item.name, item.link);
// });//проходим по массиву и создаем карточки
