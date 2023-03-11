import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postsUrl: string = 'https://jsonplaceholder.typicode.com/posts';
  usersUrl: string = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.postsUrl}`);
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.usersUrl}`);
  }
  getPost(id: number): Observable<any> {
    return this.http.get(`${this.postsUrl}/${id}`);
  }

  createPost(data: any): Observable<any> {
    return this.http.post(
      this.postsUrl,
      data,
      httpOptions
    );
  }

  deletePost(id: string | number | null): Observable<any> {
    return this.http.delete(`${this.postsUrl}/${id}`);
  }

  updatePost(data: any, id : string | number | null): Observable<any>{
    return this.http.patch(`${this.postsUrl}/${id}`, data, httpOptions)
  };
}
