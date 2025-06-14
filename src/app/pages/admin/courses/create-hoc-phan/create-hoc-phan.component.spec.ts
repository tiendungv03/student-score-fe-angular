import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHocPhanComponent } from './create-hoc-phan.component';

describe('CreateHocPhanComponent', () => {
  let component: CreateHocPhanComponent;
  let fixture: ComponentFixture<CreateHocPhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHocPhanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHocPhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
