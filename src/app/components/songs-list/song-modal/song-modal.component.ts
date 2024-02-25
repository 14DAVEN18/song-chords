import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { Song } from '../../../models/song';
import { SongsService } from '../../../services/songs.service';

@Component({
  selector: 'song-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './song-modal.component.html',
  styleUrl: './song-modal.component.css'
})
export class SongModalComponent implements OnInit {

  
  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() songInsertedEvent = new EventEmitter<boolean>();

  songForm!: FormGroup

  song: Song = {id: 0, name: '', author: ''};

  constructor(private fb: FormBuilder, private _songService: SongsService) {}

  ngOnInit(): void {
    this.songForm = this.fb.group({
      name: ['', Validators.required],
      author: [''] 
    })
  }

  hideModal() {
    this.closeModalEvent.emit();
  }

  insertSong() {
    this.song.name = this.songForm.value.name
    if (this.songForm.value.author == "")
      this.song.author = "Desconocido"
    else
      this.song.author = this.songForm.value.author!
    console.log(this.song)
    this._songService.insertSong(this.song).subscribe({
      next: (response) => {
        console.log('Response: ', response)
        this.closeModalEvent.emit();
        this.songInsertedEvent.emit(true)
      },
      error: (error) => {
        console.error('Error inserting song:', error)
      }
    })
  }
}