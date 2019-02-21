import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { TdCodeEditorComponent } from "@covalent/code-editor";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

export class Doc {
  constructor(public content = "") {}
}

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
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    Object.assign(this.formData, this.data);
    this.input$
      .pipe(
        debounceTime(250),
        distinctUntilChanged()
      )
      .subscribe(input => (this.data.content = input));
  }

  onEditorChange(editor: TdCodeEditorComponent, event) {
    this.input$.next(this.formData.content);
  }

  // updateEditorHeight(editor: TdCodeEditorComponent) {
  //   let heightByLines = this.countLines(editor.value) * 19;
  //   if (heightByLines < 500) {
  //     heightByLines = 500;
  //   }
  //   editor._editorContainer.nativeElement.style.height = `${heightByLines}px`;
  //   editor.layout();
  // }
}
