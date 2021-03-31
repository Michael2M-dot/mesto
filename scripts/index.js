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
const openUserPopupBtn = document.querySelector('.profile__button-edit');
const closeUserPopupBtn = document.querySelector('#close-userPopup');
const openPlacePopupBtn = document.querySelector('.profile__button-add');
const closePlacePopupBtn = document.querySelector('#close-placePopup');
const formPlace = document.querySelector('#place-form');
const cardList = document.querySelector('.elements__list');// место куда добавляем карточку
const cardTemplate = document.querySelector('.element__template').content; //достаем шаблон из template
const closePreviewPicturePopupBtn = document.querySelector('#close-PicturePopup');
const popupPicturePreview = document.querySelector('#popup-picture');
const currentPicture = document.querySelector('.popup__image');
const currentTitle = document.querySelector('.popup__caption');
const placeName = document.querySelector('.form__place-name');
const placeLink = document.querySelector('.form__place-link');


// работем по карточкам
// оптимальный вариант

//функция создания новой карточек подгружает из массива
function insertCard(item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__title').textContent = item.name;
  cardElement.querySelector('.element__image').src = item.link;
  cardElement.querySelector('.element__image').alt = item.name;

  const likeButton = cardElement.querySelector('.element__like');
  likeButton.addEventListener('click', handleLikeElement);

  const deleteButton = cardElement.querySelector('.element__trash');
  deleteButton.addEventListener('click', handleDeleteCard);

  const openPreviewBtn = cardElement.querySelector('.element__image');
  openPreviewBtn.addEventListener('click', e => handlePreviewPicture(item));

  return cardElement;
}

function renderCard(item, isPrepend) {
  const element = insertCard(item);
  isPrepend ? cardList.prepend(element) : cardList.append(element);
}

initialCards.forEach(function (item) {
  renderCard(item);
});//проходим по массиву и создаем карточки

//сабмит для добавления карточек пользователя
function handleFormPlaceSubmit(evt) {
  evt.preventDefault();
  renderUserCard();
  closePopup(popupPlace);
};

//добавляем событие like
function handleLikeElement(evt) {
  evt.target.classList.toggle('element__like_active');
}

//добавляем событие для удаления карточки
function handleDeleteCard(evt) {
  evt.target.closest('.elements__list-item').remove();
};

//функция добавляет в превью фото картинки и название в попап просмотра изображения
function handlePreviewPicture(item) {
  openPopup(popupPicturePreview);
  currentPicture.src = item.link;
  currentTitle.textContent = item.name;
  currentPicture.alt = item.name;
}

//универсальная функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('page__popup_visible')
}

//универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('page__popup_visible');
}

//popup user-profile //функция открытия попапа c заполнение полей
function openUserPopup() {
  openPopup(popupUser);
  currentUserName.value = nameInput.textContent;
  currentUserJob.value = jobInput.textContent;
};

//функция кнопки Сохранить информацию о пользователе
function handleFormUserSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = currentUserName.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются
  jobInput.textContent = currentUserJob.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются
  closePopup(popupUser); //используем уже готовую функцию для закрытия попапа
}

//слушатели для попапа редактирования данных пользователя
openUserPopupBtn.addEventListener('click', openUserPopup);//слушатель для открытия попапа для редактирования профиля пользователя
closeUserPopupBtn.addEventListener('click', e => closePopup(popupUser));//слушатель для закрытия попапа
formUser.addEventListener('submit', handleFormUserSubmit); //слушатель для сохранеия формы.

//заведение новой карточки места
//добавлем карточки от пользователя.
function renderUserCard() {
  const item = {
    name: placeName.value,
    link: placeLink.value
  };
  renderCard(item, true);
}

//открытие popup places с обнулением полей
function openUserCardPopup() {
  openPopup(popupPlace);

  formPlace.reset();
}

//слушатели для попапа добавления карточек
openPlacePopupBtn.addEventListener('click', openUserCardPopup);
closePlacePopupBtn.addEventListener('click', e => closePopup(popupPlace));
formPlace.addEventListener('submit', handleFormPlaceSubmit);

//слушателя для попапа картинки
closePreviewPicturePopupBtn.addEventListener('click', e => closePopup(popupPicturePreview));
