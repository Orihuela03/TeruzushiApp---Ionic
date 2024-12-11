import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  restaurants: any[] = [];
  newRestaurant = { name: '', address: '', capacity: 0 };
    editRestaurant: any = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadRestaurants();
  }

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

  addRestaurant() {
    if (
      this.newRestaurant.name &&
      this.newRestaurant.address &&
      this.newRestaurant.capacity > 0
    ) {
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

  startEdit(restaurant: any) {
    this.editRestaurant = { ...restaurant };

  saveEdit() {
    if (this.editRestaurant) {
      this.api
        .updateRestaurant(this.editRestaurant.id, this.editRestaurant)
        .subscribe(
          () => {
            this.loadRestaurants();
            this.editRestaurant = null;
          },
          (error) => {
            console.error('Error al editar el restaurante:', error);
          }
        );
    }
  }

  cancelEdit() {
    this.editRestaurant = null;
  }

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
