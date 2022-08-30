import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersAccrComponent } from './partners.component';

describe('PartnersComponent', () => {
  let component: PartnersAccrComponent;
  let fixture: ComponentFixture<PartnersAccrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnersAccrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersAccrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
