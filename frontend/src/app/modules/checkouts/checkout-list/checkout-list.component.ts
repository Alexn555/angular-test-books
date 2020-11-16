import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { NotificationService } from '../../../shared/services/notification-service';
import { isEventValid } from '../../../shared/helpers/table-event';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

import { getDateTimestamp, isDateInLimits } from '../../../shared/helpers/date.helper';
import { CheckoutService } from '../../../services/checkout-service';

import { Page } from '../../../models/page';
import { Checkout } from '../../../models/checkout';

@Component({
  selector: 'app-books-list',
  templateUrl: './checkout-list.component.html',
  styleUrls: ['./checkout-list.component.scss']
})
export class CheckoutListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  data: Checkout[] = [];
  columns: Columns[] = [
    { key: 'borrowerFirstName', title: 'First name' },
    { key: 'borrowerLastName', title: 'Last name' },
    { key: 'checkedOutDate', title: 'Checkout date' },
    { key: 'dueDate', title: 'Due date' },
    { key: 'returnedDate', title: 'Return date' },
  ];
  configuration: Config;
  constructor(
    private checkOutService: CheckoutService,
    private translate: TranslateService,
    private notify: NotificationService,
    private router: Router,
  ) {
    translate.use('en');
  }

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.showDetailsArrow = true;
    this.configuration.detailsTemplate = true;
    this.getCheckouts();
    this.getColumns();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getColumns(): void {
    // load only if translation service ready
    this.translate.get('checkouts.list.firstName').subscribe((translated: string) => {
      this.columns = [
        { key: 'borrowerFirstName', title: this.translate.instant('checkouts.list.firstName') },
        { key: 'borrowerLastName', title: this.translate.instant('checkouts.list.lastName') },
        { key: 'checkedOutDate', title: this.translate.instant('checkouts.list.checkedOutDate') },
        { key: 'dueDate', title: this.translate.instant('checkouts.list.dueDate') },
        { key: 'returnedDate', title: this.translate.instant('checkouts.list.returnDate') },
      ];
    });
  }

  getCheckouts(): void {
    this.subscription = this.checkOutService.getCheckouts({}).subscribe(data => {
      if (data) {
        this.data = data.content;
      } else {
        this.notify.showWarn('Checkouts', 'No data!');
      }
    });
  }

  isLateChekout(startDate: string, endDate: string): boolean {
    const str = getDateTimestamp(startDate);
    const end = getDateTimestamp(endDate);
    const inLimits = isDateInLimits(str, end, 30);
    return inLimits;
  }

  onBookClick($event: { event: string; value: any }): void {
    if (!isEventValid($event, 'Checkouts', this.notify)) {
      return;
    }

    const source = $event.value.row;
    const { id } = source;
    this.router.navigateByUrl(`/checkouts/:${id}`);
  }

}
