import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, mergeMap } from "rxjs/operators";
import { Doc, DocumentService } from "../document.service";

@Component({
  selector: "app-document",
  templateUrl: "./document.component.html",
  styleUrls: ["./document.component.css"]
})
export class DocumentComponent implements OnInit, OnChanges {
  @Input()
  data = new Doc();
  formData = new Doc();
  input$ = new Subject<string>();
  options = {
    theme: "vs-dark",
    language: "markdown",
    readonly: true
  };
  constructor(private service: DocumentService) {}

  ngOnInit() {}

  ngOnChanges() {
    Object.assign(this.formData, this.data);
    this.input$
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        mergeMap(() => this.service.post(this.formData))
      )
      .subscribe((saved: any) => {
        this.data.content = saved.content;
      });
  }

  onEditorChange(event) {
    this.input$.next(this.formData.content);
  }
}
