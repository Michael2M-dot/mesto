/*
Project Mesto-Russia
Version 0.02a - 19.03.2021

Description: Скрипт отвечает за форму заполнения данных пользователя на сайте
По клику на иконке редактирования, открывается попап-форма, где доступны к заполнению поля Имени пользователя и его профессии
Нажатие на кнопку Сохранить, перезаписывает введеные значения в карточку пользователя на сайте

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
const placeName = document.querySelector('#place-name');
const placeLink = document.querySelector('#place-link');
const formPlace = document.querySelector('#place-form');
const closePicturePopupBtn = document.querySelector('#close-PicturePopup');
const popupPicture = document.querySelector('#picture-popup');


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

const cardTemplate = document.querySelector('#cards-template').content; //достаем шаблон из template
const cardList = document.querySelector('.elements__list');


//функция создания новой карточек подгружает из массива
function insertCard (item){
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementName = cardElement.querySelector('.element__title');
  const cardElementLink = cardElement.querySelector('.element__image');
  const likeButton = cardElement.querySelector('.element__like');
  const deleteButton = cardElement.querySelector('#delete-Btn');

  cardElementName.textContent = item.name;
  cardElementLink.src = item.link;

  addLike(likeButton);

  deleteItemCard(deleteButton);

  cardAppend(cardElement);

}

function addLike (elm){
  elm.addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like_active');
  });
}//добавляем событие для like

function deleteItemCard (elm) {
  elm.addEventListener('click', (evt) => { 
    const placeItemCard = elm.closest('.elements__list-item');
    placeItemCard.remove();
  });
};//добавляем событие для удаления карточки

function cardAppend (elm){
  cardList.append(elm);
};//добавляет карточку в конец

function cardPrepend(elm){
  cardList.prepend(elm)
};//добавлет карточку в начало

initialCards.forEach(function(elm){
  insertCard(elm);
});//проходим по массиву и создаем карточки


//popup user-profile
function openUserPopup() {
  popupUser.classList.add('page__popup_visible');
  currentUserName.value = nameInput.textContent;
  currentUserJob.value = jobInput.textContent;
}; //функция открытия попапа

function closeUserPopup() {
  popupUser.classList.remove('page__popup_visible'); 
};

function formUserSubmitHandler(evt){
  evt.preventDefault();
  nameInput.textContent = currentUserName.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются
  jobInput.textContent = currentUserJob.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются
  closeUserPopup(); //используем уже готовую функцию для закрытия попапа
} //функция кнопки Сохранить.

//слушатели для попапа редактирования пользователя
openUserPopupBtn.addEventListener('click', openUserPopup);//слушатель для открытия попапа для редактирования профиля пользователя
closeUserPopupBtn.addEventListener('click', closeUserPopup);//слушатель для закрытия попапа
formUser.addEventListener('submit', formUserSubmitHandler); //слушатель для сохрания формы.



//заведение новой карточки места
//открытие popup places
function openPlacePopup() {
  popupPlace.classList.add('page__popup_visible');
  placeName.value = '';
  placeLink.value = '';
}

//закрытие popup places
function closePlacePopup() {
  popupPlace.classList.remove('page__popup_visible');
}

//функция обработчик нажатия кнопки Создать 
function formPlaceSubmitHandler(evt) {
  evt.preventDefault();
  addPlace();
  closePlacePopup();
};

//функция добавления новой картинки на страницу
function addPlace (){
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector('.element__like');
  const deleteButton = cardElement.querySelector('#delete-Btn');

  cardElement.querySelector('.element__image').src= placeLink.value;
  cardElement.querySelector('.element__title').textContent = placeName.value;

  addLike(likeButton);

  deleteItemCard(deleteButton);

  cardPrepend(cardElement);
}

//слушатели для попапа добавления карточек
openPlacePopupBtn.addEventListener('click', openPlacePopup);
closePlacePopupBtn.addEventListener('click', closePlacePopup);
formPlace.addEventListener('submit', formPlaceSubmitHandler);



// const oppenPictirePopupBtn = document.querySelector('.element__image');


//слушателя для попапа картинки
// oppenPictirePopupBtn.addEventListener('click',oppenPlacePopup);
closePicturePopupBtn.addEventListener('click', closePlacePopup);






//передаем лайки на карточки - старый метод
// const buttons = document.querySelectorAll('.element__like');

// buttons.forEach ((button) =>{
//   button.addEventListener('click', function(){
//     button.classList.toggle('element__like_active');
//   })
// });


 // // deleteButton.addEventListener('click', () => cardElement.remove()); /*упрощеный вариант т.к. сразу нахоодимся в функции создания карточки, то обращеемся здесь же сразу к создаваемому элементу.*/