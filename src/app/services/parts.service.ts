import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Part } from '../models/part';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartsService {

  private getPartsUrl = 'assets/test-parts.json';

  constructor(private _http: HttpClient) { }

  getPartsBySongId(songId: number): Observable<Part[]> {
    return this._http.get<Part[]>(this.getPartsUrl).pipe(
      map(parts => parts.filter(part => part.song_id === +songId))
    )
  }
}
