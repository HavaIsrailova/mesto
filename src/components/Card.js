class Card {
	constructor({data, handleCardClick}, cardTemplateSelector) {
		this.data = data;
		this.cardTemplate = document.querySelector(cardTemplateSelector);
		this._elementLikeToggle = this._elementLikeToggle.bind(this);
		this._openImage = this._openImage.bind(this);
		this._deleteImage = this._deleteImage.bind(this);
		this._handleCardClick = handleCardClick;
	}

	_initCard() {
		this.cardElement = this.cardTemplate.content.cloneNode(true).querySelector('.element');
		const cardImage = this.cardElement.querySelector('.element__image');
		const cardTitle = this.cardElement.querySelector('.element__title');
		cardImage.src = this.data.link;
		cardImage.alt = this.data.name;
		cardTitle.textContent = this.data.name;
		this._image = cardImage; // получается только так 
	}
	viewCard() {
		this._initCard();
		this._elementLikeButton = this.cardElement.querySelector('.element__like');
		this._img = this.cardElement.querySelector('.element__image');
		this._elementDeleteButton = this.cardElement.querySelector('.element__delete');
		this._setEventListeners();
		return this.cardElement;
	}
	_deleteImage() {
		this.cardElement.remove();
		this.cardElement = null;
	}

	_setEventListeners() {
		this._elementLikeButton.addEventListener('click', this._elementLikeToggle);
		this._elementDeleteButton.addEventListener('click', this._deleteImage);
		this._img.addEventListener('click', this._openImage);
	}

	_elementLikeToggle() {
		this._elementLikeButton.classList.toggle('element__like_active');
	}
//пр8
	_openImage() {
		this._handleCardClick(this.data);
	}
}

export default Card;