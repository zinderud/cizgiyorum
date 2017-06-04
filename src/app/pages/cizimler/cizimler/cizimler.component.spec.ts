import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CizimlerComponent } from './cizimler.component';

describe('CizimlerComponent', () => {
  let component: CizimlerComponent;
  let fixture: ComponentFixture<CizimlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CizimlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CizimlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
