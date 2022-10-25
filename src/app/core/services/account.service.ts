import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/shared/interfaces/user';
import { map, Observable, ReplaySubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSource = new ReplaySubject<User>(1);
  public curentUser$ = this.currentUserSource.asObservable();

  baseUrl = environment.apiURL + 'api/account/';
  constructor(private http: HttpClient) {}

  public login(model: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + 'login', model).pipe(
      take(1),
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  public logOut(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSource.next(null);
    this.currentUserSource.complete();
  }

  //pega o user logando e fica observando a mudanca
  public setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  public register(model: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + 'register', model).pipe(
      take(1),
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }
}
