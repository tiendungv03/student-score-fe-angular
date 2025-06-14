import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGiaoVienComponent } from './create-giao-vien.component';

describe('CreateGiaoVienComponent', () => {
  let component: CreateGiaoVienComponent;
  let fixture: ComponentFixture<CreateGiaoVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGiaoVienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGiaoVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
