import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StepRoutingModule } from "./step-routing.module";
import { StepsComponent } from "./steps/steps.component";

@NgModule({
  declarations: [StepsComponent],
  imports: [CommonModule, StepRoutingModule]
})
export class StepModule {}
