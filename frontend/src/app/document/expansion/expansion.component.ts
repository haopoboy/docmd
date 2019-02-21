import { Component, Input, OnInit } from "@angular/core";
import { UtilService } from "src/app/service/util.service";
import { DocumentService } from "../document.service";
import { Doc } from "../document/document.component";

@Component({
  selector: "app-expansion",
  templateUrl: "./expansion.component.html",
  styleUrls: ["./expansion.component.css"]
})
export class ExpansionComponent implements OnInit {
  @Input()
  data: Doc[] = [];
  constructor(public util: UtilService, public service: DocumentService) {}

  ngOnInit() {}

  sync(event: Event, row: Doc) {
    event.stopImmediatePropagation();
  }

  publish(event: Event, row: Doc) {
    event.stopImmediatePropagation();
  }

  delete(event: Event, row: Doc) {
    event.stopImmediatePropagation();
    this.data.splice(this.data.indexOf(row), 1);
  }
}
