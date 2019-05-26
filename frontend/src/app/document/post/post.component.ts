import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { forkJoin } from "rxjs";
import { DocumentService } from "../document.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  options = {
    theme: "vs-dark",
    language: "markdown",
    readonly: true
  };

  originalModel = {
    code: "Hello",
    language: "markdown"
  };

  modifiedModel = {
    code: "hello world",
    language: "markdown"
  };

  constructor(private service: DocumentService, route: ActivatedRoute) {
    route.params.subscribe(params => this.findOne(params.id));
  }

  ngOnInit() {}

  findOne(id: string) {
    forkJoin(this.service.findPostById(id), this.service.findOne(id)).subscribe(
      data => {
        this.originalModel.code = data[0] ? data[0].content : "";
        this.modifiedModel.code = data[1] ? data[1].content : "";
      }
    );
  }

  publish() {}
}
