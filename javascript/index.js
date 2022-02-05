
const popup = document.querySelector('.popup');
const profileEdit = document.querySelector('.profile__edit');
const closePopup = document.querySelector('.popup__close-popup');

const inputUserProfile = document.querySelector('[name="user"]');
const inputAboutProfile = document.querySelector('[name="about"]');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const formEdit = document.querySelector('[name="edit-form"]');

// функция открыть 
function popupOpen(e) {
	popup.classList.add('popup_opened');
	inputUserProfile.value = profileName.textContent;
	inputAboutProfile.value = profileDescription.textContent;
} 
// функция закрыть 
function popupCLose(e) {
	popup.classList.remove('popup_opened');
} 

// функция сохранения изменений в имени профиля
function formSubmitHandler(e) {
	e.preventDefault();
	profileName.textContent = inputUserProfile.value;
	profileDescription.textContent = inputAboutProfile.value;
	popupCLose();
} 

// работа функции
profileEdit.addEventListener('click', popupOpen); // нажатие открытие попапа
formEdit.addEventListener('submit', formSubmitHandler); // редактирование профиля
closePopup.addEventListener('click', popupCLose); // закрытие попапа
