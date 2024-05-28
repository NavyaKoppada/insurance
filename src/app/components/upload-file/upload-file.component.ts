import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/Services/uploadService.service';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProvidersService } from 'src/app/Services/providers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  providers: string[] = [];
  selectedFolder: string;
  responseData;

  headData: string[] = [];
  colDefs: ColDef[] = [];
  rowData: any[] = [];
  rowSelection: "single" | "multiple" = "multiple";
  pagination: boolean = true;
  paginationPageSize = 50;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50, 100];

  toastMessage: string;
  toastType: 'success' | 'error';

  private errorSubscription: Subscription;

  constructor(
    private providersService: ProvidersService,
    private uploadservice: UploadService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.fetchProviders();
    // Initialize the toast message properties
    this.toastMessage = '';
    this.toastType = 'success';
    this.errorSubscription = this.uploadservice.getErrorSubject().subscribe(errorMessage => {
      this.showErrorMessage(errorMessage);
    })
  }

  ngOnDestroy(): void {

    this.errorSubscription.unsubscribe();

  }
  fetchProviders() {
    this.providersService.getAllProviders().subscribe(
      (data) => {
        // Assuming data is an array of objects and each object has a providerName field
        this.providers = data.map(item => item.providerName);
        console.log(data);
        console.log(this.providers);
      },
      (error) => {
        console.error('Error fetching providers:', error);
      }
    );
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

      // Check if the uploaded file name matches the selected provider
      if (!fileName.toLowerCase().includes(selectedProvider.toLowerCase())) {
        // Display toast message for mismatched provider
        this.toastMessage = `The uploaded file (${fileName}) does not match the selected provider (${selectedProvider}).`;
        this.toastType = 'error';

        setTimeout(() => {
          this.toastMessage = '';
        }, 3000);
        this.showErrorMessage('incorrect file has been uploaded')

        return; // Exit method if file name doesn't match selected provider
      }

      // If file name matches selected provider, proceed with upload
      this.uploadservice.uploadFile(file, this.selectedFolder).subscribe(
        (response) => {
          this.responseData = response;
          console.log('File uploaded successfully:', this.responseData);

          // Populate ag-grid table with data
          this.onGridReady({} as GridReadyEvent);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }


  // ag grid table display code.
  onGridReady(params: GridReadyEvent) {
    if (this.responseData) {
      this.rowData = this.responseData.map((upload)=>({
        id : upload.id.id,
        coverageDates : upload.id.coverageDates,
        plan : upload.id.plan,
        policy : upload.policy,
        subscriberName : upload.subscriberName,
        status : upload.status,
        volume : upload.volume,
        chargeAmount : upload.chargeAmount,
        coverageType : upload.coverageType,
        benefitGroup1 : upload.benefitGroup1,
        providerName : upload.providerName
      }));
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
        checkboxSelection: chechbox,
      })
    });
    this.rowSelection = 'multiple';
    console.log("headDefs", this.headData);
    console.log("colDefs", this.colDefs);
    console.log("rowData", this.rowData);
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
