//export default FormValidator; - отправить в конец
class FormValidator {
    constructor(settings, form) {
        this.settings = settings;
        this.form = form;
        this.inputList = Array.from(this.form.querySelectorAll(this.settings.inputSelector));
        this.buttonElement = this.form.querySelector(this.settings.submitButtonSelector);
        this._resetForm = this._resetForm.bind(this);
        this._handleInput = this._handleInput.bind(this);
        this._preventDefault = this._preventDefault.bind(this);
    }
//приатные методв
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.buttonElement.classList.add(this.settings.inactiveButtonClass);
            this.buttonElement.setAttribute('disabled', true);
        } else {
            this.buttonElement.classList.remove(this.settings.inactiveButtonClass);
            this.buttonElement.removeAttribute('disabled');
        }
    }

    _hasInvalidInput() {
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _preventDefault(evt) {
        evt.preventDefault();
    }

    _resetForm() {
        this.inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }

    _setEventListener() {
        this.form.addEventListener('submit', this._preventDefault);
        this.form.addEventListener('reset', this._resetForm);

        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => this._handleInput(inputElement));
        });
    }

    _handleInput(inputElement) {
        this._InputValidity(inputElement);
        this._toggleButtonState();
    }

    _InputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hideInputError(inputElement) {
        const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.settings.inputErrorClass);
        errorElement.classList.remove(this.settings.errorClass);
        errorElement.textContent = '';
    }

    _showInputError(inputElement) {
        const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.settings.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this.settings.errorClass);
    };

//Публичный метод (можно делать два и более!!)
    enableValidation() {
        this._setEventListener();
        this._toggleButtonState();
    }

    validateButton() {
        this._toggleButtonState();
    }
}
export default FormValidator;

