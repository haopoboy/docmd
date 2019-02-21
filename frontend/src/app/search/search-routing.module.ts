import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InputComponent } from "./input/input.component";
import { SearchComponent } from "./search/search.component";

const routes: Routes = [
  { path: "", outlet: "searchInput", component: InputComponent },
  {
    path: "search/:q",
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {}
