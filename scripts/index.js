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

// const formUser = document.querySelector('.form__user');
const formUser = document.forms.userProfileForm;//форма для редактирования данных пользоватля
const nameInput = document.querySelector('.profile__user-name');
const jobInput = document.querySelector('.profile__user-job');
const userNameInput = formUser.elements.userNameInput;//переменная поля ввода имени для формы редактирования профиля пользователя
const userJobInput = formUser.elements.userJobInput;//переменная поля ввода професси для формы редактирования профиля пользователя
// const currentUserName = document.querySelector('.from__user-name'); //получаем и записываем значение переменной из поля по id user-name
// const currentUserJob = document.querySelector('.form__user-job'); //получаем и записываем значение переменной из поля по id user-job
const popupUser = document.querySelector('.popup__edit-profile');
const popupPlace = document.querySelector('.popup__add-place');

const openUserPopupBtn = document.querySelector('.profile__button-edit');
const closeUserPopupBtn = document.querySelector('#close-userPopup');
const openPlacePopupBtn = document.querySelector('.profile__button-add');
const userFormSubmitButton = document.querySelector('#user-submit');
const closePlacePopupBtn = document.querySelector('#close-placePopup');
// const formPlace = document.querySelector('.form__place');
const formPlace = document.forms.placeCardForm;//форма для добавления карточки
// const placeName = document.querySelector('.form__place-name');
const placeName = formPlace.elements.placeNameInput;//поле формы добавления карточки, нзвание места
// const placeLink = document.querySelector('.form__place-link');
const placeLink = formPlace.elements.placeLinkInput;//поле формы карточки, ссылка на фотографию места
const placeFromSubmitButton = formPlace.querySelector('#place-submit');

const cardList = document.querySelector('.elements__list');// место куда добавляем карточку
const cardTemplate = document.querySelector('.element__template').content; //достаем шаблон из template
const closePreviewPicturePopupBtn = document.querySelector('#close-PicturePopup');
const popupPicturePreview = document.querySelector('.popup__picture');

const currentPicture = document.querySelector('.popup__image');
const currentTitle = document.querySelector('.popup__caption');
// const placeName = document.querySelector('.form__place-name');
// const placeLink = document.querySelector('.form__place-link');
const popupWindows = document.querySelectorAll('.popup');//универсальная переменная всех поапов на старнице



// работем по карточкам
// оптимальный вариант

//функция создания новой карточек подгружает из массива
function createCard(item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  const placeImage = cardElement.querySelector('.element__image'); //это моя ошибка, alt я добавлял после ревью, ну и надо было самому додуматься, что строчка дублируется. 
  cardElement.querySelector('.element__title').textContent = item.name;
  placeImage.src = item.link;
  placeImage.alt = item.name;

  // const likeButton = cardElement.querySelector('.element__like');
  // likeButton.addEventListener('click', handleLikeElement);

  // const deleteButton = cardElement.querySelector('.element__trash');
  // deleteButton.addEventListener('click', handleDeleteCard);

  const openPreviewBtn = cardElement.querySelector('.element__image');
  openPreviewBtn.addEventListener('click', e => handlePreviewPicture(item));

  return cardElement;
}

// универсальный обработчик добавления лайка через делегирование и всплытие
cardList.addEventListener('click', function (evt, item) {
  const eventTarget = evt.target;
  if (eventTarget.classList.contains('element__like')) {
    eventTarget.classList.toggle('element__like_active');
  }
  if (eventTarget.classList.contains('element__trash')) {
    eventTarget.closest('.elements__list-item').remove();
  }
  // if (eventTarget.classList.contains('element__image')) {
  //   handlePreviewPicture(evt, item);
  // } - дописать слушатель для делегирования по картинке
})

//функция добавления карточки на страницу
function renderCard(item, isPrepend) {
  const element = createCard(item);
  isPrepend ? cardList.prepend(element) : cardList.append(element);
}

//функция автоматического рендеринга карточек на старнице
initialCards.forEach(function (item) {
  renderCard(item);
});//проходим по массиву и создаем карточки

//сабмит для добавления карточек пользователя
function handleFormPlaceSubmit(evt) {
  evt.preventDefault();
  renderUserCard();
  closePopup(popupPlace);
};

//добавляем событие like - перенесена в универсальное делегирование и всплытие
// function handleLikeElement(evt) {
//   evt.target.classList.toggle('element__like_active');
// }

//добавляем событие для удаления карточки
// function handleDeleteCard(evt) {
//   evt.target.closest('.elements__list-item').remove();
// };

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

//функция для обработчика закрытия попапов для всех кнопок закрытия и для все поапов
function handleCloseWindow(popup, evt) {
  const eventTarget = evt.target;
  // const escTarget = evt.ketDown;
  if (eventTarget.classList.contains('popup') ||
    eventTarget.classList.contains('popup__button-close')) {
    closePopup(popup);
  }
};

//универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('page__popup_visible');
}

//popup user-profile //функция открытия попапа c заполнение полей
function openUserPopup() {
  openPopup(popupUser);
  userNameInput.value = nameInput.textContent;
  userJobInput.value = jobInput.textContent;
};

//функция кнопки Сохранить информацию о пользователе
function handleFormUserSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = userNameInput.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются
  jobInput.textContent = userJobInput.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются
  closePopup(popupUser); //используем уже готовую функцию для закрытия попапа
}

//универсальная функция проверки состояния валидности формы для активации кнопки сохранить
function setSubmitButtonState(submitButton, isFormValid){
  if (isFormValid){
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('form__submit-btn_disabled')
  } else {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('form__submit-btn_disabled');
  }
}


// слушатель для инпутов попапа добавления карточки пользователя
formUser.addEventListener('input', function (evt){
  const isValid = userNameInput.value.length > 2 && userNameInput.value.length < 40  && userJobInput.value.length > 2 && userJobInput.value.length < 200;
  setSubmitButtonState(userFormSubmitButton, isValid);
});

//слушатель для инпута картинки
formPlace.addEventListener('input', function (evt) {
  const isValid = placeName.value.length > 1 && placeName.value.length < 30 && placeLink.value.length > 2;
  setSubmitButtonState(placeFromSubmitButton, isValid);
});


//универсальная функция которая запускает все закрытия попапов
popupWindows.forEach((popup) => {
  popup.addEventListener('click', e => (handleCloseWindow(popup, e)))
});


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

//слушатели для попапа редактирования данных пользователя
openUserPopupBtn.addEventListener('click', openUserPopup);//слушатель для открытия попапа для редактирования профиля пользователя
formUser.addEventListener('submit', handleFormUserSubmit); //слушатель для сохранеия формы.

//слушатели для попапа добавления карточек
openPlacePopupBtn.addEventListener('click', openUserCardPopup);
formPlace.addEventListener('submit', handleFormPlaceSubmit);




//слушателя для попапа картинки
// popupPicturePreview.addEventListener('click', e => (handleCloseWindow(popupPicturePreview, e)));
// popupPlace.addEventListener('click', e => (handleCloseWindow(popupPlace, e)));
// popupUser.addEventListener('click', e => (handleCloseWindow(popupUser, e)));