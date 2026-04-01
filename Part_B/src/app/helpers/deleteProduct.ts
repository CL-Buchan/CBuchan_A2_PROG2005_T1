import { database } from '../services/itemStorage.service.js';
import type { DatabaseItem } from '../types/types.js';

export function deleteProduct(productName: string) {
  // Checks if there is a product in available products array that matches the productName
  if (
    !productName &&
    !database.some((product: DatabaseItem) => product.item.name === productName)
  ) {
    return { error: 'Product name does not match available products!' };
  }

  let product: DatabaseItem;

  // Checks if database exists before finding and removing the product from database array using splice(index, amount)
  if (database && database.length > 0) {
    const foundProduct = database.find(
      (product: DatabaseItem) => product.item.name === productName,
    );

    foundProduct ? (product = foundProduct) : '';

    const productIndex = database.findIndex(
      (item) => item.item.name === product.item.name,
    );

    // Returns if product index is -1 === not found
    if (productIndex === -1) return { error: 'Product index not found' };

    // Remove product and the quantity of 1
    database.splice(productIndex, 1);
  }

  // Get existing items again from local storage before overwriting window local storage
  const existingItems = JSON.parse(
    window.localStorage.getItem('stored items') || '[]',
  );

  // Remove the product by making a new array where products do not equal product name
  const updatedItems = existingItems.filter(
    (item: DatabaseItem) => item.item.name !== product.item.name,
  );

  window.localStorage.setItem('stored items', JSON.stringify(updatedItems));

  return { success: `${productName} has been removed from storage!` };
}
