// export interface ResponseText {
//     id?: string;
//     title?: string;
//     htmlCode?: string;
//     cssCode?: string;
// }

export interface ResponseText {
    generated_text: GeneratedResponseText;
}
export interface GeneratedResponseText {
    id?: string;
    title?: string;
    htmlCode?: string;
    cssCode?: string;
}
