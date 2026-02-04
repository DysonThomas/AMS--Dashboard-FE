import { Component, SimpleChanges } from '@angular/core';
import { Attendanceservice } from '../../Services/api';
import { Authservice } from '../../Services/authservice';
import { Editmodal } from '../editmodal/editmodal';

@Component({
  selector: 'app-dashboard-and-app-users',
  imports: [Editmodal],
  templateUrl: './dashboard-and-app-users.html',
  styleUrl: './dashboard-and-app-users.css',
})
export class DashboardAndAppUsers {
  closeModal() {
    this.showModal = false;
    this.ngOnInit();
  }
  showModal = false;
  selectedLogin: any = null;
  action: string = '';

  onAddLogin() {
    this.showModal = true;
    this.action = 'New-Login';
  }
  LoginData: any;
  constructor(
    private api: Attendanceservice,
    private auth: Authservice,
  ) {}

  ngOnInit() {
    this.api.getDashbaordemployees(this.auth.getStoreId()).subscribe((res) => {
      console.log(res);
      this.LoginData = res;
    });
  }
  ngOnChanges() {
    this.ngOnInit();
  }
  EditLogin(login: any) {
    this.showModal = true;
    console.log('Opening edit modal for login:', login);
    this.selectedLogin = login;
    this.action = 'edit-login';

    // You can add your edit logic here, e.g., open a modal with login details
  }
}
