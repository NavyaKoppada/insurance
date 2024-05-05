import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent {

  providerName: string = '';

  @Output() insertSaved = new EventEmitter<void>();
  @Output() insertCancel = new EventEmitter<void>();
providerHealth: any;
providerDental: any;
providerVision: any;
providerLife: any;

  onSave() {
    // Save logic
    this.insertSaved.emit();
  }

  onCancel() {
    this.insertCancel.emit();
  }
}
