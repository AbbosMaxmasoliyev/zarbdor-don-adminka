import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinProgressComponent } from './spin-progress.component';

describe('SpinProgressComponent', () => {
  let component: SpinProgressComponent;
  let fixture: ComponentFixture<SpinProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
