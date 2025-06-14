import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSinhVienComponent } from './update-sinh-vien.component';

describe('UpdateSinhVienComponent', () => {
  let component: UpdateSinhVienComponent;
  let fixture: ComponentFixture<UpdateSinhVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSinhVienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSinhVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
