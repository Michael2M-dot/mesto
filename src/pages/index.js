/*
Project Mesto-Russia (Яндекс - Практикум)

Version 0.1.0 - 14.05.2021
Что нового (ver.0.1.0):
- Код разбит на классы, которые связываются через наследование.
- Добавлены классы Popup, PopupWithForm, PopupWithImage, Section и UserInfo
(вся информация о классах находится в одноименных фалах скриптов).
- Проведен рефакторинг кода и размещения исходных файлов под сборку проекта Вебпаком.
- Проведена настройка Вебпака + подключены дополнительные плагины для html (babel)
и для CSS (postcss).


Version 0.0.7a - 25.04.2021
Что нового (ver.0.0.7a):
- Добавлены классы Card и FormValidator, которые вынесены в отдельные файлы;
- Проведен рефакторинг кода по файлам JS с использованием import и export:
- Каждый класс экспортируется в index.js и создается прототип класса с одним публичным методом
- Selectors и переменные используемые в скрипте вынесены в constant.js.
- В класс Card - вынесен функционал создания картчки с обработчиками и приватными методами.
- Yтилитарные функции вынесены в отдельный файл utils.js.
- В модуль экспортируются данные из модулей:
 Card.js  -  класс Card,
 FormValidator.js - класс FormValidator,
 constants.js - переменные и селекторы,
 utils.js - утилитарные функции.


Version 0.0.6a - 13.04.2021
Что нового (ver.0.0.6a):
-  Добавлена валидация форм, вынесена в отедельный скрипт FormValidator.js
- Произведен рефакторинг функции отвечающе за созание карточки, теперь события не вешаются на каждую карточку,
а отслеживаются по всплытию на родителе.
- Появилась возможность закрытие попапа через нажатие клавиши Esc или кликом по оверлею.
- Добавлена функция деактивирующая кнопку при повторном открытии попапа и функция удаляющая ошибку после закрытия поапа.


Version 0.0.5a - 30.03.2021
Description: Скрипт запускает:
1. Форму заполнения данных пользователя на сайте
По клику на иконке редактирования, открывается попап-форма, где доступны к заполнению поля Имени пользователя и его профессии
Нажатие на кнопку Сохранить, перезаписывает введеные значения в карточку пользователя на сайте
2. По умолчанию подгружате карточки с картинкой и названием. Исходный ряд в 6 карточек подгружается из массива в JS.
3. Добавляет слушателей на лайки и удаление карточек. На каждой карточке есть возможность ставить лайки и
удалать карточку при нажатии на корзину.
4. Добавляет карточки пользователя на страницу. При клике на иконку добавления картинки, открывает попап и
форму для добавления карточки на страницу. Карточка добавляется в начало ряда. Для добавления карточки в поля
вводим название и URL (в теге <input>  установлени атрибуту url)
5. Открывает попап с превью на картинку. По клику на изображение открывает попап с полноформатным фото и подписью к нему.


Michael2M (c) 2021
email: darak.ltd@yandex.ru
*/

import "./index.css";

import Card from "../scripts/components/Card.js";

import FormValidator from "../scripts/components/FormValidator.js";

import Section from "../scripts/components/Section.js";

import Api from "../scripts/components/Api.js";

import {
  selectors,
  formUser,
  userNameInput,
  userJobInput,
  openUserPopupBtn,
  addUserCardBtn,
  cardListSection,
  formPlace,
  popupElements,
  avatarPopupBtn,
  avatarForm,
  userProfileSubmitBtn,
  placeSubmitBtn,
  avatarSubmitBtn
} from "../scripts/utils/constants.js";

import { hideInputError, handleDisableButton } from "../scripts/utils/utils.js";

import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

let user = null;


//создаем инстант Api
const api = new Api({
  serverUrl: "https://mesto.nomoreparties.co/v1/cohort-24",
  headers: {
    authorization: "99295e52-decf-4a30-8030-f17c65fb60b0",
    "Content-Type": "application/json",
  },
});


