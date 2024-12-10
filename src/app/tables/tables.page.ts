import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss'],
})
export class TablesPage implements OnInit {
  tables: any[] = []; // Lista de mesas
  newTable = { capacity: 0, id_restaurant: 0 }; // Modelo para agregar una mesa
  editTable: any = null; // Modelo para editar una mesa

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadTables();
  }

  // Cargar todas las mesas
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

  // Agregar una nueva mesa
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

  // Iniciar edición de una mesa
  startEdit(table: any) {
    this.editTable = { ...table }; // Crear una copia para editar
  }

  // Guardar cambios de una mesa editada
  saveEdit() {
    if (this.editTable) {
      this.api.updateTable(this.editTable.id, this.editTable).subscribe(
        () => {
          this.loadTables();
          this.editTable = null; // Finalizar edición
        },
        (error) => {
          console.error('Error al editar la mesa:', error);
        }
      );
    }
  }

  // Cancelar edición
  cancelEdit() {
    this.editTable = null;
  }

  // Eliminar una mesa
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