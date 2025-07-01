import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGiaoVienComponent } from './view-giao-vien.component';

describe('ViewGiaoVienComponent', () => {
  let component: ViewGiaoVienComponent;
  let fixture: ComponentFixture<ViewGiaoVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewGiaoVienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGiaoVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
