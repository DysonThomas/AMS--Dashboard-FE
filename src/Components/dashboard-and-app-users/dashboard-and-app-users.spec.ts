import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAndAppUsers } from './dashboard-and-app-users';

describe('DashboardAndAppUsers', () => {
  let component: DashboardAndAppUsers;
  let fixture: ComponentFixture<DashboardAndAppUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAndAppUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAndAppUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
