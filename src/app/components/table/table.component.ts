import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditItemDialogComponent } from '../edit-item-dialog/edit-item-dialog.component';

interface TableItem {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: false
})
export class TableComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<TableItem>([
    { id: 1, name: 'Item 1', description: 'Descrição do item 1' },
    { id: 2, name: 'Item 2', description: 'Descrição do item 2' },
    { id: 3, name: 'Item 3', description: 'Descrição do item 3' }
  ]);

  constructor(public dialog: MatDialog) {}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(EditItemDialogComponent, {
      width: '400px',
      data: { 
        id: this.generateNewId(),
        name: '',
        description: '',
        isEdit: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }

  openEditDialog(item: TableItem): void {
    const dialogRef = this.dialog.open(EditItemDialogComponent, {
      width: '400px',
      data: { ...item, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = this.dataSource.data.map(item => 
          item.id === result.id ? result : item
        );
        this.dataSource.data = data;
      }
    });
  }

  removeItem(id: number): void {
    this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
  }

  private generateNewId(): number {
    return this.dataSource.data.length > 0 
      ? Math.max(...this.dataSource.data.map(item => item.id)) + 1 
      : 1;
  }
}