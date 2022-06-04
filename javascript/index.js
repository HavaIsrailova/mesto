import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards}  from './cardsInitial.js'

// 6 ПР
const popups = document.querySelectorAll('.popup');
//БЛОКИ объявления РЕДАКТИРОВАНИЯ
const popupChange = document.querySelector('.popup_login');
const profileChange = document.querySelector('.profile__editor');
const closePopupButtons = document.querySelectorAll('.popup__close-popup');
const inputUserProfile = document.querySelector('[ name="user"]');
const inputAboutProfile = document.querySelector('[name="about"]');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formEdit = document.querySelector('[name="edit-login"]');
//добавления
const popupAddPh = document.querySelector('.popup_add-photo');
const butttonAddPhoto = document.querySelector('.profile__add-button');
const popupPhotoName = document.querySelector('.popup__name-photo');
const popupPhotoLink = document.querySelector('.popup__link-photo');
const popupFormPhoto = document.querySelector('[name="form-photo"]');

const template = document.querySelector('.template__element');
const cards = document.querySelector('.elements');

const settings = {
	formSelector: '.form',
	inputSelector: '.popup__field',
	submitButtonSelector: '.popup__button-save',
	inactiveButtonClass: 'popup__button-save_off',
	inputErrorClass: 'popup__field_error',
	errorClass: 'popup__input-error_active',
};
//валидация

const ValidationEditorForm = new FormValidator(settings, formEdit);
const ValidationAddForm = new FormValidator(settings, popupFormPhoto);

ValidationEditorForm.enableValidation();
ValidationAddForm.enableValidation();

//  попап добавится фото
butttonAddPhoto.addEventListener('click', function () {
	ValidationAddForm.form.reset();
	ValidationAddForm.validateButton();
	openPopup(popupAddPh);
})

// карточки добавляются в начало
function addCardPrepend(dataCard) {
	cards.prepend(initCard(dataCard));
}

// передача названий и ссылок из формы карточкам
function saveAddCard(evt) {
	evt.preventDefault();
	const cardInfo = {
		name: popupPhotoName.value,
		link: popupPhotoLink.value
	}
	addCardPrepend(cardInfo);
	closePopup(popupAddPh);
	//ValidationAddForm.form.reset();
	//ValidationAddForm.validateButton();
}

// функция сохранения изменений в имени профиля
function saveNameProfil(evt) {
	evt.preventDefault();
	closePopup(popupChange);
	profileName.textContent = inputUserProfile.value;
	profileDescription.textContent = inputAboutProfile.value;
}

// редактирование профиля
formEdit.addEventListener('submit', saveNameProfil);

// открытие попапа редактирования профиля 
profileChange.addEventListener('click', function () {
	ValidationEditorForm.form.reset();
	inputUserProfile.value = profileName.textContent;
	inputAboutProfile.value = profileDescription.textContent;
	openPopup(popupChange);
});

// функция закрытия по ESC
function closeESC(evt) {
	if (evt.key === 'Escape') {
		const popup = document.querySelector('.popup_opened');
		closePopup(popup);
	};
};

// Функция закрытия попапа по оверлею
function closePopupBack(evt) {
	if (evt.target === evt.currentTarget) {
		closePopup(evt.target);
	};
};

popups.forEach(popup => {
	popup.addEventListener('mousedown', closePopupBack)
});

// функция открытия попапа
function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closeESC);
}

// функция закрытия попапа
function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', closeESC);
}

// кнопки закрытия попапа
closePopupButtons.forEach((button) => {
	const popup = button.closest('.popup');
	button.addEventListener('click', () => closePopup(popup))
})

// кнопка сохранения карточки
popupFormPhoto.addEventListener('submit', saveAddCard);

// инициализация фото
function renderInitialCards() {
	initialCards.forEach(dataCard => {
		cards.append(initCard(dataCard));
	});
}

// создается карточка
function initCard(dataCard) {
	const card = new Card(dataCard, template);
	card.openPopup = openPopup;
	return card.viewCard();
}

renderInitialCards()