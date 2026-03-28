import { database } from '../itemStorage.js';
import type { DatabaseItem, Product } from '../types/types.js';

export function deleteProduct(productName: string) {
	try {
		if (!productName || typeof productName !== 'string') return;

		// Checks if there is a product in available products array that matches the productName
		if (
			!database.some(
				(product: DatabaseItem) => product.item.name === productName,
			)
		) {
			console.warn(
				'Product name does not match available products!',
			);
			return;
		}

		// Returns product object that is equal to productName
		const product = database.find(
			(product: DatabaseItem) => product.item.name === productName,
		);

		if (!product) return;

		console.log(
			database.findIndex(
				(product: DatabaseItem) => product.item.name === productName,
			),
		);
	} catch (error) {
		console.warn(error);
	}
}
