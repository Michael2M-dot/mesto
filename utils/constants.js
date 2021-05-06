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
/*const userNameInput = formUser.elements.userNameInput; //переменная поля ввода имени для формы редактирования профиля пользователя
const userJobInput = formUser.elements.userJobInput; //переменная поля ввода профессии для формы редактирования профиля пользователя*/

export const formPlace = document.forms.placeCardForm; //форма для добавления карточки
export const { placeName, placeLink } = formPlace;
/*const placeName = formPlace.elements.placeNameInput; //поле формы добавления карточки, название места
const placeLink = formPlace.elements.placeLinkInput; //поле формы карточки, ссылка на фотографию места*/

export const nameInput = document.querySelector(".profile__user-name");
export const jobInput = document.querySelector(".profile__user-job");
export const openUserPopupBtn = document.querySelector(".profile__button-edit");
export const closeUserPopupBtn = document.querySelector("#close-userPopup");
export const openPlacePopupBtn = document.querySelector(".profile__button-add");
export const popupUser = document.querySelector("#edit-profile");
export const popupPlace = document.querySelector("#add-place");
export const closePlacePopupBtn = document.querySelector("#close-placePopup");
export const popupWindows = document.querySelectorAll(".popup"); //универсальная переменная всех попапов на странице
export const cardListSection = document.querySelector(".elements__list"); // место куда добавляем карточку
export const popupPicturePreview = document.querySelector("#picture-popup");
export const currentPicture = popupPicturePreview.querySelector(
  ".popup__image"
);
export const currentTitle = popupPicturePreview.querySelector(
  ".popup__caption"
);
export const closePreviewPicturePopupBtn = document.querySelector(
  "#close-PicturePopup"
);
export const popupElements = document.querySelectorAll(".popup__window_size_s");
export const ESC = "Escape";
