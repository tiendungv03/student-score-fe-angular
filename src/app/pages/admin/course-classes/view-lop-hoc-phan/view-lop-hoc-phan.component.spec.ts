import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLopHocPhanComponent } from './view-lop-hoc-phan.component';

describe('ViewLopHocPhanComponent', () => {
  let component: ViewLopHocPhanComponent;
  let fixture: ComponentFixture<ViewLopHocPhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLopHocPhanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLopHocPhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
