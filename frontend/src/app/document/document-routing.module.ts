import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DocumentsComponent } from "./documents/documents.component";
import { PostComponent } from "./post/post.component";

const routes: Routes = [
  {
    path: "docs",
    children: [
      { path: "", component: DocumentsComponent },
      { path: ":id", component: PostComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule {}
