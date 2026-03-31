// searchProduct.js
import { DatabaseService } from './countDatabaseItems.js';

export function searchProduct(productName: string) {
  const db = new DatabaseService();
  const foundProduct = db.database.find(
    (product) => product.item.name === productName,
  );

  if (!foundProduct) return { error: 'No product found' };

  return { data: foundProduct };
}
