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

  // Returns product object that is equal to productName
  const product = database.find(
    (product: DatabaseItem) => product.item.name === productName,
  );

  if (!product) return { error: 'No product found' };

  return { data: product };
}
