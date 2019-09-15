import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { Doc, DocumentService } from "../document.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  options = {
    theme: "vs-dark",
    language: "markdown"
  };

  code = "";
  originalModel: any = {};
  modifiedModel: any = {};
  modifiedDoc: Doc;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: DocumentService
  ) {
    route.params.subscribe(params => this.findOne(params.id));
  }

  ngOnInit() {}

  findOne(id: string) {
    forkJoin(this.service.findPostById(id), this.service.findOne(id)).subscribe(
      data => {
        this.originalModel = {
          code: data[0] && data[0].content[0] ? data[0].content[0].content : "",
          language: "markdown"
        };

        this.modifiedDoc = data[1];
        this.modifiedModel = {
          code: data[1] ? data[1].content : "",
          language: "markdown"
        };
      }
    );
  }

  async publish() {
    await this.service.publish(this.modifiedDoc).toPromise();
    this.router.navigate(["release"], { relativeTo: this.route });
  }

  onEditorChange(event) {
    console.log("Diff changed but we couldn't get modified model");
  }
}
