import { Injectable } from '@angular/core';
import type { DatabaseItem } from '../types/types.js';

// Uses injectable to make this class accessible application-wide (for component functions)
@Injectable({ providedIn: 'root' })
export class DatabaseService {
  database: DatabaseItem[] = [];
  storedItems: DatabaseItem[] = [];
  numberOfWindowLoads = 0;

  constructor() {
    const saved = localStorage.getItem('stored items');
    if (saved) {
      this.numberOfWindowLoads++;
      this.storedItems = JSON.parse(saved);
      this.mergeStoredItems();
    }
  }

  // Creates a set so names are unique and there are no duplicate entries
  mergeStoredItems() {
    const existingNames = new Set(this.database.map((d) => d.item.name));

    // Filter is used to removed duplicate names where name is not item.name or has item.name
    this.storedItems
      .filter((item) => !existingNames.has(item.item.name))
      .forEach((item) => this.database.push(item));
  }

  getDatabaseLength(): number {
    return this.database.length;
  }

  getDatabaseColor(): string {
    return this.database.length === 0 ? 'red' : 'green';
  }
}