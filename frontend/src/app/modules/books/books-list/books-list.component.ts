import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/services/notification-service';

import { BookService } from '../../../services/book.service';
import { Observable, Subscription } from 'rxjs';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

import { Page } from '../../../models/page';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {

  // books$: Observable<Page<Book> | Error>;
  subscription: Subscription;
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
    private bookService: BookService,
    private notify: NotificationService,
    private router: Router,
  ) {
    translate.use('en');
  }

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.getBooks();
    this.getColumns();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    this.subscription = this.bookService.getBooks({}).subscribe(data => {
      if (data) {
        this.data = data.content;
      } else {
        this.notify.showWarn('Books', 'No data!');
      }
    });
  }

  onBookClick($event: { event: string; value: any }): void {
    if ($event && typeof $event.value === 'undefined') {
      this.notify.showWarn('Books', 'No book in event selector!');
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
    this.router.navigateByUrl(`/books/:${id}`);
  }

}
