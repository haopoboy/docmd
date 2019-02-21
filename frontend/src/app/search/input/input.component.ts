import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { SearchService } from "../search.service";

@Component({
  selector: "app-search-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"]
})
export class InputComponent implements OnInit {
  searchTerm = "";
  input$ = new Subject<string>();
  options = ["First", "Second", "Third"];
  options$: Observable<string[]>;
  constructor(
    private router: Router,
    private search: SearchService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.options$ = of(this.options);
    this.input$
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(input => this.routing(input));

    this.initSearchService();
  }

  initSearchService() {
    this.search.input$.subscribe(input => {
      this.searchTerm = input;
      this.cdr.detectChanges();
    });

    this.search.clear$.subscribe(() => {
      this.searchTerm = "";
      this.cdr.detectChanges();
    });
  }

  routing(term: string) {
    const fitleredTerm = term ? term.trim() : "";
    if (fitleredTerm) {
      this.router.navigate(["search", fitleredTerm]);
    }
  }

  onSearchChange(event: string) {
    if (event) {
      this.input$.next(event);
      this.options$ = of(
        this.options.filter(option =>
          option.toLowerCase().includes(event.toLocaleLowerCase())
        )
      );
    } else {
      this.options$ = of(this.options);
    }
  }
}
