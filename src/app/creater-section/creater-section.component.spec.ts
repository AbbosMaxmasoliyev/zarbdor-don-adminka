import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaterSectionComponent } from './creater-section.component';

describe('CreaterSectionComponent', () => {
  let component: CreaterSectionComponent;
  let fixture: ComponentFixture<CreaterSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaterSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
