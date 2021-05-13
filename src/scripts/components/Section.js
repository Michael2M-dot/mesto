/*
Класс `Section`, который отвечает за отрисовку элементов на странице.

- Первым параметром конструктора принимает объект с двумя свойствами: `items` и `renderer`.
Свойство `items` — это массив данных, которые нужно добавить на страницу при инициализации класса.
Свойство `renderer` — это функция, которая отвечает за создание и отрисовку данных на странице.
- Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
- Содержит публичный метод, который отвечает за отрисовку всех элементов.
Отрисовка каждого отдельного элемента должна осуществляться функцией `renderer`.
- Содержит публичный метод `addItem`, который принимает DOM-элемент и добавляет его в контейнер.

У класса `Section` нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
*/


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