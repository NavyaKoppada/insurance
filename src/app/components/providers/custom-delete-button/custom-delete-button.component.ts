import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ProvidersService } from 'src/app/Services/providers.service';

@Component({
  selector: 'app-custom-delete-button',
  templateUrl: './custom-delete-button.component.html',
  styleUrls: ['./custom-delete-button.component.css']
})
export class CustomDeleteButtonComponent implements ICellRendererAngularComp {
  constructor(private providers: ProvidersService) { }

  params: any;
  agInit(params: ICellRendererParams): void {
    console.log("in the child compoennt")
    console.log(params);
    this.params = params;
  }

  @Input()
  providerName: string;

  refresh(params: ICellRendererParams) {
    return true;
  }

  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Input() rowData: any;
  onDeleteClick(rowIndex: number) {
    console.log("Delete button clicked for row index:", rowIndex);
    this.params.onDelete(rowIndex);
  }
}
