import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/Services/uploadService.service';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  providers = ['UHG', 'UHC', 'Provider3'];
  selectedFolder: string;
  responseData;

  headData: string[] = [];
  colDefs: ColDef[] = [];
  rowData: string[] = [];
  rowSelection: "single" | "multiple" = "multiple";
  pagination: boolean = true;
  paginationPageSize = 50;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50, 100];

  // Toast Message properties
  toastMessage: string;
  toastType: 'success' | 'error';

  constructor(
    private uploadservice: UploadService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar, // Inject MatSnackBar
  ) { }

  ngOnInit() {
    // Initialize the toast message properties
    this.toastMessage = '';
    this.toastType = 'success';
  }

  folderChanged(event: any) {
    this.selectedFolder = event.value;
    console.log('Selected folder:', this.selectedFolder);
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const fileName = file.name;
      const selectedProvider = this.selectedFolder;
      
      if (fileName.includes(selectedProvider)) {
        this.uploadservice.uploadFile(file, this.selectedFolder).subscribe(
          (response) => {
            this.responseData = response;
            console.log('File uploaded successfully:', this.responseData);
            this.onGridReady({} as GridReadyEvent);
          },
          (error) => {
            console.error('Error uploading file:', error);
          }
        );
      } else {
        // Display toast message
        this.toastMessage = `The uploaded file does not match the selected provider (${selectedProvider}).`;
        this.toastType = 'error';

        setTimeout(() => {
          this.toastMessage = '';
        }, 3000);
  
        // Show the toast message using MatSnackBar
        this.snackBar.open(this.toastMessage, 'Close', {
          duration: 30000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    }
  }
  

  // ag grid table display code.
  onGridReady(params: GridReadyEvent) {
    if (this.responseData) {
      this.rowData = this.responseData;
      this.headData = Object.keys(this.responseData[0]);
      this.createColDefs();
      console.log('navya', this.rowData);
    }
  }

  private createColDefs(): void {
    this.colDefs = [];
    this.headData.forEach(item => {
      let chechbox = item === "id";
      this.colDefs.push({
        field: item,
        editable: true,
        checkboxSelection: chechbox,
      })
    });
    this.rowSelection = 'multiple';
    console.log("headDefs", this.headData);
    console.log("colDefs", this.colDefs);
    console.log("rowData", this.rowData);
  }
}
