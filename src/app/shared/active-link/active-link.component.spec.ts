import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveLinkComponent } from './active-link.component';

describe('ActiveLinkComponent', () => {
  let component: ActiveLinkComponent;
  let fixture: ComponentFixture<ActiveLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
