import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit
} from "@angular/core";
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

  headers = [];
  constructor(
    private service: DocumentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    Object.assign(this.formData, this.data);
    this.headers = this.service.extractHeaders(this.data.content);
    this.input$
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        mergeMap(() => this.service.post(this.formData))
      )
      .subscribe((saved: any) => {
        this.data.content = saved.content;
        this.headers = this.service.extractHeaders(this.data.content);
        this.cdr.detectChanges();
      });
  }

  onEditorChange(event) {
    this.input$.next(this.formData.content);
  }
}
