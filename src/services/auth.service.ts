import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private User = new BehaviorSubject(null);
  private Status = new BehaviorSubject('');
  currentUser = this.User.asObservable();
  statusMessage = this.Status.asObservable();
  usersUrl: string = 'https://jsonplaceholder.typicode.com/users';

  login(username: any) {
    return  this.http.get(`${this.usersUrl}`).subscribe((user: any) => {
      if (user.username == username) {
        this.User.next(user);
        return user
      }
      else {
        this.User.next(null);
        this.Status.next('User doesnt exsist');
        return null
      }
    });

  }
  getUserData() {
    return this.currentUser;
  }

  setUser(user: any): void {
    this.User.next(user)
  }

  removeUser(): void{
    this.User.next(null)
  }
}
