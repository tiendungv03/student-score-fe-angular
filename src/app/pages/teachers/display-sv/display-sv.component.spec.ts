import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySVComponent } from './display-sv.component';

describe('DisplaySVComponent', () => {
  let component: DisplaySVComponent;
  let fixture: ComponentFixture<DisplaySVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaySVComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
