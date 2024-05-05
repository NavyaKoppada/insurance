import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from "ag-grid-community";


@Component({
  selector: 'app-custom-edit-button',
  templateUrl: './custom-edit-button.component.html',
  styleUrls: ['./custom-edit-button.component.css']
})
export class CustomEditButtonComponent implements ICellRendererAngularComp {
  public iconClass!: string;
  public value: any;

  agInit(params: ICellRendererParams): void {
    this.iconClass = params.value === 'yes' ? 'fa fa-check' : 'fa-solid fa-x';
    this.value = params.value;
  }

  refresh(params: ICellRendererParams) {
    return false;
  }
}

