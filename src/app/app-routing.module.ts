import { MarketMenuComponent } from './components/market/market-detail/market-menu/market-menu.component';
import { MarketDetailComponent } from './components/market/market-detail/market-detail.component';
import { MarketComponent } from './components/market/market.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/restaurant-detail/menu/menu.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { ReviewsComponent } from './components/restaurant-detail/reviews/reviews.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent },
  { path: 'market', component: MarketComponent },
  { path: 'market/:id', component: MarketDetailComponent, children: [
    { path: '', component: MarketMenuComponent },
    { path: 'menu', component: MarketMenuComponent },
    { path: 'reviews', component: ReviewsComponent },

  ] },
  { path: 'order', loadChildren: () => import('./components/order/order.module').then(m => m.OrderModule) },

  // { path: 'restaurant', component: RestaurantComponent },
  // {
  //   path: 'restaurant/:id',
  //   component: RestaurantDetailComponent,
  //   children: [
  //     { path: '**', redirectTo: 'menu', pathMatch: 'full' },
  //     { path: 'menu', component: MenuComponent },
  //     { path: 'reviews', component: ReviewsComponent },
  //   ],
  // },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
