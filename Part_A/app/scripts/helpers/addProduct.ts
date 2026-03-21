import { avaliableProducts, database, productList } from '../itemStorage';
import { generateId } from './generateId';

export function addProduct(productName: string) {
	if (
		!productName ||
		typeof productName !== 'string' ||
		!productList.filter((item) => item === productName)
	)
		return;

	// Checks if there is a product in available products array that matches the productName
	if (!avaliableProducts.some((product) => product.name === productName)) {
		console.warn('Product name does not match available products!');
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
		item: product,
	});
}
