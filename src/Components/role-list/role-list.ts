import { Component } from '@angular/core';
import { Attendanceservice } from '../../Services/api';

@Component({
  selector: 'app-role-list',
  imports: [],
  templateUrl: './role-list.html',
  styleUrl: './role-list.css',
})
export class RoleList {
  Roles: any[] = [];
  constructor(private api: Attendanceservice) {}
  ngOnInit() {
    this.api.getRole().subscribe({
      next: (data) => {
        this.Roles = data;
        console.log(this.Roles);
      },
    });
  }
}
