import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChordsComponent } from './view-chords.component';

describe('ViewChordsComponent', () => {
  let component: ViewChordsComponent;
  let fixture: ComponentFixture<ViewChordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewChordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewChordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
