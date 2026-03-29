import {
	avaliableProducts,
	database,
} from './itemStorage.js';
import type { DatabaseItem } from '../../types/types.js';

let storedItems: DatabaseItem[] = [];
let numberOfWindowLoads: number = 0;

window.addEventListener('load', () => {
	const windowStoredProducts =
		window.localStorage.getItem('stored items');
	console.log(
		'window products:',
		JSON.parse(windowStoredProducts || ''),
	);

	if (windowStoredProducts !== null) {
		numberOfWindowLoads++;
		storedItems = JSON.parse(windowStoredProducts);

		// Creates a unique array using set to remove duplicates
		const existingNames = new Set(
			database.map((d) => d.item.name),
		);

		// Filter is used to removed duplicate names where name is not item.name or has item.name
		storedItems
			.filter(
				(item) =>
					!existingNames.has(item.item.name),
			)
			.forEach((item) => database.push(item));
		countDatabaseItems();
	}
});

export function countDatabaseItems() {
	const itemCount = document.getElementById('item-count');

	if (
		itemCount &&
		storedItems &&
		storedItems.length > 0
	) {
		if (
			numberOfWindowLoads > 1 &&
			avaliableProducts.some((item) =>
				storedItems.some(
					(product) =>
						item.name === product.item.name,
				),
			)
		) {
			storedItems.map((item) => database.push(item));
			itemCount.style.color = 'green';
			itemCount.innerHTML = document.createElement(
				'p',
			).innerText = database.length.toString();
			return;
		}
	}

	if (!database || database.length === 0) {
		itemCount!.style.color = 'red';
		itemCount!.innerHTML = document.createElement(
			'p',
		).innerText = database.length.toString();
		return;
	}

	if (itemCount) {
		itemCount.style.color = 'green';
		itemCount.innerHTML = document.createElement(
			'p',
		).innerText = database.length.toString();
	}

	return;
}

(() => {
	countDatabaseItems();
})();
