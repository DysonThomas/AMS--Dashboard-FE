import { Component } from '@angular/core';
import { Attendanceservice } from '../../Services/api';
import { Authservice } from '../../Services/authservice';
import { Editmodal } from '../editmodal/editmodal';

@Component({
  selector: 'app-manage-employees',
  imports: [Editmodal],
  templateUrl: './manage-employees.html',
  styleUrl: './manage-employees.css',
})
export class ManageEmployees {
  employeeData: any = [];
  showModal: boolean = false;
  action: string = '';
  selectedEmployee: any = null;
  constructor(
    private api: Attendanceservice,
    private auth: Authservice,
  ) {}
  ngOnInit() {
    const token = this.auth.getToken();
    if (token) {
      this.api.getAllEmployees(token).subscribe({
        next: (response) => {
          this.employeeData = response;
        },
        error: (error) => {
          console.error('Error fetching employees:', error);
        },
      });
    }
  }
  reqFaceID(emp: any) {
    console.log('Requesting Face ID for employee:', emp);
    this.api.updateFaceId(this.auth.getToken(), emp.userID, !emp.isEdit).subscribe({
      next: (response) => {
        console.log('Face ID request sent successfully:', response);
        this.ngOnInit(); // Refresh the employee list to reflect changes
      },
      error: (error) => {
        console.error('Error sending Face ID request:', error);
      },
    });
  }
  editemp(e: any) {
    this.showModal = true;
    this.action = 'editEmployee';
    this.selectedEmployee = e;
  }
}
