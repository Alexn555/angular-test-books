import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { FAV_STORAGE } from '../../shared/settings';
import { saveDataToStorage } from '../../shared/services/book-storage';
import { NotificationService } from '../../shared/services/notification-service';

enum NotifyTypes {
  Item = 'Book detail',
  Favourites = 'Book in favourites',
  Update = 'update',
  Delete = 'delete'
}

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private notify: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getBook();
  }

  private createForm(): void {
    this.editForm = this.fb.group({
        title: ['', [Validators.required]],
        author: ['', Validators.required],
        genre: ['', [Validators.required]],
      }
    );
    this.editForm = new FormGroup(this.editForm.controls, {
      updateOn: 'blur'
    });
  }

  setFormControls(): void {
    const { title, author, genre } = this.book;
    this.editForm.patchValue({
      title,
      author,
      genre
    });
  }

  updateFromForm(formValue: any): void {
    this.book.title = formValue.title !== ''
      ? formValue.title : this.book.title;

    this.book.author = formValue.author !== ''
      ? formValue.author : this.book.author;

    this.book.genre = formValue.genre !== ''
      ? formValue.genre : this.book.genre;
  }

  getBook(): void {
     this.route.params.subscribe(data => {
         // get id without : first param char
         const bookId = data.id.substr(1, data.length);
         this.bookService.getBook(bookId).subscribe(book => {
           if (book) {
             this.book = book;
             this.setFormControls();
           } else {
             this.showError(NotifyTypes.Item);
           }
         });
    });
  }

  editBook(): void {
    this.updateFromForm(this.editForm.value);
    this.bookService.saveBook(this.book).subscribe(null, error => {
      if (error && error.status === 200) {
        this.showSuccess(NotifyTypes.Update);
      } else {
        this.showError(NotifyTypes.Update);
      }
    });
  }

  deleteBook(): void {
    let success = true;
    this.bookService.deleteBook(this.book.id).subscribe(null, error => {
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

  // save to local storage favourite ones
  addToFavourites(): void {
    if (this.book) {
      const isSaved = saveDataToStorage(this.book, FAV_STORAGE);
      if (isSaved) {
        this.showSuccess(NotifyTypes.Favourites, true);
      }
    }
  }

  showSuccess(type, isRedirect = false): void {
    this.notify.showSuccess(type, `Successful ${type}`);
    if (isRedirect) {
      setTimeout(() => this.router.navigateByUrl('/books'), 1000);
    }
  }

  showError(type): void {
    this.notify.showError('Error', `Error in operation ${type}`);
  }

}
