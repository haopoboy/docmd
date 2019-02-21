import { LayoutModule } from "@angular/cdk/layout";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BookModule } from "./book/book.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { DocumentModule } from "./document/document.module";
import { SearchModule } from "./search/search.module";
import { StepModule } from "./step/step.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    FlexLayoutModule,
    DashboardModule,
    SearchModule,
    DocumentModule,
    StepModule,
    BookModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
