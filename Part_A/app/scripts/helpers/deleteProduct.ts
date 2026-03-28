import { database } from '../itemStorage';

export function deleteProduct(productName: string) {
	if (!productName || typeof productName !== 'string') return;

	// Checks if there is a product in available products array that matches the productName
	if (!database.some((product) => product.item.name === productName)) {
		console.warn('Product name does not match available products!');
		return;
	}

	// Returns product object that is equal to productName
	const product = database.find(
		(product) => product.item.name === productName,
	);

	if (!product) return;

	console.log(
		database.findIndex((product) => product.item.name === productName),
	);
}
