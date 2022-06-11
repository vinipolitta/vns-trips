import { MenuItem } from '../../shared/interfaces/menu-item';
import { Restaurant } from '../../shared/interfaces/restaurant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  api = environment.apiURL;

  constructor(private http: HttpClient) {}

  getRestaurant(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.api + '/restaurants').pipe(take(1));
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http
      .get<Restaurant>(this.api + `/restaurants/${id}`)
      .pipe(take(1));
  }

  getReviews(id: String): Observable<any> {
    return this.http
      .get<any>(this.api + `/restaurants/${id}/reviews`)
      .pipe(take(1));
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http
      .get<any>(this.api + `/restaurants/${id}/menu`)
      .pipe(take(1));
  }
}
