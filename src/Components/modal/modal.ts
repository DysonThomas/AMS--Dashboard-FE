import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Attendanceservice } from '../../Services/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { Authservice } from '../../Services/authservice';
import { Observable } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
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
  @Input() selected: String = '';
  ngOnInit() {
    console.log('dyson', this.attendanceData);
    if (this.attendanceData.Logout_Time) {
      this.NewcheckOut = this.attendanceData.Logout_Time.replace('T', ' ').replace('Z', '');
      this.actualcheckout = this.NewcheckOut;
    }
    if (this.attendanceData.Login_Time) {
      this.Newcheckin = this.attendanceData.Login_Time.replace('T', ' ').replace('Z', '');
      this.actualCheckin = this.Newcheckin;
    }
    console.log('avb', this.actualcheckout);
    this.api.getRole().subscribe({
      next: (data) => {
        this.roles = data;
        console.log(this.roles);
      },
    });
  }
  Save() {
    // Validation
    if (!this.selectedRole) {
      this.showAlert('Kindly specify who approved this.');
      return;
    }

    if (this.actualCheckin === this.Newcheckin && this.actualcheckout === this.NewcheckOut) {
      this.showAlert('No changes in login time and logout time detected');
      return;
    }

    // Optional: Add loading state
    this.isLoading = true;

    console.log('Updating checkin:', this.Newcheckin);

    this.api
      .updateattendance(this.auth.getToken(), {
        log_id: this.attendanceData.log_id,
        newCheckIn: this.Newcheckin,
        newCheckOut: this.NewcheckOut,
        approved_by: this.selectedRole,
      })
      .pipe(
        switchMap((response) => {
          if (response.status !== 'Updated') {
            throw new Error('Update failed');
          }

          // Only update log if attendance update succeeded
          return this.api.updateLog(this.auth.getToken(), {
            log_id: this.attendanceData.log_id,
            newCheckIn: this.Newcheckin,
            newCheckOut: this.NewcheckOut,
            approved_by: this.selectedRole,
            actualLogInTime: this.actualCheckin,
            actualLogOutTime: this.actualcheckout,
            emp_id: this.attendanceData.empID,
            actionType: 'Update',
          });
        }),
        finalize(() => {
          this.isLoading = false; // Reset loading state
        })
      )
      .subscribe({
        next: (data) => {
          console.log('Update success:', data);
          this.showAlert('Attendance updated successfully');
          this.updateLoginStatus();
          this.onClose();
        },
        error: (err) => {
          console.error('Update error:', err);
          this.showAlert('Failed to update attendance. Please try again.');
        },
      });
  }
  updateLoginStatus() {
    console.log('Im In');
    if (this.actualcheckout == null && this.NewcheckOut !== null) {
      this.api.updateShiftStatus(this.auth.getToken(), this.attendanceData.empID).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      return;
    }
  }
  updateLoginStatusOnDelete() {
    console.log('Im In');
    if (this.actualcheckout == null) {
      this.api.updateShiftStatus(this.auth.getToken(), this.attendanceData.empID).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      return;
    }
  }
  Delete() {
    if (!this.selectedRole) {
      this.showAlert('Kindly specify who approved this.');
      return;
    } else {
      console.log('Deleting log ID:', this.attendanceData.log_id);

      this.api
        .deleteLog(this.auth.getToken(), this.attendanceData.log_id)
        .pipe(
          switchMap((deleteResult: any) => {
            // Only update log if delete was successful
            return this.api.updateLog(this.auth.getToken(), {
              log_id: this.attendanceData.log_id,
              approved_by: this.selectedRole,
              actualLogInTime: this.actualCheckin,
              actualLogOutTime: this.actualcheckout,
              emp_id: this.attendanceData.empID,
              actionType: 'Delete',
            });
          })
        )
        .subscribe({
          next: (data) => {
            console.log('Delete success:', data);
            this.showAlert('Deleted successfully');
            this.onClose();
            this.updateLoginStatusOnDelete();
          },
          error: (err) => {
            console.error('Delete error:', err);
            this.showAlert('Failed to delete item. Please try again.');
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
