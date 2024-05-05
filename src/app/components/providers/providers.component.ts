import { Component, ElementRef, Input, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { ProvidersService } from 'src/app/Services/providers.service';
import { ColDef, GridReadyEvent, ISetFilterParams } from 'ag-grid-community';
import { NgForm } from '@angular/forms';
import { CustomEditButtonComponent } from './custom-edit-button/custom-edit-button.component';
import { CustomDeleteButtonComponent } from './custom-delete-button/custom-delete-button.component';

@Component({
    selector: 'app-providers',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements AfterViewInit {

    constructor(private providersService: ProvidersService) { }


    @ViewChild('deleteButtonTemplate', { static: true }) deleteButtonTemplate: TemplateRef<any>;

    headData: string[] = [];
    colDefs: ColDef[] = [];
    rowData: any[] = [];
    rowSelection: "single" | "multiple" = "multiple";
    pagination: boolean = true;
    paginationPageSize = 50;
    paginationPageSizeSelector: number[] | boolean = [10, 25, 50, 100];
    isInserting: boolean = false;


    providerName: string = '';
    providerHealth: string = '';
    providerDental: string = '';
    providerVision: string = '';
    providerLife: string = '';

    @ViewChild('newProviderForm') newProviderForm: NgForm;

    ngAfterViewInit() {
        console.log(this.newProviderForm);
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

    onInsertSaved() {
        this.providerName = this.newProviderForm.value.providerName;
        this.providerHealth = this.newProviderForm.value.health;
        this.providerDental = this.newProviderForm.value.dental;
        this.providerVision = this.newProviderForm.value.vision;
        this.providerLife = this.newProviderForm.value.life;

        this.providersService.createProvider(this.providerName, this.providerHealth, this.providerDental, this.providerVision, this.providerLife).subscribe((response: any) => {
            console.log('New Provider Saved:', response);

            // Call setupGrid to refresh data after saving
            this.setupGrid();

            this.isInserting = false;
            this.newProviderForm.resetForm(); // Reset the form after successful submission
        }, (error: any) => {
            console.error('Error saving new provider:', error);
            // Optionally handle the error
        });

        console.log('New Provider Saved:', this.providerName, this.providerHealth, this.providerDental, this.providerVision, this.providerLife);
    }

    onInsertCancel() {
        // Reset form and hide it
        this.providerName = '';
        this.providerHealth = '';
        this.providerDental = '';
        this.providerVision = '';
        this.providerLife = '';

        this.isInserting = false;
        this.newProviderForm.resetForm(); // Reset the form on cancel
    }

    deleteRowAndCallAPI(rowIndex: number) {
        console.log("Delete API called for row index:", rowIndex);
        this.providersService.deleteProviders(this.rowData[rowIndex].providerName).subscribe(
            response => {
                console.log('Item deleted successfully');
                this.setupGrid()
                // Update the UI or handle any other actions after deletion
            },
            error => {
                console.error('Error deleting item:', error);
                // Handle the error, if any
            }
        )
        console.log('Delete button clicked');

    }
}
