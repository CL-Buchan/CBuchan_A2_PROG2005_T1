import { database } from '../services/itemStorage.service';
import { DatabaseItem, ProductNames } from '../types/types';
import { generateId } from './generateId';

export function updateItem(
  productName: ProductNames,
  details: {
    productName: string;
    productQuantity: number;
  },
) {
  if (!productName) return { error: 'Cannot access product name' };

  const foundDatabaseProduct = database.find(
    (product: DatabaseItem) => product.item.name === productName,
  );

  const existingItems = JSON.parse(
    window.localStorage.getItem('stored items') || '[]',
  );

  const foundStorageProduct = existingItems.find(
    (product: DatabaseItem) => product.item.name === productName,
  );

  if (!foundDatabaseProduct || !foundStorageProduct) {
    return { error: 'Cannot find product in database' };
  }

  let newItem: DatabaseItem | null = null;

  if (foundDatabaseProduct) {
    newItem = {
      sessionId: generateId(),
      item: {
        ...foundDatabaseProduct.item,
        quantity: details.productQuantity,
      },
    };
  }

  if (foundStorageProduct) {
    newItem = {
      sessionId: generateId(),
      item: {
        ...foundStorageProduct.item,
        name: details.productName,
        quantity: details.productQuantity,
      },
    };
  }

  // Remove product instances from current storage
  database.splice(
    database.findIndex((product) => product.item.name == productName),
    1,
  );

  window.localStorage.setItem(
    'stored items',
    JSON.stringify(
      existingItems.filter(
        (product: DatabaseItem) => product.item.name !== productName,
      ),
    ),
  );

  return { success: `${newItem?.item.name} has been removed from storage!` };
}
