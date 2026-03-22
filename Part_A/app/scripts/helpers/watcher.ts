export function watcher(item: Object | Array<Object[] | string[]>) {
	// Return early if type of item !== object or array (object array or string array)
	if (!item || typeof item !== 'object' || typeof item !== typeof Array)
		return console.warn(
			'Item does not exist, please re-enter a valid item.',
		);

	// Store intial instance of item
	const initialParsedItem = item;

	// Check the array/and or object at regular intervals for changes
	setInterval(() => {
		if (item === initialParsedItem)
			return console.warn('No changes detected!');

            return item;
	}, 10);
}
