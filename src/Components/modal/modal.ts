import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Attendanceservice } from '../../Services/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { Authservice } from '../../Services/authservice';

@Component({
  selector: 'app-modal',
  imports: [FormsModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  @Output() close = new EventEmitter<void>();

  isLoading: boolean = false;
  isRegular: boolean = false;
  NewcheckOut: any = null;
  Newcheckin: any = null;
  actualCheckin: any = null;
  actualcheckout: any = null;
  selectedRole: string = '';
  roles: any[] = [];
  constructor(
    private api: Attendanceservice,
    private snackBar: MatSnackBar,
    private auth: Authservice
  ) {}
  onClose() {
    this.close.emit();
  }
  @Input() attendanceData: any = {};

  ngOnInit() {
    if (this.attendanceData.Logout_Time) {
      this.NewcheckOut = this.attendanceData.Logout_Time.replace('T', ' ').replace('Z', '');
      this.actualcheckout = this.NewcheckOut;
    }
    if (this.attendanceData.Login_Time) {
      this.Newcheckin = this.attendanceData.Login_Time.replace('T', ' ').replace('Z', '');
      this.actualCheckin = this.Newcheckin;
    }

    this.api.getRole().subscribe({
      next: (data) => {
        this.roles = data;
        console.log(this.roles);
      },
    });
  }
  Save() {
    if (!this.selectedRole) {
      this.showAlert('Kindly specify who approved this.');
      return;
    }
    if (this.actualCheckin == this.Newcheckin && this.actualcheckout == this.NewcheckOut) {
      this.showAlert('No Changes in Login time and Logout time detected');
      return;
    } else {
      console.log('asas', this.Newcheckin);
      this.api
        .updateattendance(this.auth.getToken(), {
          log_id: this.attendanceData.log_id,
          newCheckIn: this.Newcheckin,
          newCheckOut: this.NewcheckOut,
          approved_by: this.selectedRole,
        })
        .subscribe({
          next: (data) => {
            if (data.status === 'Updated') {
              this.api
                .updateLog(this.auth.getToken(), {
                  log_id: this.attendanceData.log_id,
                  newCheckIn: this.Newcheckin,
                  newCheckOut: this.NewcheckOut,
                  approved_by: this.selectedRole,
                  actualLogInTime: this.actualCheckin,
                  actualLogOutTime: this.actualcheckout,
                  actionType: 'Update',
                })
                .subscribe({
                  next: (data) => {
                    console.log(data);
                  },
                });
              this.onClose();
            }
          },
        });
    }
  }
  showAlert(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
