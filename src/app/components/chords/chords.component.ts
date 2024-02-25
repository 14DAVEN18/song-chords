import { Component, OnInit } from '@angular/core';

/* My components */
import { SongsListComponent } from '../songs-list/songs-list.component';
import { ViewChordsComponent } from './view-chords/view-chords.component';

@Component({
  selector: 'chords',
  standalone: true,
  imports: [SongsListComponent, ViewChordsComponent],
  templateUrl: './chords.component.html',
  styleUrl: './chords.component.css'
})
export class ChordsComponent {

}