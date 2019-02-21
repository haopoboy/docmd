import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SearchService } from "../search.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private search: SearchService) {}

  searchTerm: string;

  ngOnInit() {
    this.route.params.subscribe(params => this.handleParams(params));
  }

  ngOnDestroy() {
    this.search.clear$.next();
  }

  handleParams(params) {
    if (!params) {
      return;
    }

    if (params.q) {
      this.searchTerm = params.q;
      this.search.input$.next(params.q);
    }
  }
}
