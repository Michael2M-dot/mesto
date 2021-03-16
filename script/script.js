//по клику на значек редактирования профиля открываем попап
//по клику на крестик закрываем попап
//по клику на кнопку сохранить закрываем попап


let popup = document.querySelector('.popup');
// console.log ('Popup', popup);
let openPopupBtn = document.querySelector('.profile__edit_btn');
// console.log('openPopupBtn', openPopupBtn);
// console.log(document.querySelector('profile__edit_btn'));
let closePopupBtn = document.querySelector('.form__close_btn')

function openPopup() {
  popup.classList.add('popup_visible');
};

function closePopup() {
  popup.classList.remove('popup_visible');
};

openPopupBtn.addEventListener('click', function(){
  // console.log('click');
  openPopup();
});

closePopupBtn.addEventListener('click', function(){
  closePopup();
});



// при вводе в сроке имени, меняем имя вывода на странице
// при вовде текста в строке должности, менем текст на странице 

let formElement = document.querySelector('.form');

let nameInput = document.querySelector('.profile__user-name');
// console.log(NameInput);
let jobInput = document.querySelector('.profile__user-position');
// console.log(JobInput);

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




// делаем лайк на сердечке. По клику цвет становится черным, повторный клик делает опять белым.
// по клику , менем рисунок бэкграунда в CSS element__like либо добавляем новый класс element__like_active в котором 
// устанавливаем новый рисунок бэкграунда (черный). Мне кажется второй вариант интересней.
// 

// document.querySelectorAll('#like-btn').forEach(function(e) {
//   e.addEventListener('click', function() {
//     this.style.Color = "red";
//   })
// }); -это эксперемент со сменой цвета всего бэкграунда (взял из интернета), когда срабатывает то окрашивает весь бэкграунд, и
//к тому же нет обратной смены фона.


//это мой варинат изначальный. 
// let elementsCard = document.querySelector('.elements');//получили элемент родительского блока по идентификатору класса через метод querySelector и сохранили его в переменной 
// console.log(elementCards);//проверили вывод переменной в конслоь - все найденные элементы выводятся

// let likeBtns = document.querySelectorAll('#like-btn');//получаю элементы из уже существующей переменной по id класса и сохранил в переменной - к этой переменной буду добавлять новый класс, где будет менятся изображение на черный фон.
// // console.log(likeBtns);//проверил вывод, все выходит в консоль.

// function clickButton () {
//     likeBtns.classList.toggle('element__like_active');
// }

 
// function clickButton () {
//   for (i = 0; i < likeBtns.length; i++) {
//     likeBtns[i].classList.add("element__like_active");
//   }
// }

// likeBtns.addEventListener('click', clickButton);
// console.log(likeBtns);

// function linkButton () {// функция должна добавлять новый класс element__like_active к переменной likeBtns в которой хранятся все элементы.
//   this.classList.add("element__like_active"); //берем переменную и к ее классам добавляем новый класс - и вот здесь затык!!!
// }
// console.log(linkButton());


// for (var i = 0; i < elements.length; i++) {
//     elements[i].classList.add("test2");
// }


// function clickHandler(){
//   likeBtns.classList.add('element__like_active');
//   // console.log(likeBtns.classList.contains('element__likr_active'));
// }

// likeBtns.addEventListener('click', clickHandler);

// console.log(elmLikeBtns);


// document.querySelectorAll('#like-btn').forEach(function(e) {
//   e.addEventListener('click', function() {
//     this.classList.add('.element__like_active');
//   })
// }); 

//-это эксперемент со сменой цвета всего бэкграунда (взял из интернета), когда срабатывает то окрашивает весь бэкграунд, и к тому же нет обратной смены фона.


// function a() {
//   likeBtns.setAttribute('element__like_active');
//   console.log(likeBtns.setAttribute('element__like_active'));
// }



// созадим функцию которая будте проверять наличие артибута или его отсутсвие и добавлять или убавлять класс

// function addClass() {
//   if (likeBtns.hasAttribute('element__like_active') === true){
//     likeBtns.removeAttribute('element__like_active')
//     console.log(likeBtns);
//   } else{
//     likeBtns.addAttribute('element__like_active')
//   }
// }

// likeBtns.addEventListener('click', addClass);