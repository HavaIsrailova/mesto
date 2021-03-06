import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
		this._popupImage = this._popup.querySelector('.popup__picture');
		this._popupImageTitle = this._popup.querySelector('.popup__picture-title');
    }

    open(data) {        
		this._popupImage.src = data.link;
		this._popupImage.alt = data.name;
		this._popupImageTitle.textContent = data.name;
        super.open();
    }
}