import { getDatabaseProducts } from './getDatabaseProducts.js';
import { addProduct } from './addProduct.js';
import { deleteProduct } from './deleteProduct.js';
import { generateId } from './generateId.js';
import {
	avaliableProducts,
	database,
} from './itemStorage.js';
import type { DatabaseItem } from '../../types/types.js';

let productName;

// Enters string as its being typed out
(() => {
	document
		.querySelector('form')
		?.addEventListener('input', (e) => {
			productName = (e.target as HTMLInputElement)
				.value;
		});
})();

document
	.querySelector('form')
	?.addEventListener('submit', (e) => {
		e.preventDefault();

		let msg;
		let errorMsg = document.getElementById(
			'form-error-msg',
		);
		const form = e.target as HTMLFormElement;
		const name = form.elements.namedItem(
			'productName',
		) as HTMLInputElement;

		try {
			// Checks if form elements exist and for errorMsg exists before display error msg
			if (!form.elements && errorMsg) {
				msg =
					'Please enter values into each input section.';
				errorMsg.innerHTML = msg;
				errorMsg.style.color = 'red';
				errorMsg.style.display = 'block';
				return;
			}

			// Check for if name exists in available products first
			if (
				!avaliableProducts.some(
					(item) =>
						item.name ===
						(
							form.elements.namedItem(
								'productName',
							) as HTMLInputElement
						).value,
				)
			)
				return;

			// Execute functions depending on the selected option value (update, add, remove)
			if (
				(
					form.elements.namedItem(
						'dropdown',
					) as HTMLSelectElement
				).value === 'add'
			) {
				// Runs addProduct helper func
				addProduct(
					name.value,
					Number(
						(
							form.elements.namedItem(
								'productQuantity',
							) as HTMLInputElement
						).value,
					),
				);

				// Run to re-render products and items in lists
				getDatabaseProducts();
				console.log(
					`${name.value} has been entered to the database.`,
				);
				errorMsg!.innerHTML = `${name.value} have been successfully entered!`;
				errorMsg!.style.color = 'green';
				errorMsg!.style.display = 'block';
				return;
			} else if (
				(
					form.elements.namedItem(
						'dropdown',
					) as HTMLSelectElement
				).value === 'remove'
			) {
				deleteProduct(name.value);

				// Run to re-render products and items in lists
				getDatabaseProducts();
				console.log(
					`${name.value} has been removed from the database.`,
				);
				errorMsg!.innerHTML = `${name.value} have been successfully been removed from the database!`;
				errorMsg!.style.color = 'green';
				errorMsg!.style.display = 'block';
			} else if (
				(
					form.elements.namedItem(
						'dropdown',
					) as HTMLSelectElement
				).value === 'update'
			) {
				console.log(
					database.find(
						(product) =>
							product.item.name ===
							name.value,
					),
				);
				console.log(
					database.filter(
						(product) =>
							product.item.name ===
							name.value,
					),
				);
				// const foundProduct = database.find((product) => product.item.name === name.value);
				// const updatedProduct = {
				// 	...foundProduct,
				// 	quantity,
				// };
			}

			console.warn(
				'Product does not exist as an available items.',
			);
			errorMsg!.innerHTML =
				'The product you have entered is not a valid product. Please choose from the list.';
			errorMsg!.style.color = 'red';
			errorMsg!.style.display = 'block';
			return;
		} catch (error) {
			console.warn(
				'Error adding products to storage: ',
				error,
			);
			msg = 'Error adding products to storage...';
			errorMsg!.innerHTML = msg;
			errorMsg!.style.color = 'red';
			errorMsg!.style.display = 'block';
		}
	});
