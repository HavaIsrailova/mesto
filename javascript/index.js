const initialCards = [
  {
	  name: 'Грозный',
	  link: 'images/grozny.jpg'
	},
	{
	  name: 'Магас Ингушетия',
	  link: 'images/magas.jpg'
	},
	{
	  name: 'Москва',
	  link: 'images/moscow.jpg'
	},
	{
	  name: 'Баку',
	  link: 'images/baku.jpg'
	},
	{
	  name: 'Ереван',
	  link: 'images/erevan.jpg'
	},
	{
	  name: 'Краснодар',
	  link: 'images/krasnodarr.jpg'
	}
 ];
 // 6 ПР
const popups = document.querySelectorAll('.popup');
//БЛОКИ объявления РЕДАКТИРОВАНИЯ
const popupChange = document.querySelector('.popup_login');
const profileChange = document.querySelector('.profile__editor');
const closePopupButtons = document.querySelectorAll('.popup__close-popup');
const inputUserProfile = document.querySelector('[name="user"]');
const inputAboutProfile = document.querySelector('[name="about"]');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formEditLogin = document.querySelector('[name="edit-login"]');
//БЛОКИ ДОБАВЛЕНИЯ
const popupAddPh = document.querySelector('.popup_add-photo');
const butttonAddPhoto = document.querySelector('.profile__add-button');
const popupPhotoName = document.querySelector('.popup__name-photo');
const popupPhotoLink = document.querySelector('.popup__link-photo');
const popupFormPhoto = document.querySelector('[name="form-photo"]');

const popupPicture = document.querySelector('.popup__picture');
const popupPictureTitle = document.querySelector('.popup__picture-title');
const popupPictureViewport = document.querySelector('.popup_picture-viewport');

const template = document.querySelector('.template__element');
const cards = document.querySelector('.elements');


// функция сохранения изменения имени профиля
function saveNameProfile(e) {
  e.preventDefault();
  profileName.textContent = inputUserProfile.value;
  profileDescription.textContent = inputAboutProfile.value;
  closePopup(popupChange);
}

// редактирование профиля
formEditLogin.addEventListener('submit', saveNameProfile);

// открытие попапа редактирования профиля 
profileChange.addEventListener('click', function () {
	openPopup(popupChange)
  inputUserProfile.value = profileName.textContent;
  inputAboutProfile.value = profileDescription.textContent;
});
///////////////////6 ПР ЕСК И ОВЕРЛЕЙ
// функция закрытия ESC
function closeESC(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};

// Функция закрытия с помощью оверлей
function closePopupOverley(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  };
};

popups.forEach(popup => {
  popup.addEventListener('mousedown', closePopupOverley)
});
//   КОНЕЦ
// инициализируем фото КОНСТ ИЗ НАЧАЛА
function renderInitialCards() {
  initialCards.forEach(addCardAppend);
}
renderInitialCards()

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

// открытие попапа новой фотки
butttonAddPhoto.addEventListener('click', function () {
  openPopup(popupAddPh);
})

// функция создания фоток
function newCard(dataImage) {
  const cardContent = template.content.cloneNode(true);
  const cardElement = cardContent.querySelector('.element');
  const createImage = cardElement.querySelector('.element__image');
  const createTitle = cardElement.querySelector('.element__title');
  createImage.src = dataImage.link;
  createImage.alt = dataImage.name;
  createTitle.textContent = dataImage.name;
  addCardEvent(cardElement, dataImage);
  return cardElement
}

// фото добавляются в начало и конец
function addCardPrepend(card) {
  cards.prepend(newCard(card))
}

function addCardAppend(card) {
  cards.append(newCard(card))
}

// передача названий и ссылок из формы карточкам, также Б кнопки AddPh
function saveAddCard(e) {
  e.preventDefault();
  const cardInfo = {
    name: popupPhotoName.value,
    link: popupPhotoLink.value
  }
  addCardPrepend(cardInfo);
  closePopup(popupAddPh);
  popupFormPhoto.reset()
  const disabled = popupAddPh.querySelector('.popup__button-save')
  disabled.setAttribute('disabled', true)
  disabled.classList.add('popup__button-save_off')
}

//  сохранить фото
popupFormPhoto.addEventListener('submit', saveAddCard);

// удалить фото
function deleteCard(e) {
  e.target.closest('.element').remove()
}

// обработчики событий для карточки
function addCardEvent(cardElement, dataImage) {
  cardElement.querySelector('.element__delete').addEventListener('click', deleteCard);
  cardElement.querySelector('.element__like').addEventListener('click', handleLikeToggle);
  cardElement.querySelector('.element__image').addEventListener('click', () => openImage(dataImage));
}

//функция открытия фото в большом размере
function openImage(dataImage) {
  popupPicture.src = dataImage.link
  popupPicture.alt = dataImage.name
  popupPictureTitle.textContent = dataImage.name
  openPopup(popupPictureViewport)
}


// функция переключения лайка
function handleLikeToggle(e) {
  e.target.classList.toggle('element__like_active');
}


