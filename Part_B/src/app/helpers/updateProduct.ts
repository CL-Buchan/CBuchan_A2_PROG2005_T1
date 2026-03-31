import { database, avaliableProducts } from '../services/itemStorage.service';
import type { DatabaseItem } from '../types/types';

export function updateProduct(details: {
  productName: string;
  productManufacturer?: string;
  productQuantity: number;
}) {
  if (!details.productName) return { error: 'No product name provided' };

  // Filters out and removes target item from the database, creating a new array
  const updatedDatabase: DatabaseItem[] = database.filter(
    (databaseItem) => databaseItem.item.name !== details.productName,
  );

  // Finds available product that matches productName (get same structure)
  const template = avaliableProducts.find(
    (product) => product.name === details.productName,
  );

  if (!template) return { error: 'Product template not found' };

  // Create a new database item to push to the database
  const newItem: DatabaseItem = {
    sessionId: Date.now(),
    item: {
      ...template,
      quantity: details.productQuantity,
      supplierName: details.productManufacturer || template.supplierName,
    },
  };

  // Clear the old database and unpack the previous database items back in, with the new item last
  database.splice(0, database.length, ...updatedDatabase, newItem);

  return { success: `${details.productName} updated` };
}