import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHocPhanComponent } from './update-hoc-phan.component';

describe('UpdateHocPhanComponent', () => {
  let component: UpdateHocPhanComponent;
  let fixture: ComponentFixture<UpdateHocPhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateHocPhanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHocPhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
