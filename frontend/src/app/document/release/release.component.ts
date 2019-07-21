import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DocumentService, Doc } from "../document.service";

@Component({
  selector: "app-release",
  templateUrl: "./release.component.html",
  styleUrls: ["./release.component.css"]
})
export class ReleaseComponent implements OnInit {
  headers = [];
  data: Doc = new Doc();

  constructor(private service: DocumentService, route: ActivatedRoute) {
    route.params.subscribe(params => this.findOne(params.id));
  }

  ngOnInit() {}

  async findOne(id) {
    const posts: any = this.service.findPostById(id).toPromise();
    if (posts.length > 0) {
      this.data = posts[0];
    } else {
      this.data = new Doc("", "## OOPS");
    }
    this.headers = this.service.extractHeaders(this.data.content);
  }
}
