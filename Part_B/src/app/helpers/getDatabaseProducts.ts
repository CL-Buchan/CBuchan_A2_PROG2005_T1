import { database } from '../services/itemStorage.service.js';

export function getDatabaseProducts() {
  // Checks if database exists or the length is equal to 0
  if (!database || database.length === 0) {
    console.warn('There are no items in the database.');
    return { data: [] };
  }

  return { data: database };
}
