import { avaliableProducts } from './itemStorage.js';

export function getItems(
	targetElement?: string,
	errorMsg?: string,
) {
	let listItem;

	try {
		// If elements are given to mutate change innerHtml OTHERWISE return all products in list
		if (targetElement || errorMsg) {
			const error = document.getElementById(
				errorMsg || '',
			);
			const list = document.querySelector(
				targetElement || '',
			) as HTMLUListElement;

			if (!error || !list) {
				console.warn(
					'Selected elements cannot be found in document.',
				);
				return [];
			}

			// Checks if database exists or the length is equal to
			if (
				(!avaliableProducts ||
					avaliableProducts.length === 0) &&
				errorMsg
			) {
				console.warn(
					'There are no items in the list.',
				);
				list.style.display = 'none';
				error.innerHTML =
					'No products in the product list.';
				error.style.color = 'red';
				error.style.display = 'block';
				return [];
			}

			// Iterate through each name, creating a new array with the names
			const products = avaliableProducts.map(
				(item) => item,
			);

			if (!products) {
				console.error(
					'Returned early as products array does not exist',
				);
				return [];
			}

			for (const item of products) {
				listItem = document.createElement('li');
				listItem.innerHTML = item.name;
				list.append(listItem);
			}

			return [];
		}

		// Checks if database exists or the length is equal to
		if (
			(!avaliableProducts ||
				avaliableProducts.length === 0) &&
			errorMsg
		) {
			console.warn('There are no items in the list.');
			return;
		}

		for (const item of avaliableProducts) {
			listItem = document.createElement('li');
			listItem.innerHTML = item.name;
			(
				document.querySelector(
					'.product-items-list',
				) as HTMLUListElement
			)?.append(listItem);
		}

		console.log(1)

		return avaliableProducts;
	} catch (error) {
		console.warn(error);
	}
}

(() => {
	document.addEventListener('DOMContentLoaded', () => {
		getItems();
	});
})();