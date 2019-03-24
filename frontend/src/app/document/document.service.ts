import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MarkdownService } from "ngx-markdown";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export class Doc {
  constructor(public uuid = "", public content = "") {}
}

@Injectable({
  providedIn: "root"
})
export class DocumentService {
  constructor(private markdown: MarkdownService, private http: HttpClient) {}

  find(): Observable<any> {
    return this.http.get(`${environment.apiBaseUri}/v1/documents`);
  }

  post(doc = new Doc()): Observable<any> {
    return this.http.post(`${environment.apiBaseUri}/v1/document`, doc);
  }

  delete(doc: Doc): Observable<any> {
    return this.http.delete(
      `${environment.apiBaseUri}/v1/document/${doc.uuid}`
    );
  }

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
