import { database } from './itemStorage';

export function getProducts() {
	const errorMsg = document.getElementById('no-items-error');
	const productList = document.querySelector(
		'.product-list',
	) as HTMLUListElement;

      if (!errorMsg) return;

	// Checks if database exists or the length is equal to
	if (!database || database.length === 0) {
		console.warn('There are no items in the database.');
		productList.style.display = 'none';
		errorMsg!.innerHTML = 'No products in database';
		errorMsg!.style.display = 'block';
		return;
	}

	const listItem = document.createElement('li');

	// Iterate through each name, creating a new array with the names
	const products = database.map((item) => item.item.name);

	if (!products) return;

	// Iterates through each product name from the database and appends the list item to the product list
	for (const names of products) {
		listItem.innerHTML = names;
		productList.append(listItem);
	}

	return;
}
