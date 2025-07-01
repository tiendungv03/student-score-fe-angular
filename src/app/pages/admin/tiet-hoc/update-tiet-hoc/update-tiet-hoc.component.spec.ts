import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTietHocComponent } from './update-tiet-hoc.component';

describe('UpdateTietHocComponent', () => {
  let component: UpdateTietHocComponent;
  let fixture: ComponentFixture<UpdateTietHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTietHocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTietHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
