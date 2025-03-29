import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Exporte a interface
export interface TableItem {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private itemsSubject = new BehaviorSubject<TableItem[]>([
    { id: 1, name: 'Item 1', description: 'Descrição do item 1' },
    { id: 2, name: 'Item 2', description: 'Descrição do item 2' },
    { id: 3, name: 'Item 3', description: 'Descrição do item 3' }
  ]);
  
  items$ = this.itemsSubject.asObservable();

  constructor() {}

  getItems(): TableItem[] {
    return this.itemsSubject.value;
  }

  addItem(item: TableItem): void {
    const currentItems = this.itemsSubject.value;
    this.itemsSubject.next([...currentItems, item]);
  }

  updateItem(updatedItem: TableItem): void {
    const currentItems = this.itemsSubject.value;
    this.itemsSubject.next(
      currentItems.map(item => item.id === updatedItem.id ? updatedItem : item)
    );
  }

  removeItem(id: number): void {
    const currentItems = this.itemsSubject.value;
    this.itemsSubject.next(currentItems.filter(item => item.id !== id));
  }
}