//обращаемся к классу section и выводим на страницу начальный массив данных
const cardList = new Section(
  {
    renderer: (data) => {
      cardList.addItem(createCard(data), false);
    },
  },
  cardListSection
);


//создаем карточку из класса Card
const createCard = (data) => {
  const card = new Card({
    data: {
      ...data,
        currentUserID: user._id,
  },
      handleCardClick,
      handleDeleteCardClick: () =>{
        api.deleteCard(card.getId())
          .then(() => card.deleteCard())
          .catch((err) =>
            console.log(
              `Ошибка начальной загрузки страницы: ${err.status} ${err.statusText}`
            ))
      },
      handleAddLike: () => {
        api.likeCard('PUT', card.getId())
          .then ((data) => {
            card.getLikes({data}, true)
          })
          .catch((err) =>
            console.log(
              `Ошибка лайка карточки: ${err.status} ${err.statusText}`
            ))
      },
      handleDeleteLike: () => {
        api.likeCard('DELETE', card.getId())
          .then ((data) => {
            card.getLikes({data}, false)
          })
          .catch((err) =>
            console.log(
              `Ошибка лайка карточки: ${err.status} ${err.statusText}`
            ))
      },

    },
    "#cards-template"
    );

  return card.generateCard();

};


//подгружаем на страницу данные пользователя и исходные карточки
Promise.all([api.getUserData(), api.getInitialCards()])
  //данные пользователя
  .then(([userData, initialCards]) => {
    user = userData;
    userInfo.setUserInfo(
      user,
      user._id,
    );
  //исходные карточки
    cardList.renderItems(initialCards);
  })
  .catch((err) =>
    console.log(
      `Ошибка начальной загрузки страницы: ${err.status} ${err.statusText}`
    )
  );


//инициализируем попап для картинки из класса PopupWithImage
const popupWithImage = new PopupWithImage("#picture-popup");
popupWithImage.setEventListener();


// открываем попап с картинокй (передаем даннные изображения для его отображения в полном размере)
function handleCardClick(link, name) {
  popupWithImage.open(link, name);
}


//< ----------блок создания попапа для добавления карточки-------->
//инстант попап добавления карточки пользователя
const addCardPopup = new PopupWithForm("#add-place", addPlaceSubmitHandler);
addCardPopup.setEventListener();

//Функция обработчик события на сабмите, которая добавляет элемент (карточка пользователя) в DOM
function addPlaceSubmitHandler(data) {
  addCardPopup.renderLoading(true);
  api
    .addCard({
      ...data,
      user: user.name,
      owner: user._id,
    })
    .then((data) => {
      cardList.addItem(createCard(data), true);
    })
    .catch((err) =>
      console.log(
        `Ошибка загрузки карточки пользователя: ${err.status} ${err.statusText}`
      )
    )
    .finally(() => {
      addCardPopup.renderLoading(false);
      addCardPopup.close();
    });
}

// слушатели для попапа добавления карточек
addUserCardBtn.addEventListener("click", () => {
  addCardPopup.open();
  handleDisableButton(formPlace);
  handleInputErrorsHide(formPlace);
});

//< ----------блок создания и вызова попапа редакитрования данных о пользователе--------->

//создаем инстант и получаем данные имени пользователя и его работы
const userInfo = new UserInfo({
  userNameSelector: ".profile__user-name",
  userJobSelector: ".profile__user-job",
  userAvatarSelector: ".profile__user-avatar",
});

//инстант попапа редактирования данных пользователя
const editProfilePopup = new PopupWithForm(
  "#edit-profile",
  editProfileSubmitHandler
);
editProfilePopup.setEventListener();

