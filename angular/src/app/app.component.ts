import {Component, OnInit} from '@angular/core';
import StackBlitzSDK, {Project} from '@stackblitz/sdk';
import {GenerateTextService} from "./generate-text.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'hackathon-front';

    demandeTitle: string = 'Titre de la demande';

    public content: string = '';
    private cssPrefix = '<head>\n\n<style>\n';
    private cssSuffix = '\n</style>\n\n';

    // ------------------------- HTML ----------------------------------------

    private cssFile = 'p\x20{\n\tcolor: #0000FF;\n\tbackground-color: #FFFF00;\n}'
    private htmlFile = '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>Responsive Design\n\t\t</title>\n\t</head>\n</html>\n<body>\n\t<p>Init test\n\t</p>\n</body>';

    // -------------------------- Projet Stackblitz ----------------------------------

    private project: Project = {
        title: 'Dynamically Generated Project',
        description: 'Simple example using the EngineBlock "javascript" template.',
        template: 'html',
        files: {
            'index.html': this.htmlFile,
            'style.css': this.cssFile
        },
    }

    // --------------------------Constructeur ---------------------------------

    constructor(
        private generateTextService: GenerateTextService
    ) {
    }

    // ----------------------- OnInit ------------------------------------------

    ngOnInit() {
        this.htmlFile = this.htmlFile.replace('<head>', this.cssPrefix + this.cssFile + this.cssSuffix);
        this.project = {
            ...this.project, ...{
                files: {
                    'index.html': this.htmlFile,
                    'style.css': this.cssFile
                },
            }
        }
        StackBlitzSDK.embedProject('stackblitz', this.project, {
            openFile: 'style.css,index.html',
            terminalHeight: 10,
        });
    }

    // ---------------------- Méthodes publiques ------------------------------

    public startStackblitz() {
        debugger;
        this.generateTextService.generate(this.content).subscribe(result => {
            this.demandeTitle = result.generated_text.title ? result.generated_text.title : '';
            let css = result.generated_text.cssCode ? result.generated_text.cssCode : '';
            let html = result.generated_text.htmlCode ? result.generated_text.htmlCode.replace('<head>', this.cssPrefix + css + this.cssSuffix) : '';
            this.project = {
                ...this.project, ...{
                    files: {
                        'index.html': html,
                        'style.css': css,
                    },
                }
            }
            StackBlitzSDK.embedProject('stackblitz', this.project, {
                height: 400,
                openFile: 'style.css,index.html',
                terminalHeight: 10,
            });
        });
    }

}
