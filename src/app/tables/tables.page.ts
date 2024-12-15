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
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadTables();
  }

  loadTables() {
    this.api.getTables().subscribe(
      (data) => {
        this.tables = data;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Error al cargar las mesas. Intenta nuevamente más tarde.';
        console.error('Error al cargar las mesas:', error);
      }
    );
  }

  addTable() {
    if (this.newTable.capacity > 0 && this.newTable.id_restaurant > 0) {
      this.api.addTable(this.newTable).subscribe(
        () => {
          this.successMessage = 'Mesa agregada exitosamente';
          this.loadTables();
          this.newTable = { capacity: 0, id_restaurant: 0 };
        },
        (error) => {
          this.errorMessage = 'Error al agregar la mesa. Intenta nuevamente.';
          console.error('Error al agregar la mesa:', error);
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  startEdit(table: any) {
    this.editTable = { ...table };
    this.errorMessage = '';
  }

  saveEdit() {
    if (this.editTable && this.editTable.capacity > 0 && this.editTable.id_restaurant > 0) {
      this.api.updateTable(this.editTable.id, this.editTable).subscribe(
        () => {
          this.successMessage = 'Mesa actualizada exitosamente';
          this.loadTables();
          this.editTable = null;
        },
        (error) => {
          this.errorMessage = 'Error al editar la mesa. Intenta nuevamente.';
          console.error('Error al editar la mesa:', error);
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  cancelEdit() {
    this.editTable = null;
    this.errorMessage = '';
  }

  deleteTable(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta mesa?')) {
      this.api.deleteTable(id).subscribe(
        () => {
          this.successMessage = 'Mesa eliminada exitosamente';
          this.loadTables();
        },
        (error) => {
          this.errorMessage = 'Error al eliminar la mesa. Intenta nuevamente.';
          console.error('Error al eliminar la mesa:', error);
        }
      );
    }
  }
}