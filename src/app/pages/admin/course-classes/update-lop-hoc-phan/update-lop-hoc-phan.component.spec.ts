import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLopHocPhanComponent } from './update-lop-hoc-phan.component';

describe('UpdateLopHocPhanComponent', () => {
  let component: UpdateLopHocPhanComponent;
  let fixture: ComponentFixture<UpdateLopHocPhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLopHocPhanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLopHocPhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
