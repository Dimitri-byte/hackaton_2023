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
    const body = { prompt: message }; // Créez un objet avec la propriété "prompt" contenant le message

    return this.http.post<ResponseText>(this.url, body, { headers }); // Envoyez le corps de requête correctement formaté
  }
}