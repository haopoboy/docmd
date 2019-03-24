import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule
} from "@angular/material";
import { CovalentCodeEditorModule } from "@covalent/code-editor";
import { MarkdownModule } from "ngx-markdown";
import { DocumentRoutingModule } from "./document-routing.module";
import { DocumentComponent } from "./document/document.component";
import { DocumentsComponent } from "./documents/documents.component";
import { ExpansionComponent } from "./expansion/expansion.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [DocumentsComponent, DocumentComponent, ExpansionComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    FlexLayoutModule,
    CovalentCodeEditorModule,
    MarkdownModule.forRoot(),
    HttpClientModule
  ]
})
export class DocumentModule {}
