import { watcher } from './helpers/watcher.js';
import { avaliableProducts } from './itemStorage.js';

export function getItems() {
	let listItem;
	const errorMsg = document.getElementById('no-items-error');
	const productList = document.querySelector(
		'.product-items-list',
	) as HTMLUListElement;

	if (!errorMsg) return console.warn('No error message available.');

	// Checks if database exists or the length is equal to
	if ((!avaliableProducts || avaliableProducts.length === 0) && errorMsg) {
		console.warn('There are no items in the list.');
		productList.style.display = 'none';
		errorMsg.innerHTML = 'No products in the product list.';
		errorMsg.style.color = 'red';
		errorMsg.style.display = 'block';
		return;
	}

	// Iterate through each name, creating a new array with the names
	const products = avaliableProducts.map((item) => item);

	if (!products)
		return console.error(
			'Returned early as products array does not exist',
		);

	for (const item of products) {
		listItem = document.createElement('li');
		listItem.innerHTML = item.name;
		productList.append(listItem);
	}

	return;
}

// Using an IIFE func to ensure getProducts() runs straight away
// (async () => {
// 	try {
// 		getItems();
// 		await watcher(avaliableProducts, () => getItems());
// 	} catch (error) {
// 		console.warn(error);
// 	}
// })();

(() => {
	getItems();
})();
