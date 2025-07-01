import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLopHocPhanComponent } from './create-lop-hoc-phan.component';

describe('CreateLopHocPhanComponent', () => {
  let component: CreateLopHocPhanComponent;
  let fixture: ComponentFixture<CreateLopHocPhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLopHocPhanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLopHocPhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
