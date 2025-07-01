import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentLopHocPhanComponent } from './add-student-lop-hoc-phan.component';

describe('AddStudentLopHocPhanComponent', () => {
  let component: AddStudentLopHocPhanComponent;
  let fixture: ComponentFixture<AddStudentLopHocPhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStudentLopHocPhanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentLopHocPhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
