import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColDef, GridApi } from 'ag-grid-community';
import { ExcelExportParams } from 'ag-grid-community'; // Import ExcelExportParams
import 'ag-grid-enterprise'; // Import AG Grid Enterprise package
import { time } from 'ag-grid-enterprise';
import { InvoiceService } from 'src/app/Services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  private gridApi: GridApi;
  isLoading: boolean = false;
  headData: string[] = [];
  colDefs: ColDef[] = [];
  rowData: any[] = [];
  rowSelection: "single" | "multiple" = "multiple";
  pagination: boolean = true;
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50, 100];

  timestamp;

  constructor(private invoiceService: InvoiceService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    setTimeout(() => {
      this.invoiceService.getAllInvoices().subscribe(
        (invoices: any[]) => {
          console.log(invoices);
          this.rowData = invoices.map(invoice => ({
            invoiceDate: invoice.id.invoiceDate,
            invoiceNumber: invoice.id.invoiceNumber,
            providerName: invoice.id.providerName,
            recordCount: invoice.recordCount,
            uploaded_timeStamp: invoice.uploaded_timeStamp
          }));

          if (this.rowData.length > 0) {
            this.headData = Object.keys(this.rowData[0]);
            console.log(this.headData);
            this.createColDefs();
          }

          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching invoices:', error);
          this.snackbar.open('Error fetching invoices: ' + error.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
          this.isLoading = false;
        }
      );
    }, 3000);
  }

  private createColDefs() {
    this.colDefs = [];
    this.headData.forEach(field => {
      console.log(field);
      this.colDefs.push({
        field: field,
        filter: 'agTextColumnFilter',
        sortable: true,
        resizable: true
      } as ColDef);
    });
  }

  exportExcel() {
    if (this.gridApi) {
      // if (this.rowData && this.rowData.length > 0) {
      //   this.rowData.forEach(row => {
      //       this.timestamp = row.uploaded_timeStamp;
      //       console.log("timestamp",this.timestamp)
      //   });}
      const params: ExcelExportParams = {
        fileName: 'invoices' // specify the file name
      };
      this.gridApi.exportDataAsExcel(params);
    } else {
      this.snackbar.open('Grid API is not available', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }
}