//функция кнопки Сохранить информацию о пользователе
function editProfileSubmitHandler(data) {
  // renderLoading(userProfileSubmitBtn, true)
  editProfilePopup.renderLoading(true)
  api
    .updateUserData(data)
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
        _id: data._id,
      });
    })
    .catch((err) =>
      console.log(
        `Ошибка выгрузки данных пользователя: ${err.status} ${err.statusText}`
      )
    )
    .finally(() => {
      editProfilePopup.renderLoading(false)
      // renderLoading(userProfileSubmitBtn, false);
      editProfilePopup.close();
    });
}

//передает исходные данные в поля формы данных пользователя
function setUserInputs(data) {
  userNameInput.value = data.userName;
  userJobInput.value = data.userJob;
}

//слушатель кнопки открытия попапа редактирования данных о пользователе
openUserPopupBtn.addEventListener("click", () => {
  editProfilePopup.open();
  setUserInputs(userInfo.getUserInfo());
  handleDisableButton(formUser);
  handleInputErrorsHide(formUser);
});


//<----------- инстант попапа добавления аватара пользователя ------------->

const addAvatarPopup = new PopupWithForm("#add-avatar", addAvatarSubmitHandler);

addAvatarPopup.setEventListener();

function addAvatarSubmitHandler(data) {

  console.log(data)
  api.updateAvatar(data)
    .then((data) => {
      userInfo.setUserInfo({
        avatar: data.avatar,
      })
    })
    .catch((err) =>
      console.log(
        `Ошибка загрузки аватара пользователя: ${err.status} ${err.statusText}`
      )
    )
    .finally(() => {
      addAvatarPopup.renderLoading(false);
      addAvatarPopup.close();
    });
}

avatarPopupBtn.addEventListener("click", () => {
  addAvatarPopup.open();
  handleDisableButton(avatarForm);
  handleInputErrorsHide(avatarForm);
});

// <---------Блок валадиции форм ---------->
//вспомагательная функция которая повторно вызывает hideInputError и скрывает вывод ошибок, когда форма закрывается без сохранения значений
const handleInputErrorsHide = (popup) => {
  //обнуляем поля ошибки при закрытии формы через вызов универсально функции hideInputError
  const inputElements = popup.querySelectorAll(selectors.formSection);
  inputElements.forEach((input) => hideInputError(input, selectors));
};

//функция проверки валидации полей формы.
const validateFormElement = (formElement) => {
  const formValidator = new FormValidator(formElement, selectors);

  formValidator.enableValidation();
};

//функции валидации попапов в глобально видимости
popupElements.forEach((popupElement) => {
  validateFormElement(popupElement);
});

/*

//получение данных о пользователе и вывод их на страницу
api.getUserData()
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
      avatar: data.avatar,
      userId: data._id,
    })
  })
  .catch((err) => console.log(`Ошибка загрузки данных пользователя: ${err.status} ${err.statusText}`))

//выводить исходный массив карточек на страницу
api.getInitialCards()
  .then((initialCards) => {
    console.log(initialCards)
    const cardList = new Section(
      {
        items: initialCards,
        renderer: (data) => {
          cardList.addItem(createCard(data), false);
        },
      },
      cardListSection
    );
    cardList.renderItems();
  })
  .catch((err) => console.log(`Ошибка загрузки карточек: ${err.status} ${err.statusText}`))
*/

/*
//обращаемся к классу section и выводим на страницу начальный массив данных
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.addItem(createCard(data), false);
    },
  },
  cardListSection
);
//вывели начальный массив карточек
cardList.renderItems();*/

/*

//Функция обработчик события на сабмите, которая добавляет элемент (карточка пользователя) в DOM
function addPlaceSubmitHandler(data) {
  const cardData = {
    name: data.placeNameInput,
    link: data.placeLinkInput,
  };

  cardList.addItem(createCard(cardData), true);
  addCardPopup.close();
}*/

/*
//функция кнопки Сохранить информацию о пользователе
function editProfileSubmitHandler(data) {
  userInfo.setUserInfo(data);
  editProfilePopup.close();
}*/
