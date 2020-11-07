import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'ngx-easy-table';

import { CheckoutListComponent } from './checkout-list/checkout-list.component';
import { CheckoutDetailComponent } from './checkout-detail/checkout-detail.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    TranslateModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    CheckoutListComponent,
    CheckoutDetailComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckoutsModule {}
