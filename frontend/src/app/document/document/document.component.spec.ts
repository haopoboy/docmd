import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DocumentModule } from "../document.module";
import { DocumentComponent } from "./document.component";

describe("DocumentComponent", () => {
  let component: DocumentComponent;
  let fixture: ComponentFixture<DocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DocumentModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
