import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from "@angular/material";
import { InputComponent } from "./input/input.component";
import { SearchRoutingModule } from "./search-routing.module";
import { SearchComponent } from "./search/search.component";

@NgModule({
  declarations: [SearchComponent, InputComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    FlexLayoutModule
  ]
})
export class SearchModule {}
