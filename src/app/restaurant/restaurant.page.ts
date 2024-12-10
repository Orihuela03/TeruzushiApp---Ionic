import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  restaurants: any[] = []; // Lista de restaurantes
  newRestaurant = { name: '', address: '', capacity: 0 }; // Modelo para agregar un restaurante
  editRestaurant: any = null; // Modelo para editar un restaurante

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadRestaurants();
  }

  // Cargar todos los restaurantes
  loadRestaurants() {
    this.api.getRestaurants().subscribe(
      (data) => {
        this.restaurants = data;
      },
      (error) => {
        console.error('Error al cargar los restaurantes:', error);
      }
    );
  }

  // Agregar un nuevo restaurante
  addRestaurant() {
    if (this.newRestaurant.name && this.newRestaurant.address && this.newRestaurant.capacity > 0) {
      this.api.addRestaurant(this.newRestaurant).subscribe(
        () => {
          this.loadRestaurants();
          this.newRestaurant = { name: '', address: '', capacity: 0 };
        },
        (error) => {
          console.error('Error al agregar el restaurante:', error);
        }
      );
    }
  }

  // Iniciar edición de un restaurante
  startEdit(restaurant: any) {
    this.editRestaurant = { ...restaurant }; // Crear una copia para editar
  }

  // Guardar cambios de un restaurante editado
  saveEdit() {
    if (this.editRestaurant) {
      this.api.updateRestaurant(this.editRestaurant.id, this.editRestaurant).subscribe(
        () => {
          this.loadRestaurants();
          this.editRestaurant = null; // Finalizar edición
        },
        (error) => {
          console.error('Error al editar el restaurante:', error);
        }
      );
    }
  }

  // Cancelar edición
  cancelEdit() {
    this.editRestaurant = null;
  }

  // Eliminar un restaurante
  deleteRestaurant(id: number) {
    this.api.deleteRestaurant(id).subscribe(
      () => {
        this.loadRestaurants();
      },
      (error) => {
        console.error('Error al eliminar el restaurante:', error);
      }
    );
  }
}