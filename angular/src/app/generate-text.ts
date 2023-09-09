export interface ResponseText {
    generated_text: generatedResponseText;
}
export interface generatedResponseText {
    id: string;
    title: string;
    htmlCode: string;
    cssCode: string;
}