import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessshopComponent } from './businessshop.component';

describe('BusinessshopComponent', () => {
  let component: BusinessshopComponent;
  let fixture: ComponentFixture<BusinessshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
