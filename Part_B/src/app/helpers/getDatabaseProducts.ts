import { database } from "../services/itemStorage.service";
import { DatabaseItem } from "../types/types";

export function getDatabaseProducts() {
  if (database && database.length > 0) {
    return { data: database };
  }

  const rawItems = window.localStorage.getItem('stored items');
  if (!rawItems) return { data: [] };

  const storedItems: DatabaseItem[] = JSON.parse(rawItems);

  return { data: storedItems };
}
