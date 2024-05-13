import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ISetFilterParams } from 'ag-grid-enterprise';
import { InvoiceService } from 'src/app/Services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  constructor(private invoiceService: InvoiceService,
              private snackbar : MatSnackBar
  ) { }

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
    setTimeout(() => {
    this.invoiceService.getAllInvoices().subscribe((invoice: any) => {
      this.rowData = invoice;
      this.headData = Object.keys(invoice[0]);
      this.createColDefs();
    },(error)=>{
      console.error('Error fetching invoices:', error);
      this.snackbar.open('Error fetching invoices: ' + error.message, 'Close', {
        duration: 5000, // Duration the snackbar will be displayed in milliseconds
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
    });
    });
    }, 2000);
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
