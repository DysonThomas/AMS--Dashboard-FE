import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Authservice } from '../../Services/authservice';
import { Attendanceservice } from '../../Services/api';
import { E } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-actionlogs',
  imports: [FormsModule],
  templateUrl: './actionlogs.html',
  styleUrl: './actionlogs.css',
})
export class Actionlogs {
  constructor(private api: Attendanceservice, private auth: Authservice) {}
  startDate: any = '';
  endDate: any = '';
  logs: any[] = [];
  generateLog() {
    if (this.startDate != '' || this.endDate != '') {
      this.api.getLog(this.auth.getToken(), this.startDate, this.endDate).subscribe({
        next: (data) => {
          this.logs = data;
          console.log(this.logs);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      alert(1);
    }
  }
}
