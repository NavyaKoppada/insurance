import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IDeactivate } from 'src/app/Services/authGuardService.service';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent implements IDeactivate{

  providerName: string = '';
  providerHealth: string = '';
  providerDental: string = '';
  providerVision: string = '';
  providerLife: string = '';

  isSubmitted : boolean = false;

  @Output() insertSaved = new EventEmitter<any>();
  @Output() insertCancel = new EventEmitter<void>();

  
  onSave(form: NgForm) {
    console.log(form);
    // this.insertSaved.emit();
    this.isSubmitted = true;
    if (form.valid) {
      const formData = form.value;
      this.insertSaved.emit(formData);
    }
  }

  onCancel() {
    this.insertCancel.emit();
  }

  canExit(): boolean {
    if (this.isSubmitted || !this.providerName && !this.providerHealth && !this.providerDental && !this.providerVision && !this.providerLife) {
      return true;
    } else {
      return confirm("Are you sure you want to exit this page?");
    }
  }
}
