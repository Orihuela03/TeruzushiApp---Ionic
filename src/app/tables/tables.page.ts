import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss'],
})
export class TablesPage implements OnInit {
  tables: any[] = [];
  newTable = { capacity: 0, id_restaurant: 0 };
  editTable: any = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadTables();
  }

  loadTables() {
    this.api.getTables().subscribe(
      (data) => {
        this.tables = data;
      },
      (error) => {
        console.error('Error al cargar las mesas:', error);
      }
    );
  }

  addTable() {
    if (this.newTable.capacity > 0 && this.newTable.id_restaurant > 0) {
      this.api.addTable(this.newTable).subscribe(
        () => {
          this.loadTables();
          this.newTable = { capacity: 0, id_restaurant: 0 };
        },
        (error) => {
          console.error('Error al agregar la mesa:', error);
        }
      );
    }
  }

  startEdit(table: any) {
    this.editTable = { ...table };
  }

  saveEdit() {
    if (this.editTable) {
      this.api.updateTable(this.editTable.id, this.editTable).subscribe(
        () => {
          this.loadTables();
          this.editTable = null;
        },
        (error) => {
          console.error('Error al editar la mesa:', error);
        }
      );
    }
  }

  cancelEdit() {
    this.editTable = null;
  }

  deleteTable(id: number) {
    this.api.deleteTable(id).subscribe(
      () => {
        this.loadTables();
      },
      (error) => {
        console.error('Error al eliminar la mesa:', error);
      }
    );
  }
}
