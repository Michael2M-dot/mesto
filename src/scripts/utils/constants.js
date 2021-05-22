//константы и селекторы

export const selectors = {
  submitBtnSelector: ".form__submit-btn",
  disabledBtnSelector: "form__submit-btn_disabled",
  errorsSelector: ".form__input-error",
  formSection: ".form__fieldset",
  inputErrorSelector: "form__input-error_active",
};

//переменные для использования в скрипте
export const formUser = document.querySelector("#edit-profile");
export const userNameInput = formUser.querySelector("#user-name-input");
export const userJobInput = formUser.querySelector("#user-job-input");
export const formPlace = document.querySelector("#add-place"); //форма для добавления карточки
export const placeName = formPlace.querySelector("#place-name-input");
export const openUserPopupBtn = document.querySelector(".profile__button-edit");
export const addUserCardBtn = document.querySelector(".profile__button-add");
export const popupPlace = document.querySelector("#add-place");
export const popupWindows = document.querySelectorAll(".popup"); //универсальная переменная всех попапов на странице
export const cardListSection = document.querySelector(".elements__list"); // место куда добавляем карточку
export const popupPicturePreview = document.querySelector("#picture-popup");
export const popupElements = document.querySelectorAll(".popup__window_size_s");
export const avatarPopupBtn = document.querySelector('.profile__user-avatar');
export const avatarForm = document.querySelector('#add-avatar')
export const ESC = "Escape";
export const formSubmitBtns = document.querySelectorAll('.form__submit-btn')
