import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Attendanceservice } from '../../Services/api';
import { Authservice } from '../../Services/authservice';

@Component({
  selector: 'app-editmodal',
  imports: [FormsModule],
  templateUrl: './editmodal.html',
  styleUrl: './editmodal.css',
})
export class Editmodal {
  onAddNewAttendance() {
    const loginDate = this.newAttendance.logindate; // "2026-02-06"
    const loginTime = this.newAttendance.log_in_time; // "20:47"
    const logoutDate = this.newAttendance.logoutdate; // "2026-02-05"
    const logoutTime = this.newAttendance.log_out_time; // "20:47"

    // Validate inputs
    if (!loginDate || !loginTime || !logoutDate || !logoutTime) {
      alert('Please fill in all fields');
      return;
    }

    const attendanceData = {
      userID: this.newAttendance.empId,
      log_in_time: `${loginDate} ${loginTime}:00`, // "2026-02-06 20:47:00"
      log_out_time: `${logoutDate} ${logoutTime}:00`, // "2026-02-05 20:47:00"
    };

    console.log('Attendance Datahaaa:', attendanceData);

    this.api.addNewAttendance(this.auth.getToken(), attendanceData).subscribe({
      next: (response) => {
        console.log('New attendance added successfully:', response);
        this.onCloseModal();
      },
      error: (error) => {
        console.error('Error adding new attendance:', error);
      },
    });
  }
  onChangePassword() {
    if (this.newPassword !== this.confirmPassword) {
      console.error('Passwords do not match!');
      alert('Passwords do not match!');
      return;
    }
    console.log(this.newPassword, this.auth.getUserId());
    this.api
      .resetPassword(this.auth.getToken(), this.newPassword, this.auth.getUserId())
      .subscribe({
        next: (response) => {
          console.log('Password changed successfully:', response);
          this.onCloseModal();
        },
        error: (error) => {
          console.error('Error changing password:', error);
        },
      });
  }
  onAddNewLogin() {
    this.newLogin.storeId = this.auth.getStoreId();
    this.api.addEmployeeLoginDetails(this.auth.getToken(), this.newLogin).subscribe({
      next: (response) => {
        console.log('New login added successfully:', response);
        this.onCloseModal();
      },
      error: (error) => {
        console.error('Error adding new login:', error);
      },
    });
  }
  onLoginDetailsChanges() {
    this.api.updateEmployeeLoginDetails(this.auth.getToken(), this.selectedLogin).subscribe({
      next: (response) => {
        console.log('Login details updated successfully:', response);
        this.onCloseModal();
      },
      error: (error) => {
        console.error('Error updating login details:', error);
      },
    });
  }
  currentEmployeeName: string = '';
  @Input() selectedLogin: any = {};
  @Input() employee: any = {};
  @Input() store: any = {};
  @Input() action: string = '';
  confirmPassword: string = '';
  newPassword: string = '';
  newLogin: any = {
    role: '',
  };
  employeedata: any = [];
  newAttendance: any = {
    empId: '',
  };
  roles: any;
  filteredRoles: any;
  ngOnInit() {
    this.api.getRole().subscribe((res) => {
      console.log('Roles fetched:', res);
      this.roles = res;
      this.filteredRoles = this.roles.filter((role: any) => role.role_id !== 1);
      console.log('Filtered roles:', this.filteredRoles);
    });
    this.api.getEmployeeName(this.auth.getToken(), this.auth.getUserId()).subscribe({
      next: (data) => {
        console.log('Current Employee Name:', data);
        this.currentEmployeeName = data.full_name;
      },
    });
    this.api.getAllEmployees(this.auth.getToken(), this.auth.getStoreId()).subscribe({
      next: (data) => {
        this.employeedata = data;
        console.log('All Employees Data:', this.employeedata);
      },
    });
  }
  @Output() closeModal = new EventEmitter<void>();
  onCloseModal() {
    this.closeModal.emit();
  }
  statusUpdate() {
    this.api
      .updateEmployeeStatus(this.auth.getToken(), this.employee.userID, !this.employee.isActive)
      .subscribe({
        next: (response) => {
          console.log('Employee status updated successfully:', response);
          this.employee.isActive = !this.employee.isActive;
          this.onCloseModal();
        },
        error: (error) => {
          console.error('Error updating employee status:', error);
        },
      });
  }
  constructor(
    private api: Attendanceservice,
    private auth: Authservice,
  ) {}
  onSaveChanges() {
    this.api.updateEmployeeDetails(this.auth.getToken(), this.employee).subscribe({
      next: (response) => {
        console.log('Employee details updated successfully:', response);
        this.onCloseModal();
      },
      error: (error) => {
        console.error('Error updating employee details:', error);
      },
    });
  }
  onStoreChanges() {
    this.api.updateStoreDetails(this.auth.getToken(), this.store).subscribe({
      next: (response) => {
        console.log('Store details updated successfully:', response);
        this.onCloseModal();
      },
      error: (error) => {
        console.error('Error updating store details:', error);
      },
    });
  }
  storeStatusUpdate() {
    console.log(
      'Updating store status for Store ID:',
      this.store.storeId,
      'Current Status:',
      this.store.isActive,
    );
    this.api
      .updateStoreStatus(this.auth.getToken(), this.store.storeId, !this.store.isActive)
      .subscribe({
        next: (response) => {
          console.log('Store status updated successfully:', response);
          this.store.isActive = !this.store.isActive;
          this.onCloseModal();
        },
        error: (error) => {
          console.error('Error updating store status:', error);
        },
      });
  }
}
