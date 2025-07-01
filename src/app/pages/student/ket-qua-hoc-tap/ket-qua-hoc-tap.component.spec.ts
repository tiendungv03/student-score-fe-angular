import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KetQuaHocTapComponent } from './ket-qua-hoc-tap.component';

describe('KetQuaHocTapComponent', () => {
  let component: KetQuaHocTapComponent;
  let fixture: ComponentFixture<KetQuaHocTapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KetQuaHocTapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KetQuaHocTapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
