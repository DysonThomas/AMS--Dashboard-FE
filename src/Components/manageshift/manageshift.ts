import { Component, ViewChild } from '@angular/core';
import { Filtershift } from '../filtershift/filtershift';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-manageshift',
  imports: [Filtershift, Modal],
  templateUrl: './manageshift.html',
  styleUrl: './manageshift.css',
})
export class Manageshift {
  @ViewChild(Filtershift) filterShiftComponent!: Filtershift;
  attendanceData: any = [];
  showmodal: boolean = false;
  selectedProduct: any = {};
  showSecondButton: boolean = false;
  handleArrayFromChild(receivedArray: string[]) {
    this.attendanceData = receivedArray;
    console.log('Array from child:', receivedArray);
    // You can now use it — assign to variable, process, etc.
  }
  edit(product: any) {
    console.log(product);
    this.selectedProduct = product;
    this.showmodal = true;
  }
  handleClose() {
    this.showmodal = !this.showmodal;
    if (this.showSecondButton) {
      this.filterShiftComponent.getSelectedUserAttendance();
    } else if (!this.showSecondButton) {
      this.filterShiftComponent.getAllAttendance();
    }
  }
  handlestatusFromChild(receivedStatus: boolean) {
    this.showSecondButton = receivedStatus;
    console.log('Dyson', this.showSecondButton);
  }
}
