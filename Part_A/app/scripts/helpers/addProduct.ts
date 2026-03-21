import { avaliableProducts, database } from '../itemStorage';
import type { ProductNames } from '../types/types';

export function addProduct(productName: string) {
	if (!productName || typeof productName !== 'string') return;

	if (!database || database.length === 0) {
		console.log('There a currently no products in the database.');
		return;
	}

	const products = avaliableProducts.map((product) => product.name);
	console.log(products.map((name) => name));

	// if (productName !== )
}
