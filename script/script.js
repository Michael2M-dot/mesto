//по клику на значек редактирования профиля открываем попап
//по клику на крестик закрываем попап
//по клику на кнопку сохранить закрываем попап


let popup = document.querySelector('.popup');

let openPopupBtn = document.querySelector('.profile__edit-btn');

let closePopupBtn = document.querySelector('.form__close-btn')

function openPopup() {
  popup.classList.add('popup_visible');
};

function closePopup() {
  popup.classList.remove('popup_visible');
};

openPopupBtn.addEventListener('click', function(){
  openPopup();
});

closePopupBtn.addEventListener('click', function(){
  closePopup();
});



// при вводе в сроке имени, меняем имя вывода на странице
// при вовде текста в строке должности, менем текст на странице 

let formElement = document.querySelector('.form');

let nameInput = document.querySelector('.profile__user-name');

let jobInput = document.querySelector('.profile__user-job');


function formSubmitHandler(evt){
  evt.preventDefault();
  
  // Получите значение полей jobInput и nameInput из свойства value и назанчаем новые переменные для хранения новых значений введеных в форму
  let currentUserName = document.getElementById('user-name'); //получаем и записываем занчение переменной из поля по id user-name
  // console.log(currentUserName);
  let currentUserJob = document.getElementById('user-job'); //получаем и записываем занчение переменной из поля по id user-job
  // console.log(currentUserJob);
  // Вставьте новые значения с помощью textContent
  nameInput.textContent = currentUserName.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются
  jobInput.textContent = currentUserJob.value; //присваиваем новые значения с помощью textContent, значения полность перезаписываются

  closePopup(); //используем уже готовую функцию для закрытия попапа
}

formElement.addEventListener('submit', formSubmitHandler); 
