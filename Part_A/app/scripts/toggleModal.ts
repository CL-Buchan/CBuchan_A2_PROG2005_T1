let isOpen = false;

export function toggleModal(open: boolean, target: string) {
	const main = document.querySelector(
		'main',
	) as HTMLElement;
	const container = document.getElementById(
		target,
	) as HTMLDivElement;
	if (!main || !container) return;

	container.style.display = open ? 'flex' : 'none';
	main.classList.toggle('blurred', open);
	isOpen = open;
}

document
	.querySelector('.open-modal')
	?.addEventListener('click', (e) => {
		// Using stopPropogation to stop from event from reaching the window
		e.stopPropagation();

		isOpen = !isOpen;
		toggleModal(isOpen, 'manage-products-container');
	});

// Added event listener to check for clicks outside of the target div area, then close modal (absolute pop-up div)
window.addEventListener('click', (e) => {
	const container = document.getElementById(
		'manage-products-container',
	);
	if (!container) return;

	const clickedOutside = !container.contains(
		e.target as Node,
	);
	if (clickedOutside && isOpen) {
		toggleModal(false, 'manage-products-container');
	}
});
