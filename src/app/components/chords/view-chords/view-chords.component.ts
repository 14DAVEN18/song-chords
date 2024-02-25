import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { SongsService } from '../../../services/songs.service';
import { PartsService } from '../../../services/parts.service';
import { Part } from '../../../models/part';
import { switchMap, takeUntil } from 'rxjs';
import { Song } from '../../../models/song';
import { Subject } from 'rxjs';

@Component({
  selector: 'view-chords',
  standalone: true,
  imports: [],
  templateUrl: './view-chords.component.html',
  styleUrl: './view-chords.component.css'
})
export class ViewChordsComponent implements OnInit {

  songId!: number;
  song: Song | undefined;
  parts!: Part[];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private _songService: SongsService, private _partService: PartsService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // Subscribe to selectedSongId$ Observable if a song is selected
    this._songService.selectedSongId$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (songId) => {
        if (songId !== -1) {
          this.songId = songId;
          this.fetchSongAndParts(this.songId);
        }
      }
    });
  }

  fetchSongAndParts(songId: number) {
    // Fetch song and parts based on the new songId
    this._songService.getSongById(songId).pipe(
      switchMap(song => {
        this.song = song;
        return this._partService.getPartsBySongId(songId);
      })
    ).subscribe({
      next: (parts) => {
        this.parts = parts;
        // Manually trigger change detection
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}