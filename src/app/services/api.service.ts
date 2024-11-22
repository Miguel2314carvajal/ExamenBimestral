import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private dogApiUrl = 'https://dog.ceo/api/breed/boxer/images/random';
  private bookApiUrl = 'https://gutendex.com/books/?ids=1,2,3,4,5,6,7,8,9,10';

  constructor(private http: HttpClient) {}

  getRandomDogs(): Observable<any> {
    return this.http.get(this.dogApiUrl);
  }

  getBooks(): Observable<any> {
    return this.http.get(this.bookApiUrl);
  }
} 