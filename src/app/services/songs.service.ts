import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Song } from '../models/song';
import { SONGS_API_URL, SONGS_API_URL_INSERT } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  
  private selectedSongIdSource = new BehaviorSubject<number>(-1);
  selectedSongId$ = this.selectedSongIdSource.asObservable();

  constructor(private _http: HttpClient) { }

  selectSong(songId: number) {
    this.selectedSongIdSource.next(songId)
  }

  getSongs(): Observable<Song[]> {
    return this._http.get<Song[]>(SONGS_API_URL).pipe(
      map(songs => songs.map((song: any) => ({
        id: song.id,
        name: song.name,
        author: song.author
      })))
    )
  }

  getSongById(songId: number): Observable<Song> {
    return this._http.get<Song>(`${SONGS_API_URL}/${songId}`).pipe(
      map(song => song || {} as Song)
    )
  }

  insertSong(song: Song): Observable<any> {
    return this._http.post<any>(`${SONGS_API_URL_INSERT}`, song).pipe(
      catchError((error: any) => {
        console.log('Error inserting song: ', error);
        return  throwError('Failed to insert song. Please try again later.')
      })
    )
  }
}
