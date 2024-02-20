import { Routes } from '@angular/router';
import { ChordsComponent } from './components/chords/chords.component';
import { LyricsComponent } from './components/lyrics/lyrics.component';

export const routes: Routes = [
    {path: '', component: ChordsComponent},
    {path: 'acordes', title: 'Acordes', component: ChordsComponent},
    {path: 'letras', title: 'Letras', component: LyricsComponent}
];
