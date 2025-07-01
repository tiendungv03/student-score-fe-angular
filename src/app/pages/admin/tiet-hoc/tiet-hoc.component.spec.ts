import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TietHocComponent } from './tiet-hoc.component';

describe('TietHocComponent', () => {
  let component: TietHocComponent;
  let fixture: ComponentFixture<TietHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TietHocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TietHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
