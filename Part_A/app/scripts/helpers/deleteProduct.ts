import { database } from './itemStorage.js';
import type { DatabaseItem, Product } from '../../types/types.js';

export function deleteProduct(productName: string) {
	try {
		if (!productName || typeof productName !== 'string') return;

		// Checks if there is a product in available products array that matches the productName
		if (
			!database.some(
				(product: DatabaseItem) =>
					product.item.name === productName,
			)
		) {
			console.warn(
				'Product name does not match available products!',
			);
			return;
		}

		// Returns product object that is equal to productName
		const product = database.findIndex(
			(product: DatabaseItem) => product.item.name === productName,
		);

		if (!product) return;

		database.splice(product, 1);

		// Get existing items again from local storage before overwriting window local storage
		const existingItems = JSON.parse(
			window.localStorage.getItem('stored items') || '[]',
		);

		const updatedItems = existingItems.filter(
			(product: DatabaseItem) =>
				product.item.name !== product.item.name,
		);

		window.localStorage.setItem(
			'stored items',
			JSON.stringify(updatedItems),
		);

		console.log("Product deleted!")
	} catch (error) {
		console.warn(error);
	}
}
