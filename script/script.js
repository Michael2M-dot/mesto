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

let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.profile__user-name');
let jobInput = document.querySelector('.profile__user-job');
let currentUserName = document.getElementById('user_name'); //получаем и записываем значение переменной из поля по id user-name
let currentUserJob = document.getElementById('user_job'); //получаем и записываем значение переменной из поля по id user-job
let popup = document.querySelector('.page__popup');
let openPopupBtn = document.querySelector('.profile__button-edit');
let closePopupBtn = document.querySelector('.popup__button-close');


function formSubmitHandler(evt){
  evt.preventDefault();
  nameInput.textContent = currentUserName.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются
  jobInput.textContent = currentUserJob.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются
  closePopup(); //используем уже готовую функцию для закрытия попапа
}

function openPopup() {
  popup.classList.add('page__popup_visible');
  currentUserName.value = nameInput.textContent;
  currentUserJob.value = jobInput.textContent;
};

function closePopup() {
  popup.classList.remove('page__popup_visible'); 
};

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 


const buttons = document.querySelectorAll('.element__like');

buttons.forEach ((button) =>{
  button.addEventListener('click', function(){
    button.classList.toggle('element__like_active');
  })
});