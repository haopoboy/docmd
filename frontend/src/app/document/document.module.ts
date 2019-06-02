import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule
} from "@angular/material";
import { MarkdownModule } from "ngx-markdown";
import { MonacoEditorModule } from "ngx-monaco-editor";
import { DocumentRoutingModule } from "./document-routing.module";
import { DocumentComponent } from "./document/document.component";
import { DocumentsComponent } from "./documents/documents.component";
import { ExpansionComponent } from "./expansion/expansion.component";
import { PostComponent } from "./post/post.component";

@NgModule({
  declarations: [
    DocumentsComponent,
    DocumentComponent,
    ExpansionComponent,
    PostComponent
  ],
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
    MatTooltipModule,
    FlexLayoutModule,
    MarkdownModule.forRoot(),
    MonacoEditorModule.forRoot(),
    HttpClientModule
  ]
})
export class DocumentModule {}
