import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NotificationService } from '../../../shared/services/notification-service';
import { removeFromStorage } from '../../../shared/helpers/book-storage';
import { TranslateService } from '@ngx-translate/core';

import { FAV_STORAGE } from '../../../shared/settings';

import { Book } from '../../../models/book';

@Component({
  selector: 'app-books-favourites',
  templateUrl: './books-favourites.component.html',
  styleUrls: ['./books-favourites.component.scss']
})
export class BooksFavouritesComponent implements OnInit {

  data: Book[] = [];
  columns: Columns[] = [
    { key: 'title', title: 'Title' },
    { key: 'author', title: 'Author' },
    { key: 'genre', title: 'Genre' },
    { key: 'year', title: 'Year' },
    { key: 'status', title: 'Status' },
  ];
  configuration: Config;

  constructor(
    private translate: TranslateService,
    private notify: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.getBooks();
    this.getColumns();
  }

  getColumns(): void {
    this.translate.get('books.list.title').subscribe((translated: string) => {
      this.columns = [
        {key: 'title', title: this.translate.instant('books.list.title')},
        {key: 'author', title: this.translate.instant('books.list.author')},
        {key: 'genre', title: this.translate.instant('books.list.genre')},
        {key: 'year', title: this.translate.instant('books.list.year')},
        {key: 'status', title: this.translate.instant('books.list.status')},
      ];
    });
  }

  getBooks(): void {
    this.data = JSON.parse(localStorage.getItem(FAV_STORAGE));
  }

  onRemoveFromFavourites($event: { event: string; value: any }): void {
    if ($event && typeof $event.value === 'undefined') {
      this.notify.showWarn('Favourite books', 'No data!');
      return;
    }
    // disallow if table operations except pick item
    if ($event.value.length > 0 // if it's search operation
      || typeof $event.value.order !== 'undefined'
      || typeof  $event.value.page !== 'undefined') {
      return;
    }

    const source = $event.value.row;
    const { id } = source;

    removeFromStorage(id, FAV_STORAGE);
    // refresh view
    this.getBooks();
    this.notify.showSuccess('Favourites', 'Removed from favourites!');
  }
}
