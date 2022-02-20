//БЛОКИ объявления РЕДАКТИРОВАНИЯ
const popupChange = document.querySelector(".popup_login");
const profileChange = document.querySelector(".profile__editor");
const closePopupButton = document.querySelectorAll(".popup__close-popup");
const inputUserProfile = document.querySelector('[name="user"]');
const inputAboutProfile = document.querySelector('[name="about"]');
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const formEditLogin = document.querySelector('[name="edit-login"]');
//БЛОКИ ДОБАВЛЕНИЯ
const popupAddPh = document.querySelector(".popup_add-photo");
const butttonAddPhoto = document.querySelector(".profile__add-button");
const popupPhotoName = document.querySelector(".popup__name-photo");
const popupPhotoLink = document.querySelector(".popup__link-photo");
const popupFormPhoto = document.querySelector('[name="form-photo"]');

const popupPicture = document.querySelector(".popup__picture");
const popupPictureTitle = document.querySelector(".popup__picture-title");
const popupPictureViewport = document.querySelector(".popup_picture-viewport");

const template = document.querySelector(".template__element");
const photos = document.querySelector(".elements");

// универсальные функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
//использую форич для всех кнопок
// кнопки закрытия попапа
closePopupButton.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
// откр попап редактирования профиля 4 пр
profileChange.addEventListener("click", function () {
	inputUserProfile.value = profileName.textContent;
	inputAboutProfile.value = profileDescription.textContent;
	openPopup(popupChange);
  });

// редактирование профиля
formEditLogin.addEventListener("submit", saveNewNameProfile);

// сохранение изменений профиля
function saveNewNameProfile(e) {
	e.preventDefault();
	profileName.textContent = inputUserProfile.value;
	profileDescription.textContent = inputAboutProfile.value;
	closePopup(popupChange);
  }  

  //объявление карточек 5пр
function renderinitialPhotos() {
	initialPhotos.forEach(addPhotoAppend);
  }
  renderinitialPhotos();
// ДОБАВЛЕНИЕ КАРТОЧЕК 5пр
// открыть попапа добавления фото
butttonAddPhoto.addEventListener("click", function () {
	openPopup(popupAddPh);
  });
  
// создает новую картинку NEW PICTURE
function addPhoto(newPicture) {
  const photoContent = template.content.cloneNode(true);
  const photoElement = photoContent.querySelector(".element");
  const createImage = photoElement.querySelector(".element__image");
  const createTitle = photoElement.querySelector(".element__title");
  createImage.alt = newPicture.name;
  createImage.src = newPicture.link;
  createTitle.textContent = newPicture.name;
  addPhotoEvent(photoElement, newPicture);
  return photoElement;
}
// картинтки добавляются в начало 
function addPhotoPrepend(card) {
	photos.prepend(addPhoto(card));
  }

  function addPhotoAppend(card) {
	photos.append(addPhoto(card));
  }
// передача названий и ссылок из формы карточкам
function saveAddPicture(e) {
  e.preventDefault();
  const photoInfo = {
    name: popupPhotoName.value,
    link: popupPhotoLink.value,
  };
  addPhotoPrepend(photoInfo);
  closePopup(popupAddPh);
  popupFormPhoto.reset();
}
// кнопка сохранения карточки
popupFormPhoto.addEventListener("submit", saveAddPicture);
// удаление карточки
function deletePicture(e) {
  e.target.closest(".element").remove();
}
// события карточки
function addPhotoEvent(photoElement, newPicture) {
  photoElement
    .querySelector(".element__trash")
    .addEventListener("click", deletePicture);
  photoElement
    .querySelector(".element__like")
    .addEventListener("click", likeToggle);
  photoElement
    .querySelector(".element__image")
    .addEventListener("click", () => openPicture(newPicture));
}
// перключает лайки
function likeToggle(e) {
	e.target.classList.toggle("element__like_active");
  }
//функция открыть фото NEWPICTURE
function openPicture(newPicture) {
  popupPictureTitle.textContent = newPicture.name;//меняет подпись к картинке в зависимости от нажатия
  popupPicture.src = newPicture.link;//меняет изображение в зависимости от нажатия
  popupPicture.alt = newPicture.name;//меняет альт в зависимости от нажатия
  openPopup(popupPictureViewport);
}




