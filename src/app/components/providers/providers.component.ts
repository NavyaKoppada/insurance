import { Component, OnDestroy } from '@angular/core';
import { ProvidersService } from 'src/app/Services/providers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CustomDeleteButtonComponent } from './custom-delete-button/custom-delete-button.component';
import { ColDef, GridReadyEvent, ISetFilterParams } from 'ag-grid-community';
import { CustomEditButtonComponent } from './custom-edit-button/custom-edit-button.component';

@Component({
    selector: 'app-providers',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnDestroy {
    private errorSubscription: Subscription;

    constructor(
        private providersService: ProvidersService,
        private snackBar: MatSnackBar
    ) { }

    headData: string[] = [];
    colDefs: ColDef[] = [];
    rowData: any[] = [];
    rowSelection: "single" | "multiple" = "multiple";
    pagination: boolean = true;
    paginationPageSize = 50;
    paginationPageSizeSelector: number[] | boolean = [10, 25, 50, 100];
    isInserting: boolean = false;

    ngOnInit(): void {
        this.errorSubscription = this.providersService.getErrorSubject().subscribe(errorMessage => {
            this.showErrorMessage(errorMessage);
        });
    }

    ngOnDestroy(): void {
        if (this.errorSubscription) {
            this.errorSubscription.unsubscribe();
        }
    }

    onGridReady(params: GridReadyEvent) {
        this.setupGrid();
    }
    setupGrid() {
        this.providersService.getAllProviders().subscribe((data: any) => {
            this.rowData = data;
            if (data.length > 0) {
                this.headData = Object.keys(data[0]); // Assuming the first row contains the column headers
                this.createColDefs();
            }
        });
    }

    createColDefs() {
        this.colDefs = [];
        this.headData.forEach(item => {
            console.log('item', item)
            let checkbox = item === "providerName";
            let isHealthOrDentalOrVisionOrLife = (item === 'health' || item === 'dental' || item === 'vision' || item === 'life');
            let columnDefinition: ColDef = {
                field: item,
                editable: true,
                checkboxSelection: checkbox,
                filterParams: {
                    applyMiniFilterWhileTyping: true
                } as ISetFilterParams
            };

            if (isHealthOrDentalOrVisionOrLife) {
                columnDefinition.cellRenderer = CustomEditButtonComponent;
                columnDefinition.editable = true;
                columnDefinition.cellEditor = "agSelectCellEditor";
                columnDefinition.cellEditorParams = {
                    values: ["yes", "no"],
                };
            }

            this.colDefs.push(columnDefinition);
        });

        this.colDefs.push({
            headerName: "Delete",
            cellRenderer: CustomDeleteButtonComponent,
            width: 100,
            cellRendererParams: {
                onDelete: this.deleteRowAndCallAPI.bind(this),
            }
        });
        this.rowSelection = 'multiple';
    }


    onInsertClicked() {
        this.isInserting = true;
    }

    onInsertSaved(formData: any) {
        this.providersService.createProvider(formData)
            .subscribe((response: any) => {
                console.log('New Provider Saved:', response);
                this.setupGrid();
                this.isInserting = false; // Close the form after successful submission
            });
    }

    onInsertCancel() {
        this.isInserting = false;
    }

    deleteRowAndCallAPI(rowIndex: number) {
        console.log("Delete API called for row index:", rowIndex);
        this.providersService.deleteProviders(this.rowData[rowIndex].providerName).subscribe(
            () => {
                console.log('Item deleted successfully');
                this.setupGrid();
            }
        );
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
