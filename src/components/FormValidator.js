class FormValidator {
    constructor(settings, form) {
        this.settings = settings;
        this.form = form;
        this.inputList = Array.from(this.form.querySelectorAll(this.settings.inputSelector));
        this.buttonElement = this.form.querySelector(this.settings.submitButtonSelector);
       // this._preventDefault = this._preventDefault.bind(this);
        //this._resetForm = this._resetForm.bind(this);
        this._handleInput = this._handleInput.bind(this);
    }
    _hasInvalidInput() {
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    //_preventDefault(event) {
    //    event.preventDefault();
    //}

    _setEventListener() {
       // this.form.addEventListener('reset', this._resetForm);

        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => this._handleInput(inputElement));
        });
    }
    _handleInput(inputElement) {
        this. _inputValidity(inputElement);
        this.toggleButtonState();
    }
    _inputValidity(inputElement) {
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

    enableValidation() {
        this._setEventListener();
        this.toggleButtonState();
    }
    
    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.buttonElement.classList.add(this.settings.inactiveButtonClass);
            this.buttonElement.setAttribute('disabled', true);
        } else {
            this.buttonElement.classList.remove(this.settings.inactiveButtonClass);
            this.buttonElement.removeAttribute('disabled');
        }
    }
    
   resetErrors() {
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      });
  }
}

export default FormValidator;