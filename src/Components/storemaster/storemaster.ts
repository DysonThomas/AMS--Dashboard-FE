import { Component } from '@angular/core';
import { Attendanceservice } from '../../Services/api';
import { Authservice } from '../../Services/authservice';
import { Editmodal } from '../editmodal/editmodal';

@Component({
  selector: 'app-storemaster',
  imports: [Editmodal],
  templateUrl: './storemaster.html',
  styleUrl: './storemaster.css',
})
export class Storemaster {
  storeDetails: any[] = [];
  showModal: boolean = false;
  selectedStore: any;
  action: string = '';
  constructor(
    private api: Attendanceservice,
    private auth: Authservice,
  ) {}
  ngOnInit() {
    this.api.getAllStores(this.auth.getToken()).subscribe((res) => {
      this.storeDetails = res;
      console.log(this.storeDetails);
    });
  }
  editStore(e: any) {
    this.showModal = true;
    this.action = 'editStore';
    this.selectedStore = e;
  }
}
