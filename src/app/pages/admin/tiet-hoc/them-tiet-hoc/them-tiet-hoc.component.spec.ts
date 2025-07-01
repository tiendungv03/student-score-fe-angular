import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemTietHocComponent } from './them-tiet-hoc.component';

describe('ThemTietHocComponent', () => {
  let component: ThemTietHocComponent;
  let fixture: ComponentFixture<ThemTietHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemTietHocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemTietHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
