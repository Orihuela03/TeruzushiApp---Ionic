import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  bookings: any[] = [];
  newBooking = {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    numberOfEaters: 0,
    date: '',
    id_table: 0,
  }; // Modelo para agregar una reserva
  editBooking: any = null;
  tables: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadBookings();
    this.loadTables();
  }

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
          this.newBooking = {
            customerName: '',
            customerEmail: '',
            customerPhone: '',
            numberOfEaters: 0,
            date: '',
            id_table: 0,
          };
        },
        (error) => {
          console.error('Error al agregar la reserva:', error);
        }
      );
    }
  }

  startEdit(booking: any) {
    this.editBooking = { ...booking };
  }

  saveEdit() {
    if (this.editBooking) {
      this.api.updateBooking(this.editBooking.id, this.editBooking).subscribe(
        () => {
          this.loadBookings();
          this.editBooking = null;
        },
        (error) => {
          console.error('Error al editar la reserva:', error);
        }
      );
    }
  }

  cancelEdit() {
    this.editBooking = null;
  }

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