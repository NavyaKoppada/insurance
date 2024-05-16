import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProvidersService } from 'src/app/Services/providers.service';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent implements OnDestroy {

  providerName: string = '';
  providerHealth: string = '';
  providerDental: string = '';
  providerVision: string = '';
  providerLife: string = '';

  isSubmitted: boolean = false;

  @Output() insertCancel = new EventEmitter<void>();

  private errorSubscription: Subscription;

  constructor(
    private providersService: ProvidersService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.errorSubscription = this.providersService.getErrorSubject().subscribe(errorMessage => {
      this.showErrorMessage(errorMessage);
    });
  }

  ngOnDestroy(): void {

    this.errorSubscription.unsubscribe();

  }

  onSave(form: NgForm) {
    if (form.valid) {
      this.isSubmitted = true;
      this.providersService.createProvider(form.value)
        .subscribe(
          (response: any) => {
            console.log('New Provider Saved:', response);
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          (error: any) => {
            console.error('Error saving new provider:', error);
            this.isSubmitted = false; // Reset submitted state if saving fails
          }
        );
    }
  }


  onCancel() {
    this.isSubmitted = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canExit(): boolean {
    if (this.isSubmitted || !this.providerName && !this.providerHealth && !this.providerDental && !this.providerVision && !this.providerLife) {
      return true;
    } else {
      return confirm("Are you sure you want to exit this page?");
    }
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
