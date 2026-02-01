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
  @Input() employee: any = {};
  @Input() action: string = '';
  ngOnInit() {
    console.log('Edit Modal Employee Data:', this.employee);
    console.log('Action:', this.action);
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
}
