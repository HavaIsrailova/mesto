import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

const initialCards = [
	{
		name: 'Тихий океан',
		link: 'https://images.unsplash.com/photo-1503942142281-94af0aded523?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
	},
	{
		name: 'Северный Ледовитый',
		link: 'https://images.unsplash.com/photo-1583030225577-329fe6cc80d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80'
	},
	{
		name: 'Южный',
		link: 'https://images.unsplash.com/photo-1446038236174-69712e24d137?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
	},
	{
		name: 'Индиский',
		link: 'https://images.unsplash.com/photo-1565643355044-000fbad87cc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80'
	},
	{
		name: 'Атлантический',
		link: 'https://images.unsplash.com/photo-1508624217470-5ef0f947d8be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
	},
	{
		name: 'Байкал',
		link: 'https://images.unsplash.com/photo-1488921618671-463b781ac428?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
	}
];
const popupImage = new PopupWithImage('.popup_picture-viewport');
const popupAddCard = new PopupWithForm('.popup_add-photo', saveAddCard);
const popupEdit = new PopupWithForm('.popup_login', saveNameProfile);
const userInfo = new UserInfo({selectorName: '.profile__name', selectorInfo: '.profile__description'});

const profileChange = document.querySelector('.profile__editor');
const inputNameProfile = document.querySelector('[name="name"]');
const inputAboutProfile = document.querySelector('[name="info"]');
const butttonAddPhoto = document.querySelector('.profile__add-button');
const formEdit = document.querySelector('[name="edit-login"]');
const popupFormPhoto = document.querySelector('[name="form-photo"]');
const dataValidation = {
	formSelector: '.form',
	inputSelector: '.popup__field',
	submitButtonSelector: '.popup__button-save',
	inactiveButtonClass: 'popup__button-save_off',
	inputErrorClass: 'popup__field_error',
	errorClass: 'popup__input-error_active',
};

popupImage.setEventListeners();
popupAddCard.setEventListeners();
popupEdit.setEventListeners();

const validationEditorForm = new FormValidator(dataValidation,formEdit);
const validationAddForm = new FormValidator(dataValidation, popupFormPhoto);
validationEditorForm.enableValidation();
validationAddForm.enableValidation();

// открывается попап редактирования профиля 
profileChange.addEventListener('click', function () {	
	const {name, info} = userInfo.getUserInfo();
	inputNameProfile.value = name;
	inputAboutProfile.value = info;
	validationAddForm.toggleButtonState();
	validationEditorForm.resetErrors();
	popupEdit.open();
});

// открывается попап добавления фото
butttonAddPhoto.addEventListener('click', function () {
	popupFormPhoto.reset();
	validationAddForm.resetErrors();
	validationAddForm.toggleButtonState();
	popupAddCard.open();
})

// фото добавляются в начало
function addCard(item) {
	const card = initCard(item);
	cardList.addItem(card);
}

const cardList = new Section({
	items: initialCards,
	renderer: addCard
},
 '.elements');

function initCard(dataCard) {
	const card = new Card({
		data: dataCard,
		handleCardClick: (data) => {
			popupImage.open(data);
		}
	}, '.template__element');
	return card.viewCard();
}

cardList.renderItems()

function saveAddCard(data) {
	addCard(data);
	popupAddCard.close();
}

function saveNameProfile(data) {
	userInfo.setUserInfo(data);
	popupEdit.close();
}


