import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHocKyComponent } from './update-hoc-ky.component';

describe('UpdateHocKyComponent', () => {
  let component: UpdateHocKyComponent;
  let fixture: ComponentFixture<UpdateHocKyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateHocKyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHocKyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
