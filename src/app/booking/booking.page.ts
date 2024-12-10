import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  bookings: any[] = []; // Lista de reservas
  newBooking = { customerName: '', customerEmail: '', customerPhone: '', numberOfEaters: 0, date: '', id_table: 0 }; // Modelo para agregar una reserva
  editBooking: any = null; // Modelo para editar una reserva
  tables: any[] = []; // Lista de mesas para elegir

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadBookings();
    this.loadTables();
  }

  // Cargar todas las reservas
  loadBookings() {
    this.api.getBookings().subscribe(
      (data) => {
        this.bookings = data;
      },
      (error) => {
        console.error('Error al cargar las reservas:', error);
      }
    );
  }

  // Cargar todas las mesas para la selección de la reserva
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

  // Agregar una nueva reserva
  addBooking() {
    if (
      this.newBooking.customerName &&
      this.newBooking.customerEmail &&
      this.newBooking.customerPhone &&
      this.newBooking.numberOfEaters > 0 &&
      this.newBooking.id_table > 0
    ) {
      this.api.addBooking(this.newBooking).subscribe(
        () => {
          this.loadBookings();
          this.newBooking = { customerName: '', customerEmail: '', customerPhone: '', numberOfEaters: 0, date: '', id_table: 0 };
        },
        (error) => {
          console.error('Error al agregar la reserva:', error);
        }
      );
    }
  }

  // Iniciar edición de una reserva
  startEdit(booking: any) {
    this.editBooking = { ...booking }; // Crear una copia para editar
  }

  // Guardar cambios de una reserva editada
  saveEdit() {
    if (this.editBooking) {
      this.api.updateBooking(this.editBooking.id, this.editBooking).subscribe(
        () => {
          this.loadBookings();
          this.editBooking = null; // Finalizar edición
        },
        (error) => {
          console.error('Error al editar la reserva:', error);
        }
      );
    }
  }

  // Cancelar edición
  cancelEdit() {
    this.editBooking = null;
  }

  // Eliminar una reserva
  deleteBooking(id: number) {
    this.api.deleteBooking(id).subscribe(
      () => {
        this.loadBookings();
      },
      (error) => {
        console.error('Error al eliminar la reserva:', error);
      }
    );
  }
}