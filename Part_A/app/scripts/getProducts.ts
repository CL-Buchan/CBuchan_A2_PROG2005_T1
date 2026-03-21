import { database } from './itemStorage';
import type { Item } from './types/types';

export function getProducts() {
	const productList = document.querySelector(
		'.product-list',
	) as HTMLUListElement;

      // Checks if database exists or the length is equal to 
	if (!database || database.length === 0)
		return console.warn('There are no items in the database.');

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
