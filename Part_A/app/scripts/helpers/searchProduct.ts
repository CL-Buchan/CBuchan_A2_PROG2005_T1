// searchProduct.js
import { getDatabaseProducts } from './getDatabaseProducts.js';
import { database } from './itemStorage.js';

let searchParam: string;
const input = document.getElementById(
	'searchBar',
) as HTMLInputElement;
const displayProducts = document.getElementById(
	'display-searched-products',
) as HTMLUListElement;
const errorMsg = document
	.querySelector('.search-product')
	?.querySelector('.error-msg') as HTMLElement;

if (input) {
	input.addEventListener('input', (e) => {
		searchParam = (e.target as HTMLInputElement).value;
	});
}

document
	.getElementById('searchBttn')
	?.addEventListener('click', () => {
		try {
			if (
				(errorMsg && !database) ||
				database.length === 0
			) {
				errorMsg.style.display = 'block';
				errorMsg.style.color = 'red';
				errorMsg.textContent =
					'There is no database products to search for. Please add a product and then try again.';
			}

			if (
				searchParam &&
				typeof searchParam === 'string'
			) {
				const items = getDatabaseProducts();

				if (errorMsg && items) {
					// Find product in array that matches by product name
					const foundProduct = items.filter(
						(product) =>
							product.item.name.toLowerCase() ===
								searchParam.toLowerCase() ||
							product.item.name
								.toLowerCase()
								.includes(
									searchParam.toLowerCase(),
								),
					);

					if (foundProduct.length > 0) {
						displayProducts.parentElement!.style.display =
							'flex';
						foundProduct.map(
							(product) =>
								(displayProducts.innerHTML =
									document.createElement(
										'li',
									).innerHTML =
										product.item.name),
						);

						errorMsg.style.display = 'block';
						errorMsg.style.color = 'green';
						errorMsg.textContent = `${foundProduct[0]?.item.name} has been successfully found in the database!`;
						return foundProduct;
					}

					errorMsg.style.display = 'block';
					errorMsg.style.color = 'red';
					errorMsg.textContent =
						'No product has been found, please try again.';
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
