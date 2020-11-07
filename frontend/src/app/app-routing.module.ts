import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './modules/books/books-list/books-list.component';
import { BookDetailComponent } from './modules/books/book-detail/book-detail.component';
import { BooksFavouritesComponent } from './modules/books/books-favourites/books-favourites.component';

import { CheckoutListComponent } from './modules/checkouts/checkout-list/checkout-list.component';
import { CheckoutDetailComponent } from './modules/checkouts/checkout-detail/checkout-detail.component';


const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: BooksListComponent},
  {path: 'books/:id', component: BookDetailComponent},
  {path: 'favourites', component: BooksFavouritesComponent},
  {path: 'checkouts', component: CheckoutListComponent},
  {path: 'checkouts/:id', component: CheckoutDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
