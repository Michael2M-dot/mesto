//константы и селекторы

export const selectors = {
  submitBtnSelector: ".form__submit-btn",
  disabledBtnSelector: "form__submit-btn_disabled",
  errorsSelector: ".form__input-error",
  formSection: ".form__fieldset",
  inputErrorSelector: "form__input-error_active",
  inputSelector: ".form__input",
};

//переменные для использования в скрипте
export const formUser = document.querySelector("#edit-profile");
export const userNameInput = formUser.querySelector("#user-name-input");
export const userJobInput = formUser.querySelector("#user-job-input");
export const formPlace = document.querySelector("#add-place"); //форма для добавления карточки
export const openUserPopupBtn = document.querySelector(".profile__button-edit");
export const addUserCardBtn = document.querySelector(".profile__button-add");
export const cardListSection = document.querySelector(".elements__list"); // место куда добавляем карточку
export const avatarPopupBtn = document.querySelector(".profile__user-avatar");
export const ESC = "Escape";
export const avatarForm = document.querySelector("#avatar-form");

// export const placeName = formPlace.querySelector("#place-name-input");
// export const popupPlace = document.querySelector("#add-place");
// export const popupWindows = document.querySelectorAll(".popup"); //универсальная переменная всех попапов на странице
// export const popupPicturePreview = document.querySelector("#picture-popup");
