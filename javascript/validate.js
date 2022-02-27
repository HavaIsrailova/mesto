// const showInputError = (inputElement, errorMessage, config) => {
//   const errorElement = inputElement.nextElementSibling
//   inputElement.classList.add(config.errorClass);
//   errorElement.textContent = errorMessage;
// };

// const hideInputError = (inputElement, config) => {
//   const errorElement = inputElement.nextElementSibling
//   inputElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
// };

// const checkInputValidity = (inputElement, config) => {
//   if (!inputElement.validity.valid) {
//     showInputError(inputElement, inputElement.validationMessage, config);
//   } else {
//     hideInputError(inputElement, config);
//   }
// };

// Функция  ошибки
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// Функция скрывает ошибки
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

// Проверка валидности формы
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// Проверка валидыции всех полей формы
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid
  })
}

// Изменение состояния кнопки
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

// Добавить обработчик всем полям ввода
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
}

// Добавить обработчик всем формам
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  })
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_off',
  inputErrorClass: 'popup__field_error',
  errorClass: 'popup__input-error_active',
})

