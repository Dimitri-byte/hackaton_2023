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

    public demandeTitle: string = 'New Project';

    public content: string = '';
    private cssPrefix = '<head>\n\n\t<style>\n';
    private cssSuffix = '\n\t</style>\n\n';

    public showProgress = false;

    // ------------------------- Maps ----------------------------------------

    private htmlMap: Map<number, string> = new Map<number, string>();
    private messageMap: Map<number, string> = new Map<number, string>();
    private titleMap: Map<number, string> = new Map<number, string>();

    public tabs = [1];
    public selectedTab = 0;
    public titleToCreate = 2;

    // ------------------------- Défauts membres  ----------------------------------------

    private defautltCss = '\t\th1\x20{\n\t\t\ttext-align: center;\n\t\t\tbackground-color: #0046fe;\n\t\t\tcolor:white;\n\t\t}\n\t\tp\x20{\n\t\t\ttext-align: center;}'
    private defaultHtml = '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>Responsive Design\n\t\t</title>\n\t</head>\n</html>\n<body>\n\t<h1>GalaxIA</h1>\n\t<p>AI-powered UI/UX design: The future of user experience, personalized for every user.</p>\n</body>';
    private defaultTitle = 'New Project';
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
        this.htmlMap.set(1,  this.defaultHtml);
        this.titleMap.set(1, this.defaultTitle);
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
            this.updateMaps(this.tabs[this.selectedTab], html, this.demandeTitle, this.content);
            StackBlitzSDK.embedProject('stackblitz', this.project, {
                height: 400,
                openFile: 'style.css,index.html',
                terminalHeight: 10,
            });
            this.showProgress = false;
        });
    }

    public addTab() {
        this.tabs.push(this.titleToCreate);
        this.selectedTab = this.tabs.length - 1;
        this.updateMaps(this.titleToCreate, this.defaultHtml, this.defaultTitle, this.defaultMessage);
        this.updateStackBlitz();
        this.titleToCreate++;
        this.updateStackBlitz();
    }

    public removeTab(index: number) {
        this.selectedTab = index - 1;
        this.titleMap.delete(this.tabs[index]);
        this.htmlMap.delete(this.tabs[index]);
        this.messageMap.delete(this.tabs[index]);
        this.tabs.splice(index, 1);
    }

    public getTitle(index: number) {
        let tabTitle = this.titleMap.get(this.tabs[index]);
        return !!tabTitle ? tabTitle : this.demandeTitle;
    }

    private updateMaps(key: number, html: string, title: string, message: string) {
        this.messageMap.set(key, message);
        this.htmlMap.set(key, html);
        this.titleMap.set(key, title);
    }

    public updateStackBlitz() {
        let html = this.htmlMap.get(this.tabs[this.selectedTab]);
        let title = this.titleMap.get(this.tabs[this.selectedTab]);
        let message = this.messageMap.get(this.tabs[this.selectedTab]);
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
        this.updateMaps(this.tabs[this.selectedTab], html, title, message);
        StackBlitzSDK.embedProject('stackblitz', this.project, {
            height: 400,
            openFile: 'style.css,index.html',
            terminalHeight: 10,
        });
        this.showProgress = false;
    }

}
