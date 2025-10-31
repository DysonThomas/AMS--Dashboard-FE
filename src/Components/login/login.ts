import { Component } from '@angular/core';
import { Attendanceservice } from '../../Services/api';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  constructor(
    private attendanceService: Attendanceservice,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  login() {
    if (this.email == '' || this.password == '') {
      this.showAlert('Please fill Both Email and Password');
    } else {
      this.attendanceService.login({ email: this.email, password: this.password }).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.user.id);
          this.showAlert(data.message);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.showAlert(err.error.message);
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
