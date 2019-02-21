import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class SearchService {
  input$: Subject<string> = new Subject();
  clear$ = new Subject<void>();
  constructor() {}
}
