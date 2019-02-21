import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StepsComponent } from "./steps/steps.component";

const routes: Routes = [
  { path: "steps", children: [{ path: "", component: StepsComponent }] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepRoutingModule {}
