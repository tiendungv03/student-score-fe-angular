import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentLopHocPhanComponent } from './update-student-lop-hoc-phan.component';

describe('UpdateStudentLopHocPhanComponent', () => {
  let component: UpdateStudentLopHocPhanComponent;
  let fixture: ComponentFixture<UpdateStudentLopHocPhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStudentLopHocPhanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStudentLopHocPhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
