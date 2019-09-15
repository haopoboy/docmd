import {
  InMemoryDbService,
  RequestInfo,
  ResponseOptions
} from "angular-in-memory-web-api";

export class InMemoryDbServiceImpl implements InMemoryDbService {
  createDb() {
    const documents: any = [{ id: 1, content: "## Hello World" }];
    documents.forEach(element => this.initData(element));
    const document = documents;

    const posts = [{ id: 1, documentId: 1, content: "Hello" }];
    const post = posts;
    return { document, documents, post, posts };
  }

  responseInterceptor(response: ResponseOptions, requestInfo: RequestInfo) {
    if ("post" === requestInfo.method) {
      // Fix undefine body from request when updated data
      response.body = response.body
        ? response.body
        : (requestInfo.req as any).body;
      this.initData(response.body);
      return response;
    } else if (requestInfo.id) {
      return response;
    } else {
      // United pageable from server
      const page = { content: response.body };
      response.body = page;
      return response;
    }
  }

  initData(data) {
    data.uuid = data.id;
  }
}
