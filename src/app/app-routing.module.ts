import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
    { path: 'restaurant', loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantPageModule) },
    { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesPageModule) },
    { path: 'booking', loadChildren: () => import('./booking/booking.module').then(m => m.BookingPageModule) },
  {
    path: 'restaurant',
    loadChildren: () => import('./restaurant/restaurant.module').then( m => m.RestaurantPageModule)
  },
  {
    path: 'tables',
    loadChildren: () => import('./tables/tables.module').then( m => m.TablesPageModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then( m => m.BookingPageModule)
  },
  ];
  
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
