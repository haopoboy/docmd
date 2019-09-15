import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Doc, DocumentService } from "../document.service";

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
    const page: any = await this.service.findPostById(id).toPromise();
    if (page.content.length > 0) {
      this.data = page.content[0];
    } else {
      this.data = new Doc("", "## OOPS");
    }
    this.headers = this.service.extractHeaders(this.data.content);
  }
}
