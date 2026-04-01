import { getDatabaseProducts } from './getDatabaseProducts.js';
import {
  avaliableProducts,
  database,
} from '../services/itemStorage.service.js';
import { generateId } from './generateId.js';

export function addProduct(productName: string, quantity: number) {
  // Checks if there is a product in available products array that matches the productName
  if (
    !productName &&
    !avaliableProducts.some((product) => product.name === productName)
  ) {
    console.warn('Product name does not match available products!');
    return;
  }

  // Returns product object that is equal to productName
  const product = avaliableProducts.find(
    (product) => product.name === productName,
  );

  if (!product) return { error: 'Product cannot be found' };

  // Adds product to database with session ID for unique identification
  const newItem = {
    sessionId: generateId(),
    item: { ...product, quantity },
  };
  database.push(newItem);

  // Get all pre-existing items from window to keep items persisting
  const existingItems: Object[] = JSON.parse(
    window.localStorage.getItem('stored items') || '[]',
  );

  // Add the new item before setting window localStorage
  existingItems.push(newItem);
  window.localStorage.setItem('stored items', JSON.stringify(existingItems));

  return {
    data: getDatabaseProducts(),
    success: 'Product has been added to cart',
  };
}
