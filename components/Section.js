//Класс, который отвечает за отрисовку элементов на странице

export default class Section {

	constructor({items, renderer}, containerSection) {
		this._renderedItems = items;
		this._renderer = renderer;
		this._cardSelector = containerSection;
	}

	renderItems() {
		this._renderedItems.forEach((item) => {
			this._renderer(item)
		})
	}

	addItem(element, isPrepend) {
		isPrepend ? this._cardSelector.prepend(element) : this._cardSelector.append(element);
	}
}