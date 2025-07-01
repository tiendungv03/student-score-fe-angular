import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemHocKyComponent } from './them-hoc-ky.component';

describe('ThemHocKyComponent', () => {
  let component: ThemHocKyComponent;
  let fixture: ComponentFixture<ThemHocKyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemHocKyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemHocKyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
