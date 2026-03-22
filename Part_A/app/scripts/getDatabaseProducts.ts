import { watcher } from './helpers/watcher';
import { database } from './itemStorage';

export function getDatabaseProducts() {
	let listItem;
	const errorMsg = document.getElementById('no-products-error');
	const productList = document.querySelector(
		'.product-list',
	) as HTMLUListElement;

	if (!errorMsg) return console.warn('No error message available.');

	// Checks if database exists or the length is equal to
	if ((!database || database.length === 0) && errorMsg) {
		console.warn('There are no items in the database.');
		productList.style.display = 'none';
		errorMsg.innerHTML = 'No products in database';
		errorMsg.style.color = 'red';
		errorMsg.style.display = 'block';
		return;
	}

	errorMsg.style.display = 'none';
	productList.style.display = 'block';

	// Iterate through each name, creating a new array with the names
	const products = database.map((item) => item);

	if (!products)
		return console.error(
			'Returned early as products array does not exist',
		);

	console.log('database length: ', database.length);

	// Iterates through each product name from the database and appends the list item to the product list
	for (const product of products) {
		listItem = document.createElement('li');
		listItem.innerHTML = product.item.name;
		productList.append(listItem);
	}

	return;
}

// Using an IIFE func to ensure getProducts() runs straight away
// (async () => {
// 	try {
// 		getDatabaseProducts();
// 		await watcher(database, () => getDatabaseProducts());
// 	} catch (error) {
// 		console.warn(error);
// 	}
// })();

(() => {
	getDatabaseProducts();
})();
