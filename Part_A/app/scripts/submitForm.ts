import { addProduct } from './helpers/addProduct';

document.querySelector('form')?.addEventListener('submit', (e) => {
	e.preventDefault();

	console.log('submitting');

	const form = e.target as HTMLFormElement;
	const name = (form.elements.namedItem('productName') as HTMLInputElement)
		.value;

	return addProduct(name);
});
