import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from "ngx-spinner";
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RestaurantTableComponent } from './components/restaurant/restaurant-table/restaurant-table.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './components/restaurant-detail/menu/menu.component';
import { MenuItemComponent } from './components/restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './components/restaurant-detail/reviews/reviews.component';
import { ShoppingCardComponent } from './components/restaurant-detail/shopping-card/shopping-card.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MarketComponent } from './components/market/market.component';
import { MaketTableComponent } from './components/market/maket-table/maket-table.component';
import { MarketDetailComponent } from './components/market/market-detail/market-detail.component';
import { MarketMenuComponent } from './components/market/market-detail/market-menu/market-menu.component';
import { MarketItemComponent } from './components/market/market-detail/market-item/market-item.component';
import { ShoppingCartComponent } from './components/market/market-detail/shopping-cart/shopping-cart.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { DateTimeFormatPipe } from './shared/pipes/date-time-format.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantComponent,
    RestaurantTableComponent,
    RestaurantDetailComponent,
    MenuComponent,
    MenuItemComponent,
    ReviewsComponent,
    ShoppingCardComponent,
    MarketComponent,
    MaketTableComponent,
    MarketDetailComponent,
    MarketMenuComponent,
    MarketItemComponent,
    ShoppingCartComponent,
    EventosComponent,
    DateTimeFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    NgbModule,
    SharedModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
