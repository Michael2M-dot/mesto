//константы и селекторы

export const selectors = {
  submitBtnSelector: ".form__submit-btn",
  disabledBtnSelector: "form__submit-btn_disabled",
  errorsSelector: ".form__input-error",
  formSection: ".form__fieldset",
  inputErrorSelector: "form__input-error_active",
};

//переменные для использования в скрипте
export const formUser = document.forms.userProfileForm; //форма для редактирования данных пользователя
export const { userNameInput, userJobInput } = formUser;
export const formPlace = document.forms.placeCardForm; //форма для добавления карточки
export const { placeName, placeLink } = formPlace;
export const nameInput = document.querySelector(".profile__user-name");
export const jobInput = document.querySelector(".profile__user-job");
export const openUserPopupBtn = document.querySelector(".profile__button-edit");
export const addUserCardBtn = document.querySelector(".profile__button-add");
export const popupUser = document.querySelector("#edit-profile");
export const popupPlace = document.querySelector("#add-place");
export const popupWindows = document.querySelectorAll(".popup"); //универсальная переменная всех попапов на странице
export const cardListSection = document.querySelector(".elements__list"); // место куда добавляем карточку
export const popupPicturePreview = document.querySelector("#picture-popup");
export const popupElements = document.querySelectorAll(".popup__window_size_s");
export const ESC = "Escape";
