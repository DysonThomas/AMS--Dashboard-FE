import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Storemaster } from './storemaster';

describe('Storemaster', () => {
  let component: Storemaster;
  let fixture: ComponentFixture<Storemaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Storemaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Storemaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
