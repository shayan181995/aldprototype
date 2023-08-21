import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToxComponent } from './tox.component';

describe('ToxComponent', () => {
  let component: ToxComponent;
  let fixture: ComponentFixture<ToxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
