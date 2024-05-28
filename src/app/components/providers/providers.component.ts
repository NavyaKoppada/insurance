import { Component, OnDestroy, inject } from '@angular/core';
import { ProvidersService } from 'src/app/Services/providers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CustomDeleteButtonComponent } from './custom-delete-button/custom-delete-button.component';
import { ColDef, GridReadyEvent, ISetFilterParams } from 'ag-grid-community';
import { CustomEditButtonComponent } from './custom-edit-button/custom-edit-button.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-providers',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnDestroy {
    constructor(
        private providersService: ProvidersService,
        private snackBar: MatSnackBar // Inject MatSnackBar for displaying error messages
    ) { }

    headData: string[] = [];
    colDefs: ColDef[] = [];
    rowData: any[] = [];
    rowSelection: "single" | "multiple" = "multiple";
    pagination: boolean = true;
    paginationPageSize = 50;
    paginationPageSizeSelector: number[] | boolean = [10, 25, 50, 100];
    isInserting: boolean = false;
    originalData: any[] = [];
    

    AllProviders;
    searchProvider : string = '';
    activeRoute : ActivatedRoute = inject(ActivatedRoute);
    route : Router = inject(Router);

    private errorSubscription: Subscription;

    ngOnInit(): void {
        this.errorSubscription = this.providersService.getErrorSubject().subscribe(errorMessage => {
            this.showErrorMessage(errorMessage);
        });
    }

    ngOnDestroy(): void {
        this.errorSubscription.unsubscribe();
    }

    onGridReady(params: GridReadyEvent) {
        this.setupGrid();
    }

    setupGrid() {
        this.searchProvider = this.activeRoute.snapshot.queryParamMap.get('search');
        console.log(this.searchProvider);
    
        this.providersService.getAllProviders().subscribe((data: any) => {
            console.log(data);
            this.originalData = data;
            if (this.searchProvider === undefined || this.searchProvider === '' || this.searchProvider === null) {
                this.rowData = data;
            } else {
                this.rowData = data.filter((prov: any) => prov.providerName.toLowerCase().includes(this.searchProvider.toLowerCase()));
            }
    
            if (this.rowData.length > 0) {
                this.headData = Object.keys(this.rowData[0]); // Assuming the first row contains the column headers
                this.createColDefs();
            }
        }, error => {
            console.error('Error fetching providers:', error);
            this.showErrorMessage('Failed to fetch providers. Please try again.');
        });
    }

    onSearchProvider(searchTerm: string) {
        console.log(searchTerm);
        if (!searchTerm) {
            this.rowData = this.originalData; // Reset to original data if search term is empty
            this.route.navigate(['/addProviders'], { queryParams: {} }); // Remove query parameter if empty
        } else {
            this.rowData = this.originalData.filter((prov: any) =>
                prov.providerName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            this.route.navigate(['/addProviders'], { queryParams: { search: searchTerm } });
        }
    }
    

    createColDefs() {
        this.colDefs = [];
        this.headData.forEach(item => {
            let isHealthOrDentalOrVisionOrLife = (item === 'health' || item === 'dental' || item === 'vision' || item === 'life');
            let columnDefinition: ColDef = {
                field: item,
                editable: true,
                singleClickEdit: true,
                filter: 'agTextColumnFilter',
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
