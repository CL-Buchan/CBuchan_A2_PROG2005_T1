export function watcher(
	item: object | object[] | string[],
	action?: () => void,
) {
	// Return early if type of item !== object or array (object array or string array)
	if (!item || typeof item !== 'object' && !Array.isArray(item))
		return console.warn(
			'Item does not exist, please re-enter a valid item.',
		);

	// Store intial instance of item
	const initialParsedItem = JSON.stringify(item);

	// Check the array/and or object at regular intervals for changes, wrapped in a promise to finish when condition is met
	return new Promise((resolve) => {
		setInterval(() => {
			if (JSON.stringify(item) === initialParsedItem)
				return console.warn('No changes detected!');

			// Run action if changes are detected
			if (action) {
				action();
				console.log('action initialised');
				resolve({
					success: 200,
					message: 'Action has been intiated.',
				});
			}

                  console.log('item resolved');
			resolve({
				success: 200,
				data: item,
				message: 'New item delivered.',
			});
		}, 100);
	});
}
