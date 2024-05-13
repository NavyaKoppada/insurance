import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from "ag-grid-community";
import { ProvidersService } from 'src/app/Services/providers.service';


@Component({
  selector: 'app-custom-edit-button',
  templateUrl: './custom-edit-button.component.html',
  styleUrls: ['./custom-edit-button.component.css']
})
export class CustomEditButtonComponent implements ICellRendererAngularComp {
  public iconClass!: string;
  public value: any;

  constructor(private providersService : ProvidersService){}

  agInit(params: ICellRendererParams): void {
    this.iconClass = params.value === 'yes' ? 'fa fa-check' : 'fa-solid fa-x';
    this.value = params.value;
    console.log(this.value);
    // this.providersService.updateProvider()
  }

  refresh(params: ICellRendererParams) {
    return false;
  }
}

