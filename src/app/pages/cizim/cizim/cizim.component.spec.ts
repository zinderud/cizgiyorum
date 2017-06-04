import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CizimComponent } from './cizim.component';

describe('CizimComponent', () => {
  let component: CizimComponent;
  let fixture: ComponentFixture<CizimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CizimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CizimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
