import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Moto } from './moto.model';

@Injectable({
  providedIn: 'root'
})
export class MotoService {

  private apiUrl = 'http://localhost:3000/moto';

  constructor(private http: HttpClient) {}

  getMotos(): Observable<Moto[]> {
    return this.http.get<Moto[]>(this.apiUrl);
  }

  getMotoById(id: string): Observable<Moto> {
    return this.http.get<Moto>(`${this.apiUrl}/${id}`);
  }

  createMoto(moto: Moto): Observable<Moto> {
    return this.http.post<Moto>(this.apiUrl, moto);
  }

  updateMoto(id: string, moto: Moto): Observable<Moto> {
    return this.http.put<Moto>(`${this.apiUrl}/${id}`, moto);
  }

  deleteMoto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
