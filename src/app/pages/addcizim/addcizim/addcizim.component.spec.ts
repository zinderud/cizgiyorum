import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcizimComponent } from './addcizim.component';

describe('AddcizimComponent', () => {
  let component: AddcizimComponent;
  let fixture: ComponentFixture<AddcizimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcizimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcizimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
