import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BookRoutingModule } from "./book-routing.module";
import { BooksComponent } from "./books/books.component";

@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }
