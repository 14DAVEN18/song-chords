import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../../models/song';
import { SongsService } from '../../services/songs.service';
import { SongModalComponent } from './song-modal/song-modal.component';

@Component({
  selector: 'songs-list',
  standalone: true,
  imports: [SongModalComponent],
  templateUrl: './songs-list.component.html',
  styleUrl: './songs-list.component.css'
})
export class SongsListComponent implements OnInit {

  @Input() Modal: boolean = false

  songs: Song[] = []
  songSelected: boolean = false;
  selectedSongId: number = 0;
  showModal: boolean = false;

  constructor(private _songService: SongsService) {}

  ngOnInit() {
    this.getSongs();
  }

  getSongs() {
    this._songService.getSongs().subscribe({
      next: (songs) => {
        this.songs = songs
        songs.sort((a, b) => a.name.localeCompare(b.name))
      },
      error: (e) => {
        console.log('Error', e)
      },
      complete: () => {
        
      }
    })
  }

  selectSong(songId: number) {
    this.selectedSongId = songId
    this._songService.selectSong(songId)
    this.songSelected = true;
  }

  openModal() {
    console.log("Show modal")
    this.showModal = true
  }

  hideModal() {
    this.showModal = false
  }
}