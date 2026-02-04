import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from '../../Services/authservice';
import { Attendanceservice } from '../../Services/api';
import { Navbar } from '../navbar/navbar';
import { Attendancehome } from '../attendancehome/attendancehome';
import { Manageshift } from '../manageshift/manageshift';
import { Actionlogs } from '../actionlogs/actionlogs';
import { RoleList } from '../role-list/role-list';
import { ManageEmployees } from '../manage-employees/manage-employees';
import { Storemaster } from '../storemaster/storemaster';
import { DashboardAndAppUsers } from '../dashboard-and-app-users/dashboard-and-app-users';
import { Editmodal } from '../editmodal/editmodal';

@Component({
  selector: 'app-homepage',
  imports: [
    Navbar,
    Attendancehome,
    Manageshift,
    Actionlogs,
    RoleList,
    ManageEmployees,
    Storemaster,
    DashboardAndAppUsers,
    Editmodal,
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  closeModal() {
    this.selection = 'rdu';
  }
  token: string = '';
  userId: string = '';
  userData: any;
  selection: string = 'rdu';
  action: string = 'cp';
  constructor(
    private auth: Authservice,
    private router: Router,
    private api: Attendanceservice,
  ) {}
  ngOnInit() {
    this.token = this.auth.getToken();
    this.userId = this.auth.getUserId();
    console.log('token', this.token);
    if (this.token == '') {
      this.router.navigate(['/login']);
    } else {
      this.api.verifyToken(this.token).subscribe({
        next: (data) => {
          if ((data.cstatus = 'verified')) {
            this.userData = data[0];
          } else {
            this.router.navigate(['/login']);
          }
        },
        error: (e) => {
          this.router.navigate(['/login']);
        },
      });
    }
    this.api.getStoreID(this.userId).subscribe({
      next: (data) => {
        console.log('Store Id:', data);
        localStorage.setItem('storeId', data.storeId);
      },
    });
  }
}
