import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ResponseText } from "./generate-text";

@Injectable({
  providedIn: 'root'
})
export class GenerateTextService {

  private url = 'http://localhost:5000/generate-text';

  constructor(private http: HttpClient) { }

  public generate(message: string): Observable<ResponseText> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('prompt', message);
    return this.http.post<ResponseText>(this.url, null, { headers, params });
  }
}