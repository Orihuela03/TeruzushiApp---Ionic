import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

interface Restaurant {
  id?: number;
  name: string;
  address: string;
  capacity: number;
}

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  restaurants: Restaurant[] = [];

  newRestaurant: Restaurant = {
    name: '',
    address: '',
    capacity: 0,
  };

  editRestaurant: Restaurant | null = null;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants() {
    this.api.getRestaurants().subscribe((data: Restaurant[]) => {
      this.restaurants = data;
    });
  }

  addRestaurant() {
    if (!this.newRestaurant.name || !this.newRestaurant.address || this.newRestaurant.capacity <= 0) {
      alert('Todos los campos son obligatorios y la capacidad debe ser mayor a 0.');
      return;
    }

    this.api.addRestaurant(this.newRestaurant).subscribe((response: Restaurant) => {
      this.restaurants.push(response);  // Agregar el nuevo restaurante a la lista
      this.newRestaurant = { name: '', address: '', capacity: 0 };  // Limpiar el formulario
    }, error => {
      console.error('Error al agregar el restaurante:', error);
      alert('Ocurrió un error al agregar el restaurante.');
    });
  }

  startEdit(restaurant: Restaurant) {
    this.editRestaurant = { ...restaurant };
  }

  saveEdit() {
    if (this.editRestaurant) {
      if (!this.editRestaurant.name || !this.editRestaurant.address || this.editRestaurant.capacity <= 0) {
        alert('Todos los campos son obligatorios y la capacidad debe ser mayor a 0.');
        return;
      }
  
      if (this.editRestaurant.id === undefined) {
        console.error('ID del restaurante no disponible');
        alert('No se puede editar un restaurante sin ID.');
        return;
      }
  
      this.api.updateRestaurant(this.editRestaurant.id, this.editRestaurant).subscribe((response: Restaurant) => {
        const index = this.restaurants.findIndex(r => r.id === response.id);
        if (index !== -1) {
          this.restaurants[index] = response;
        }
        this.editRestaurant = null;
      }, error => {
        console.error('Error al editar el restaurante:', error);
        alert('Ocurrió un error al guardar los cambios.');
      });
    }
  }
  
  cancelEdit() {
    this.editRestaurant = null;
  }

  deleteRestaurant(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este restaurante?')) {
      this.api.deleteRestaurant(id).subscribe(() => {
        this.restaurants = this.restaurants.filter(r => r.id !== id);
      }, error => {
        console.error('Error al eliminar el restaurante:', error);
        alert('Ocurrió un error al eliminar el restaurante.');
      });
    }
  }
}