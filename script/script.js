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

const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.profile__user-name');
const jobInput = document.querySelector('.profile__user-job');
const currentUserName = document.getElementById('user_name'); //получаем и записываем значение переменной из поля по id user-name
const currentUserJob = document.getElementById('user_job'); //получаем и записываем значение переменной из поля по id user-job
const popup = document.querySelector('.page__popup');
const openPopupBtn = document.querySelector('.profile__button-edit');
const closePopupBtn = document.querySelector('.popup__button-close');


function formSubmitHandler(evt){
  evt.preventDefault();
  nameInput.textContent = currentUserName.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются
  jobInput.textContent = currentUserJob.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются
  closePopup(); //используем уже готовую функцию для закрытия попапа
} //функция кнопки Сохранить.

function openPopup() {
  popup.classList.add('page__popup_visible');
  currentUserName.value = nameInput.textContent;
  currentUserJob.value = jobInput.textContent;
}; //функция открытия попапа

function closePopup() {
  popup.classList.remove('page__popup_visible'); 
}; //функция для закрытия попапа.

openPopupBtn.addEventListener('click', openPopup);//слушатель для открытия попапа
closePopupBtn.addEventListener('click', closePopup);//слушатель для закрытия попапа
formElement.addEventListener('submit', formSubmitHandler); //слушатель для сохрания формы.


const buttons = document.querySelectorAll('.element__like');

buttons.forEach ((button) =>{
  button.addEventListener('click', function(){
    button.classList.toggle('element__like_active');
  })
});

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
const cardsList = document.querySelector('.elements__list');

initialCards.forEach(function(element){
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__title').textContent = element.name;

  const button = cardElement.querySelector('.element__like');
  button.addEventListener('click', function(evt){
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like_active');
  });

  cardsList.append(cardElement);
});