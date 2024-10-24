import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.imageElement = this.popupElement.querySelector(".popup__image");
    this.captionElement = this.popupElement.querySelector(
      ".popup__title-small"
    );
  }

  open({ link, name }) {
    this.imageElement.src = link;
    this.imageElement.alt = name;
    this.captionElement.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
