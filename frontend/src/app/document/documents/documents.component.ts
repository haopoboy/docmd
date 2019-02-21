import { ChangeDetectorRef, Component, OnInit, Input } from "@angular/core";
import { Doc } from "../document/document.component";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.css"]
})
export class DocumentsComponent implements OnInit {
  @Input()
  data: Doc[] = [];
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  add(item = new Doc()) {
    this.data.push(item);
    this.cdr.detectChanges();
  }
}
