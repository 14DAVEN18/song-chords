import { Component } from '@angular/core';

/* My components */
import { SongsListComponent } from '../songs-list/songs-list.component';
import { ViewLyricsComponent } from './view-lyrics/view-lyrics.component';

@Component({
  selector: 'app-lyrics',
  standalone: true,
  imports: [SongsListComponent, ViewLyricsComponent],
  templateUrl: './lyrics.component.html',
  styleUrl: './lyrics.component.css'
})
export class LyricsComponent {

}
