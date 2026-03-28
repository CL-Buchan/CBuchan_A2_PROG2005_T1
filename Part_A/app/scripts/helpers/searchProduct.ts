// searchProduct.js
import { getItems } from '../getItems.js';

let searchParam: string;
const input = document.getElementById('searchBar') as HTMLInputElement;
const displayProducts = document.getElementById(
	'display-searched-products',
) as HTMLUListElement;

if (input) {
	input.addEventListener('input', (e) => {
		searchParam = (e.target as HTMLInputElement).value;
		console.log(searchParam);
	});
}

document.getElementById('searchBttn')?.addEventListener('click', () => {
	try {
		if (!getItems() || getItems() === undefined || null) {
			console.warn('Cannot get items from available items.');
			return [];
		}

		if (searchParam && typeof searchParam === 'string') {
			const items = getItems();

			if (items) {
				// Find product in array that matches by product name
				const foundProduct = items.filter(
					(product) =>
						product.name.toLowerCase() ===
							searchParam.toLowerCase() ||
						product.name
							.toLowerCase()
							.includes(searchParam.toLowerCase()),
				);

				if (!foundProduct) {
					console.warn(
						'No product matches the searched product.',
					);
					return [];
				}

				displayProducts.style.display = 'block';
				foundProduct.map(
					(product) =>
						(displayProducts.innerHTML =
							document.createElement(
								'li',
							).innerHTML =
								product.name),
				);
				console.log(1);
				console.log(foundProduct);
				return foundProduct;
			}

			console.log(2);
			return [];
		}
		console.log(3);
		return [];
	} catch (error) {
		console.warn(error);
	}
});
