import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { Doc, DocumentService } from "../document.service";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.css"]
})
export class DocumentsComponent implements OnInit {
  @Input()
  data: any[] = [];
  constructor(
    private cdr: ChangeDetectorRef,
    private service: DocumentService
  ) {}

  ngOnInit() {
    this.service.findAll().subscribe((page: any) => {
      this.data = page.content;
      this.cdr.detectChanges();
    });
  }

  add(item?: Doc) {
    this.service.post(item).subscribe(saved => {
      this.data.push(saved);
      this.cdr.detectChanges();
    });
  }
}
