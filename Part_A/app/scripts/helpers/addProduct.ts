import { getDatabaseProducts } from './getDatabaseProducts.js';
import {
	avaliableProducts,
	database,
} from './itemStorage.js';
import { countDatabaseItems } from './countDatabaseItems.js';
import { generateId } from './generateId.js';

export function addProduct(
	productName: string,
	quantity: number,
) {
	console.log('add product functions started');
	try {
		if (!productName || typeof productName !== 'string')
			return;

		// Checks if there is a product in available products array that matches the productName
		if (
			!avaliableProducts.some(
				(product) => product.name === productName,
			)
		) {
			console.warn(
				'Product name does not match available products!',
			);
			return;
		}

		// Returns product object that is equal to productName
		const product = avaliableProducts.find(
			(product) => product.name === productName,
		);

		if (!product) return;

		// Adds product to database with session ID for unique identification
		database.push({
			sessionId: generateId(),
			item: { ...product, quantity: quantity },
		});

		window.localStorage.setItem(
			'stored items',
			JSON.stringify(database),
		);
		console.log(
			'stored in local storage:',
			window.localStorage.getItem('stored items'),
		);

		countDatabaseItems();
		getDatabaseProducts();
	} catch (error) {
		console.warn(error);
	}
}
