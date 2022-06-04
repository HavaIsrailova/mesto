//экспорт вниз
class Card {
	constructor(data, templateSelector) {
		this.data = data;
		this.templateSelector = templateSelector;
		this.popupPicture = document.querySelector('.popup__picture');
		this.popupPictureTitle = document.querySelector('.popup__picture-title');
		this.popupPictureView = document.querySelector('.popup_picture-viewport');
		this._elementLikeToggle = this._elementLikeToggle.bind(this);
		this._openImage = this._openImage.bind(this);
		this._deleteImage = this._deleteImage.bind(this);
	}
	viewCard() {
		this._initCard();
		this._image = this.imageElement.querySelector('.element__image');
		this._elementLikeButton = this.imageElement.querySelector('.element__like');
		this._elementDeleteButton = this.imageElement.querySelector('.element__delete');
		this._setEventListeners();
		return this.imageElement;
	}
	_deleteImage() {
		this.imageElement.remove();
		this.imageElement = '';
	}
	_initCard() {
		this.imageElement = this.templateSelector.content.cloneNode(true).querySelector('.element');
		const cardImage = this.imageElement.querySelector('.element__image');
		const cardTitle = this.imageElement.querySelector('.element__title');
		cardImage.src = this.data.link;
		cardImage.alt = this.data.name;
		cardTitle.textContent = this.data.name;
	}

	_setEventListeners() {
		this._image.addEventListener('click', this._openImage);
		this._elementLikeButton.addEventListener('click', this._elementLikeToggle);
		this._elementDeleteButton.addEventListener('click', this._deleteImage);
	}

	_elementLikeToggle() {
		this._elementLikeButton.classList.toggle('element__like_active');
	}

	_openImage() {
		this.popupPicture.src = this.data.link
		this.popupPicture.alt = this.data.name
		this.popupPictureTitle.textContent = this.data.name
		this.openPopup(this.popupPictureView)
	}
}
export default Card;