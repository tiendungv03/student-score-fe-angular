import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangKyLopHocPhanComponent } from './dang-ky-lop-hoc-phan.component';

describe('DangKyLopHocPhanComponent', () => {
  let component: DangKyLopHocPhanComponent;
  let fixture: ComponentFixture<DangKyLopHocPhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DangKyLopHocPhanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangKyLopHocPhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
