import { Injectable } from "@angular/core";
import { MarkdownService } from "ngx-markdown";

@Injectable({
  providedIn: "root"
})
export class DocumentService {
  constructor(private markdown: MarkdownService) {}

  getHeader(content = ""): string {
    const html = this.markdown.compile(this.getFirstLine(content));
    return this.extractTextFromHtml(html);
  }

  getFirstLine(content = ""): string {
    const firstLine = content.trim().split(/\r\n|\r|\n/)[0];
    return firstLine;
  }

  extractTextFromHtml(html = "") {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.trim();
  }

  countLines(content = "") {
    return content.split(/\r\n|\r|\n/).length;
  }
}
