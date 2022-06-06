//export default FormValidator; - отправить в конец
class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
        this._resetForm = this._resetForm.bind(this);
        this._handleInput = this._handleInput.bind(this);
        this._preventDefault = this._preventDefault.bind(this);
        //приватные поля
    }
//приатные методв
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _preventDefault(evt) {
        evt.preventDefault();
    }

    _resetForm() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }

    _setEventListener() {
        this._form.addEventListener('submit', this._preventDefault);
        this._form.addEventListener('reset', this._resetForm);

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => this._handleInput(inputElement));
        });
    }

    _handleInput(inputElement) {
        this._inputValidity(inputElement);
        this.toggleButtonState();
    }
//с малеькой буквы
    _inputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    }

    _showInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._settings.errorClass);
    };

//Публичный метод (можно делать два и более!!)
    enableValidation() {
        this._setEventListener();
        this.toggleButtonState();
    }
    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

   // validateButton() {
   //     this.toggleButtonState();
   // }
   //публичный метод reset()
   resetErrors() {
    this._form.reset();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      });
  }
}
export default FormValidator;

