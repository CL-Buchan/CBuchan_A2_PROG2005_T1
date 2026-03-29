import { database } from './itemStorage.js';
import type {
	DatabaseItem,
	Product,
} from './types/types.js';

export function getDatabaseProducts(
	target?: string,
	errorMsg?: string,
) {
	let listItem;

	try {
		if (target || errorMsg) {
			const error = document.getElementById(
				errorMsg || '',
			) as HTMLElement;
			const list = document.querySelector(
				target || '',
			) as HTMLUListElement;

			if (!error || !list) {
				console.warn(
					'Selected elements cannot be found in document.',
				);
				return [];
			}

			// Checks if database exists or the length is equal to
			if (
				(!database || database.length === 0) &&
				errorMsg
			) {
				console.warn(
					'There are no items in the database.',
				);
				list.style.display = 'none';
				error.innerHTML = 'No products in database';
				error.style.color = 'red';
				error.style.display = 'block';
				return [];
			}

			error.style.display = 'none';
			list.style.display = 'block';

			// Iterate through each name, creating a new array with the names
			const products = database.map(
				(item: DatabaseItem) => item,
			);

			if (!products) {
				console.error(
					'Returned early as products array does not exist',
				);
				return [];
			}

			console.log(
				'database length: ',
				database.length,
			);

			// Iterates through each product name from the database and appends the list item to the product list
			for (const product of products) {
				listItem = document.createElement('li');
				listItem.innerHTML = product.item.name;
				list.append(listItem);
			}

			return [];
		}

		// Checks if database exists or the length is equal to
		if (!database || database.length === 0) {
			console.warn(
				'There are no items in the database.',
			);
			return [];
		}

		// If no target, just display products anyway
		for (const product of database) {
			listItem = document.createElement('li');
			listItem.innerHTML = product.item.name;
			document
				.getElementById('product-list')
				?.append(listItem);
			document
				.getElementById('display-all-produts')
				?.append(listItem);
		}

		return database;
	} catch (error) {
		console.warn(error);
	}
}

(() => {
	getDatabaseProducts();
})();
