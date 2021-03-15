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

