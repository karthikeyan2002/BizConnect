import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessnavComponent } from './businessnav.component';

describe('BusinessnavComponent', () => {
  let component: BusinessnavComponent;
  let fixture: ComponentFixture<BusinessnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessnavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
