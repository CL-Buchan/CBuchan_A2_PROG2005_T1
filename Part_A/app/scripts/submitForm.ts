import { addProduct } from './helpers/addProduct';

document.querySelector('form')?.addEventListener('submit', (e) => {
	e.preventDefault();

	let msg;
	let errorMsg = document.getElementById('form-error-msg');
	const form = e.target as HTMLFormElement;
	const name = (form.elements.namedItem('productName') as HTMLInputElement)
		.value;

	try {
            // Checks if form elements exist and for errorMsg exists before display error msg
		if (!form.elements && errorMsg) {
			msg = 'Please enter values into each input section.';
			errorMsg.innerHTML = msg;
			errorMsg.style.color = 'red';
			errorMsg.style.display = 'block';
			return;
		}

            // Runs addProduct helper func
		addProduct(name);

		msg = 'Products have been successfully entered!';
		errorMsg!.innerHTML = msg;
		errorMsg!.style.color = 'green';
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
