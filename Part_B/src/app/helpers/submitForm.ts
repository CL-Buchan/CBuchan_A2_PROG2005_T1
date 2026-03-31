import { avaliableProducts } from "../services/itemStorage.service";
import { addProduct } from "./addProduct";
import { deleteProduct } from "./deleteProduct";
import { getDatabaseProducts } from "./getDatabaseProducts";

export function submitForm(name: string, quantity: number, action: string) {
  if (!avaliableProducts.some((item) => item.name === name)) {
    return { error: 'Invalid product' };
  }

  if (action === 'add') {
    addProduct(name, quantity);
    getDatabaseProducts();
    return { success: `${name} added` };
  }

  if (action === 'remove') {
    deleteProduct(name);
    getDatabaseProducts();
    return { success: `${name} removed` };
  }

  return { error: 'Invalid action' };
}
