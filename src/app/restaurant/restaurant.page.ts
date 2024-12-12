import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

// Interfaz para el tipo de objeto Restaurant, con capacity permitido como null
interface Restaurant {
  id?: number;
  name: string;
  address: string;
  capacity: number | null;  // capacity ahora puede ser null
}

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  // Lista de restaurantes, ahora tipada como un arreglo de objetos Restaurant
  restaurants: Restaurant[] = [];

  // Objeto para almacenar los datos de un nuevo restaurante
  newRestaurant: Restaurant = {
    name: '',
    address: '',
    capacity: null  // capacity puede ser null
  };

  // Objeto para editar un restaurante, tipado como Restaurant o null
  editRestaurant: Restaurant | null = null;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getRestaurants();  // Cargar los restaurantes al iniciar
  }

  // Método para obtener todos los restaurantes
  getRestaurants() {
    this.api.getRestaurants().subscribe((data: Restaurant[]) => {
      this.restaurants = data; // Asegura que data tenga el tipo adecuado
    });
  }

  // Método para agregar un nuevo restaurante
  addRestaurant() {
    this.api.addRestaurant(this.newRestaurant).subscribe((response: Restaurant) => {
      this.restaurants.push(response);  // Agregar el nuevo restaurante a la lista
      this.newRestaurant = { name: '', address: '', capacity: null };  // Limpiar el formulario
    });
  }

  // Método para comenzar a editar un restaurante
  startEdit(restaurant: Restaurant) {
    this.editRestaurant = { ...restaurant };  // Crear una copia para editar
  }

  // Método para guardar los cambios después de editar un restaurante
  saveEdit() {
    if (this.editRestaurant) {
      this.api.updateRestaurant(this.editRestaurant.id, this.editRestaurant).subscribe((response: Restaurant) => {
        const index = this.restaurants.findIndex(r => r.id === response.id);
        if (index !== -1) {
          this.restaurants[index] = response;  // Actualizar la lista de restaurantes
        }
        this.editRestaurant = null;  // Limpiar el formulario de edición
      });
    }
  }

  // Método para cancelar la edición de un restaurante
  cancelEdit() {
    this.editRestaurant = null;
  }

  // Método para eliminar un restaurante
  deleteRestaurant(id: number) {
    this.api.deleteRestaurant(id).subscribe(() => {
      this.restaurants = this.restaurants.filter(r => r.id !== id);  // Eliminar el restaurante de la lista
    });
  }
}