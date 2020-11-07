import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../../../services/checkout-service';
import { Checkout } from '../../../models/checkout';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { NotificationService } from '../../../shared/services/notification-service';

enum NotifyTypes {
  Item = 'Checkout detail',
  Update = 'update',
  Delete = 'delete'
}

@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html',
  styleUrls: ['./checkout-detail.component.scss']
})
export class CheckoutDetailComponent implements OnInit {
  checkout: Checkout;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private checkOutService: CheckoutService,
    private notify: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getCheckout();
  }

  private createForm(): void {
    this.editForm = this.fb.group({
        borrowerFirstName: ['', [Validators.required]],
        borrowerLastName: ['', Validators.required],
        checkedOutDate: ['', [Validators.required]],
      }
    );
  }

  getCheckout(): void {
     this.route.params.subscribe(data => {
         // get id without : first param char
         const checkoutId = data.id.substr(1, data.length);

         this.checkOutService.getCheckout(checkoutId).subscribe(checkout => {
           if (checkout) {
             this.checkout = checkout;
             this.setFormControls();
           } else {
             this.showError(NotifyTypes.Item);
           }
         });
    });
  }

  setFormControls(): void {
    const { borrowerFirstName, borrowerLastName, checkedOutDate } = this.checkout;
    this.editForm.patchValue({
      borrowerFirstName,
      borrowerLastName,
      checkedOutDate
    });
  }

  updateFromForm(formValue: any): void {
    this.checkout.borrowerFirstName = formValue.borrowerFirstName !== ''
      ? formValue.borrowerFirstName : this.checkout.borrowerFirstName;

    this.checkout.borrowerLastName = formValue.borrowerLastName !== ''
      ? formValue.borrowerLastName : this.checkout.borrowerLastName;

    this.checkout.checkedOutDate = formValue.checkedOutDate !== ''
      ? formValue.checkedOutDate : this.checkout.checkedOutDate;
  }

  editCheckout(): void {
    let success = true;
    this.updateFromForm(this.editForm.value);
    this.editForm.disable();
    this.checkOutService.saveCheckout(this.checkout).subscribe(null, error => {
      if (error) {
        success = false;
        this.showError(NotifyTypes.Update);
      }
    });
    setTimeout(() => { // since we get void response if success
      if (success) {
        this.showSuccess(NotifyTypes.Update);
      }
    }, 1500);
  }

  deleteCheckout(): void {
    let success = true;
    this.checkOutService.deleteCheckout(this.checkout.id).subscribe(null, error => {
      if (error) {
        success = false;
        this.showError(NotifyTypes.Delete);
      }
    });
    setTimeout(() => { // since we get void response if success
      if (success) {
        this.showSuccess(NotifyTypes.Delete);
      }
    }, 1500);
  }

  showSuccess(type, isRedirect = false): void {
    this.notify.showSuccess(type, `Successful ${type}`);
    this.editForm.enable();
    if (isRedirect) {
      setTimeout(() => this.router.navigateByUrl('/checkouts'), 1000);
    }
  }

  showError(type): void {
    this.editForm.enable();
    this.notify.showError('Error', `Error in operation ${NotifyTypes.Update}`);
  }

}
