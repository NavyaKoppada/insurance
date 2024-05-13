import { Component } from '@angular/core';
import { ProvidersService } from 'src/app/Services/providers.service';
import { ColDef, GridReadyEvent, ISetFilterParams } from 'ag-grid-community';
import { CustomEditButtonComponent } from './custom-edit-button/custom-edit-button.component';
import { CustomDeleteButtonComponent } from './custom-delete-button/custom-delete-button.component';

@Component({
    selector: 'app-providers',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.css']
})
export class ProvidersComponent {

    constructor(private providersService: ProvidersService) { }

    headData: string[] = [];
    colDefs: ColDef[] = [];
    rowData: any[] = [];
    rowSelection: "single" | "multiple" = "multiple";
    pagination: boolean = true;
    paginationPageSize = 50;
    paginationPageSizeSelector: number[] | boolean = [10, 25, 50, 100];
    isInserting: boolean = false;

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
            }, (error: any) => {
                console.error('Error saving new provider:', error);
                // Optionally handle the error
            });
    }

    onInsertCancel() {
        this.isInserting = false;
    }

    deleteRowAndCallAPI(rowIndex: number) {
        console.log("Delete API called for row index:", rowIndex);
        this.providersService.deleteProviders(this.rowData[rowIndex].providerName).subscribe(
            response => {
                console.log('Item deleted successfully');
                this.setupGrid()
            },
            error => {
                console.error('Error deleting item:', error);
                // Handle the error, if any
            }
        )
    }
}
