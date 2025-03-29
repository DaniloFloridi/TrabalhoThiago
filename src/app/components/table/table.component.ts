import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditItemDialogComponent } from '../edit-item-dialog/edit-item-dialog.component';
import { ItemsService, TableItem } from '../../items.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: false
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<TableItem>([]);

  constructor(
    public dialog: MatDialog,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.itemsService.items$.subscribe(items => {
      this.dataSource.data = items;
    });
  }

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
        this.itemsService.addItem(result);
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
        this.itemsService.updateItem(result);
      }
    });
  }

  removeItem(id: number): void {
    this.itemsService.removeItem(id);
  }

  private generateNewId(): number {
    const currentItems = this.itemsService.getItems();
    return currentItems.length > 0 
      ? Math.max(...currentItems.map(item => item.id)) + 1 
      : 1;
  }
}