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

        // return this.http.post<ResponseText>(this.url, body, { headers }); // Envoyez le corps de requête correctement formaté

        return this.http.post<any>(this.url, body, {headers})
            .pipe(
                map(str => {
                    let generatedText = str.generated_text.toString();
                    let htmlStartIndex = generatedText.indexOf('<!DOCTYPE html>');
                    let htmlEndIndex = generatedText.indexOf('</html>') + 7; // inclure '</html>'
                    /*let cssStartIndex = generatedText.indexOf('cssCode') + 11;
                    let cssEndIndex = generatedText.indexOf('\"title\"') - 3;*/
                    let titleStartIndex = generatedText.indexOf('\"title\"') + 10;
                    let titleEndIndex = generatedText.indexOf('\"}]');
                    return {
                        generated_text: {
                            title: generatedText.slice(titleStartIndex, titleEndIndex),
                            htmlCode: generatedText.slice(htmlStartIndex, htmlEndIndex)
                            //cssCode: generatedText.slice(cssStartIndex, cssEndIndex)
                        }
                    }
                }));
    }
}
