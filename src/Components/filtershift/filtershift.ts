import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Attendanceservice } from '../../Services/api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-filtershift',
  imports: [FormsModule],
  templateUrl: './filtershift.html',
  styleUrl: './filtershift.css',
})
export class Filtershift {
  @Output() sendArray = new EventEmitter<any[]>();
  @Output() sendStatus = new EventEmitter<boolean>();
  constructor(private attendanceService: Attendanceservice, private snackBar: MatSnackBar) {}
  attendanceData: any[] = [];
  users: any[] = [];
  startDate: string = '';
  endDate: string = '';
  showSecondbutton: boolean = false;
  showTable: boolean = false;
  selectedUser: string = '';
  onSelectUser(event: any) {
    this.showSecondbutton = true;
    this.selectedUser = event.target.value;
    if (this.selectedUser == '') {
      this.showSecondbutton = false;
    }

    console.log('Selected user:', this.selectedUser);
  }
  getAllAttendance() {
    if (this.startDate == '' || this.endDate == '') {
      this.showAlert('Please fill both dates');
      return;
    }
    if (new Date(this.startDate) > new Date(this.endDate)) {
      this.showAlert('Start date cannot be greater than end date');
      return;
    }
    this.attendanceData = [];
    this.showTable = true;
    this.attendanceService.getAttendance(this.startDate, this.endDate).subscribe((data: any) => {
      this.attendanceData = data;
      this.sendArray.emit(this.attendanceData);
      this.sendStatus.emit(this.showSecondbutton);
      console.log(this.attendanceData);
    });
  }

  ngOnInit() {
    this.attendanceService.getUsers().subscribe((data: any) => {
      this.users = data;
      console.log('users', this.users);
    });
  }
  getSelectedUserAttendance() {
    if (this.startDate == '' || this.endDate == '') {
      this.showAlert('Please fill both dates');
      return;
    }
    if (new Date(this.startDate) > new Date(this.endDate)) {
      this.showAlert('Start date cannot be greater than end date');
      return;
    }
    this.attendanceData = [];
    console.log('Fetching attendance for user:', this.selectedUser);
    this.showTable = true;
    this.attendanceService
      .getSpecificUserAttendance(this.selectedUser, this.startDate, this.endDate)
      .subscribe((data: any) => {
        this.attendanceData = data;
        this.sendArray.emit(this.attendanceData);
        this.sendStatus.emit(this.showSecondbutton);
        console.log(this.attendanceData);
      });
  }
  showAlert(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
