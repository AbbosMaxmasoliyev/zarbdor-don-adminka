import { IResponse } from './../types/backend/response.type';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "../../environments/environment.development";
import { IDocument } from "../types/backend/document.type";

@Injectable({ providedIn: 'root' })
export class DocumentService {

  constructor(private http: HttpClient) { }
  docUrl = environment.apiUrl + 'api/document/'

  getAll() {
    return this.http.get<IResponse<IDocument[]>>(this.docUrl);
  }

  getById(id: string) {
    return this.http.get<IResponse<IDocument>>(`${this.docUrl}/${id}`);
  }

  create(doc: FormData) {
    return this.http.post<IResponse<IDocument>>(this.docUrl, doc);
  }

  update(id: string, doc: IDocument) {
    return this.http.put<IResponse<IDocument>>(`${this.docUrl}/${id}`, doc);
  }

  delete(id: string) {
    return this.http.delete(`${this.docUrl}/${id}`);
  }
}
