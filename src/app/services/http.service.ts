import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})

export class HttpService{

  private dataUrl = '../../assets/data.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl);
  }



}
