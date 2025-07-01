import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGiaoVienComponent } from './update-giao-vien.component';

describe('UpdateGiaoVienComponent', () => {
  let component: UpdateGiaoVienComponent;
  let fixture: ComponentFixture<UpdateGiaoVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGiaoVienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGiaoVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
