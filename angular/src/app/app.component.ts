import {AfterViewInit, Component, OnInit} from '@angular/core';
import StackBlitzSDK, {Project} from '@stackblitz/sdk';
import {GenerateTextService} from "./generate-text.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

    title = 'hackathon-front';

    public demandeTitle: string = 'New project';

    public content: string = '';
    private cssPrefix = '<head>\n\n<style>\n';
    private cssSuffix = '\n</style>\n\n';

    public showProgress = false;

    // ------------------------- Maps ----------------------------------------

    private htmlMap: Map<number, string> = new Map<number, string>();
    private messageMap: Map<number, string> = new Map<number, string>();
    private titleMap: Map<number, string> = new Map<number, string>();

    public tabs = [1];
    public selectedTab = 0;

    // ------------------------- Défauts membres  ----------------------------------------

    private defautltCss = 'p\x20{\n\tcolor: #0000FF;\n\tbackground-color: #FFFF00;\n}'
    private defaultHtml = '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>Responsive Design\n\t\t</title>\n\t</head>\n</html>\n<body>\n\t<p>Init test\n\t</p>\n</body>';
    private defaultTitle = 'New Projet';
    private defaultMessage = '';

    // -------------------------- Projet Stackblitz ----------------------------------

    private project: Project = {
        title: 'Dynamically Generated Project',
        description: 'Simple example using the EngineBlock "javascript" template.',
        template: 'html',
        files: {
            'index.html': this.defaultHtml,
            'style.css': this.defautltCss
        },
    }

    // --------------------------Constructeur ---------------------------------

    constructor(
        private generateTextService: GenerateTextService
    ) {
    }

    ngAfterViewInit(): void {
        this.defaultHtml = this.defaultHtml.replace('<head>', this.cssPrefix + this.defautltCss + this.cssSuffix);
        this.project = {
            ...this.project, ...{
                files: {
                    'index.html': this.defaultHtml,
                    'style.css': this.defautltCss
                },
            }
        }
        StackBlitzSDK.embedProject('stackblitz', this.project, {
            openFile: 'style.css,index.html',
            terminalHeight: 10,
        });
    }

    // ----------------------- OnInit ------------------------------------------

    ngOnInit() {
    }

    // ---------------------- Méthodes publiques ------------------------------

    public startStackblitz() {
        this.showProgress = true;
        this.generateTextService.generate(this.content).subscribe(result => {
            this.demandeTitle = result.generated_text.title ? result.generated_text.title : '';
            let css = result.generated_text.cssCode ? result.generated_text.cssCode : '';
            let html = result.generated_text.htmlCode ? result.generated_text.htmlCode : '';
            //let html = result.generated_text.htmlCode ? result.generated_text.htmlCode.replace('<head>', this.cssPrefix + css + this.cssSuffix) : '';
            this.project = {
                ...this.project, ...{
                    files: {
                        'index.html': html,
                        'style.css': css,
                    },
                }
            }
            this.updateMaps(html, this.demandeTitle, this.content);
            StackBlitzSDK.embedProject('stackblitz', this.project, {
                height: 400,
                openFile: 'style.css,index.html',
                terminalHeight: 10,
            });
            this.showProgress = false;
        });
    }

    public addTab() {
        this.tabs.push(this.tabs.length + 1);
        this.selectedTab = this.tabs.length - 1;
        this.updateMaps(this.defaultHtml, this.defaultTitle, this.defaultMessage);
        this.updateStackBlitz();
    }

    public getTitle(index: number) {
        let tabTitle = this.titleMap.get(index);
        return !!tabTitle ? tabTitle : this.demandeTitle;
    }

    private updateMaps(html: string, title: string, message: string) {
        this.messageMap.set(this.selectedTab, message);
        this.htmlMap.set(this.selectedTab, html);
        this.titleMap.set(this.selectedTab, title);
    }

    public updateStackBlitz() {
        let html = this.htmlMap.get(this.selectedTab);
        let title = this.titleMap.get(this.selectedTab);
        let message = this.messageMap.get(this.selectedTab);
        html = !!html ? html : '';
        title = !!title ? title : '';
        message = !!message ? message : '';
        this.content = message;
        this.demandeTitle = title;
        this.project = {
            ...this.project, ...{
                files: {
                    'index.html': html
                },
            }
        }
        this.updateMaps(html, title, message);
        StackBlitzSDK.embedProject('stackblitz', this.project, {
            height: 400,
            openFile: 'style.css,index.html',
            terminalHeight: 10,
        });
        this.showProgress = false;
    }

}
