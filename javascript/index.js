const popup = document.querySelector(".popup");
const profileEdit = document.querySelector(".profile__edit");
const popupClose = document.querySelector(".popup__close-popup");
const inputUserProfile = document.querySelector('[name="user"]');
const inputAboutProfile = document.querySelector('[name="about"]');
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const formEdit = document.querySelector('[name="edit-form"]');
// функция открыть
function openPopup(e) {
    popup.classList.add("popup_opened");
    inputUserProfile.value = profileName.textContent;
    inputAboutProfile.value = profileDescription.textContent;
}
// функция закрыть
function closePopup(e) {
    popup.classList.remove("popup_opened");
}
// функция сохранения изменений в имени профиля
function handleProfileFormSubmit(e) {
    e.preventDefault();
    profileName.textContent = inputUserProfile.value;
    profileDescription.textContent = inputAboutProfile.value;
    closePopup();
}
// работа функции
profileEdit.addEventListener("click", openPopup); // нажатие открытие попапа
formEdit.addEventListener("submit", handleProfileFormSubmit); // редактирование профиля
popupClose.addEventListener("click", closePopup); // закрытие попапа
