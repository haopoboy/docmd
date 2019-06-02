import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { MarkdownService, MarkedOptions } from "ngx-markdown";
import { DocumentService } from "./document.service";

describe("DocumentService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MarkedOptions, MarkdownService]
    })
  );

  it("should be created", () => {
    const service: DocumentService = TestBed.get(DocumentService);
    expect(service).toBeTruthy();
  });

  it("should extract text from html", () => {
    const service: DocumentService = TestBed.get(DocumentService);
    expect(service.extractTextFromHtml("<p>Nice</p>")).toBe("Nice");
    expect(service.extractTextFromHtml("<h1>Head 1</h1>")).toBe("Head 1");
  });

  it("should get first line", () => {
    const service: DocumentService = TestBed.get(DocumentService);
    expect(service.getFirstLine("First")).toBe("First");
    expect(service.getFirstLine("First\nSecond")).toBe("First");
    expect(service.getFirstLine("## First")).toBe("## First");
    expect(service.getFirstLine("  ## First")).toBe("## First");
    expect(service.getFirstLine("  \n## First")).toBe("## First");
    expect(service.getFirstLine("  \n   ## First")).toBe("## First");
  });

  it("should get header from markdown", () => {
    const service: DocumentService = TestBed.get(DocumentService);
    expect(service.getHeader("First")).toBe("First");
    expect(service.getHeader("## First")).toBe("First");
    expect(service.getHeader("  \n   ## First")).toBe("First");
  });

  it("should count lines", () => {
    const service: DocumentService = TestBed.get(DocumentService);
    expect(service.countLines("First")).toBe(1);
    expect(service.countLines("Frist\nSecond")).toBe(2);
  });
});
