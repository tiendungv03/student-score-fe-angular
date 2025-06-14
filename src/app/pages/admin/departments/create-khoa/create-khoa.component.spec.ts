import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKhoaComponent } from './create-khoa.component';

describe('CreateKhoaComponent', () => {
  let component: CreateKhoaComponent;
  let fixture: ComponentFixture<CreateKhoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateKhoaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateKhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
