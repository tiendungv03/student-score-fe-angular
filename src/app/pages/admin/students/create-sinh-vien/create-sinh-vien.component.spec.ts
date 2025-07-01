import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSinhVienComponent } from './create-sinh-vien.component';

describe('CreateSinhVienComponent', () => {
  let component: CreateSinhVienComponent;
  let fixture: ComponentFixture<CreateSinhVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSinhVienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSinhVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
