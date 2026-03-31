import { avaliableProducts } from '../services/itemStorage.service.js';

export function getItems() {
  // Checks if database exists or the length is equal to
  if (!avaliableProducts || avaliableProducts.length === 0) {
    return { error: 'There are no items in the list' };
  }

  // Iterate through each name, creating a new array with the names
  const products = avaliableProducts.map((item) => item);

  if (!products) {
    return { error: 'Returned early as products array does not exist' };
  }

  return { data: avaliableProducts };
}
