import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ResponseText} from "./generate-text";

@Injectable({
    providedIn: 'root'
})
export class GenerateTextService {

    private url = 'http://localhost:5000/generate-text';

    constructor(private http: HttpClient) {
    }

    public generate(message: string): Observable<ResponseText> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const body = {prompt: message}; // Créez un objet avec la propriété "prompt" contenant le message

        return this.http.post<ResponseText>(this.url, body, { headers }); // Envoyez le corps de requête correctement formaté

        // return this.http.post<string>(this.url, body, {headers})
        //     .pipe(
        //         map(str => {
        //             let startIndex = str.indexOf('<html>');
        //             let endIndex = str.indexOf('</html>') + 7; // inclure '</html>'
        //             return {
        //                 htmlCode: str.slice(startIndex, endIndex)
        //             }
        //         }));
    }
}
