import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSinhVienComponent } from './view-sinh-vien.component';

describe('ViewSinhVienComponent', () => {
  let component: ViewSinhVienComponent;
  let fixture: ComponentFixture<ViewSinhVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSinhVienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSinhVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
