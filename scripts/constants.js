//константы и селекторы

export const selectors = {
	submitBtnSelector: ".form__submit-btn",
	disabledBtnSelector: "form__submit-btn_disabled",
	errorsSelector: ".form__input-error",
	formSection: ".form__fieldset",
	inputErrorSelector: "form__input-error_active",
};

//переменые для использвоания в скрипте
const formUser = document.forms.userProfileForm; //форма для редактирования данных пользователя
const nameInput = document.querySelector(".profile__user-name");
const jobInput = document.querySelector(".profile__user-job");
const userNameInput = formUser.elements.userNameInput; //переменная поля ввода имени для формы редактирования профиля пользователя
const userJobInput = formUser.elements.userJobInput; //переменная поля ввода професси для формы редактирования профиля пользователя
const openUserPopupBtn = document.querySelector(".profile__button-edit");
const closeUserPopupBtn = document.querySelector("#close-userPopup");
const openPlacePopupBtn = document.querySelector(".profile__button-add");
const popupUser = document.querySelector("#edit-profile");
const popupPlace = document.querySelector("#add-place");
const closePlacePopupBtn = document.querySelector("#close-placePopup");
const popupWindows = document.querySelectorAll(".popup"); //универсальная переменная всех поапов на старнице
const cardList = document.querySelector(".elements__list"); // место куда добавляем карточку
const popupPicturePreview = document.querySelector("#picture-popup");
const currentPicture = popupPicturePreview.querySelector(".popup__image");
const currentTitle = popupPicturePreview.querySelector(".popup__caption");
const closePreviewPicturePopupBtn = document.querySelector(
	"#close-PicturePopup"
);
const formPlace = document.forms.placeCardForm; //форма для добавления карточки
const placeName = formPlace.elements.placeNameInput; //поле формы добавления карточки, нзвание места
const placeLink = formPlace.elements.placeLinkInput; //поле формы карточки, ссылка на фотографию места


export {
	formUser,
	nameInput,
	jobInput,
	userNameInput,
	userJobInput,
	openUserPopupBtn,
	closeUserPopupBtn,
	openPlacePopupBtn,
	popupUser,
	popupPlace,
	closePlacePopupBtn,
	popupWindows,
	cardList,
	popupPicturePreview,
	currentPicture,
	currentTitle,
	closePreviewPicturePopupBtn,
	formPlace,
	placeName,
	placeLink
}