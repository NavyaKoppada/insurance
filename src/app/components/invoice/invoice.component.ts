import { Component } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ISetFilterParams } from 'ag-grid-enterprise';
import { InvoiceService } from 'src/app/Services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.fetchData()
  }

  isLoading: boolean = false;
  headData: string[] = [];
  colDefs: ColDef[] = [];
  rowData: string[] = [];
  rowSelection: "single" | "multiple" = "multiple";
  pagination: boolean = true;
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50, 100];

  fetchData() {
    this.isLoading = true;
    // setTimeout(() => {
    this.invoiceService.getAllInvoices().subscribe((invoice: any) => {
      this.rowData = invoice;
      this.headData = Object.keys(invoice[0]);
      this.createColDefs();
    });
    // }, 4000);
  }

  private createColDefs() {
    this.colDefs = [];
    this.headData.forEach(invoice => {
      this.colDefs.push({
        field: invoice,
      }) as ISetFilterParams;
    });
    this.rowSelection = 'multiple';
    this.isLoading = false;
    console.log(this.rowData, this.colDefs)
  }
}
