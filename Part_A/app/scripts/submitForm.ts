import { getDatabaseProducts } from './getDatabaseProducts.js';
import { addProduct } from './helpers/addProduct.js';
import { avaliableProducts } from './itemStorage.js';

let productName;

// Enters string as its being typed out
(() => {
	document.querySelector('form')?.addEventListener('input', (e) => {
		productName = (e.target as HTMLInputElement).value;
	});
})();

document.querySelector('form')?.addEventListener('submit', (e) => {
	e.preventDefault();

	let msg;
	let errorMsg = document.getElementById('form-error-msg');
	const form = e.target as HTMLFormElement;
	const name = form.elements.namedItem('productName') as HTMLInputElement;

	try {
		// Checks if form elements exist and for errorMsg exists before display error msg
		if (!form.elements && errorMsg) {
			msg = 'Please enter values into each input section.';
			errorMsg.innerHTML = msg;
			errorMsg.style.color = 'red';
			errorMsg.style.display = 'block';
			return;
		}

		if (
			avaliableProducts.some(
				(item) =>
					item.name ===
					(
						form.elements.namedItem(
							'productName',
						) as HTMLInputElement
					).value,
			)
		) {
			// Runs addProduct helper func
			addProduct(name.value);

			// Run to re-render products and items in lists
			getDatabaseProducts();

			console.log(
				`${name.value} has been entered to the database.`,
			);
			msg = 'Products have been successfully entered!';
			errorMsg!.innerHTML = msg;
			errorMsg!.style.color = 'green';
			errorMsg!.style.display = 'block';
			return;
		}

		console.warn('Product does not exist as an available items.');
		msg =
			'The product you have entered is not a valid product. Please choose from the list.';
		errorMsg!.innerHTML = msg;
		errorMsg!.style.color = 'red';
		errorMsg!.style.display = 'block';
		return;
	} catch (error) {
		console.warn('Error adding products to storage: ', error);
		msg = 'Error adding products to storage...';
		errorMsg!.innerHTML = msg;
		errorMsg!.style.color = 'red';
		errorMsg!.style.display = 'block';
	}
});
