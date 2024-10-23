export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._container = document.querySelector(container);
    this._renderer = renderer;
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear();
    this._items.forEach((element) => {
      this._renderer(element);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
