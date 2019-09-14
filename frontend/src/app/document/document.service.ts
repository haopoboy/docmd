import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MarkdownService } from "ngx-markdown";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { isString } from "util";

export class Doc {
  constructor(public uuid = "", public content = "") {}
}

@Injectable({
  providedIn: "root"
})
export class DocumentService {
  constructor(private markdown: MarkdownService, private http: HttpClient) {}

  findOne(id: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUri}/document/${id}`);
  }

  findAll(): Observable<any> {
    return this.http.get(`${environment.apiBaseUri}/documents`);
  }

  post(doc = new Doc()): Observable<any> {
    return this.http.post(`${environment.apiBaseUri}/document`, doc);
  }

  delete(doc: Doc): Observable<any> {
    return this.http.delete(`${environment.apiBaseUri}/document/${doc.uuid}`);
  }

  publish(doc = new Doc()): Observable<any> {
    return this.http.post(`${environment.apiBaseUri}/post`, {
      documentId: doc.uuid,
      content: doc.content
    });
  }

  findPostById(id: string): Observable<any> {
    return this.http.get(
      `${
        environment.apiBaseUri
      }/posts?documentId=${id}&size=1&sort=creationTimestamp,desc`
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

  extractHeaders(content = ""): String[] {
    const headers = [];
    const regexp = /#{1,6}(?!#)(.*)/gm;
    let match = regexp.exec(content);
    while (match != null) {
      if (isString(match[1])) {
        headers.push(match[1].trim());
      }
      match = regexp.exec(content);
    }
    return headers;
  }
}
