// import html from './card.html';
// console.log(html)
class ProjectCard extends HTMLElement {
    static observedAttributes = ['lang','index'];
    constructor() {
        // Always call super first in constructor
        super();
    }
    
    connectedCallback() {
        fetch('./components/ProjectCard/index.html').then(res => res.text()).then(html => {
            this.originHtml=html;
            const index=this.getAttribute('index');
            const lang=this.getAttribute('lang');
            const coverImg=`./assets/p${index}.jpg`;
            const name=window.languageObj[lang][`project${index}name`];
            const introduction=window.languageObj[lang][`project${index}introduction`];
            const state={
                coverImg,name,introduction
            };
            ['coverImg','name','introduction'].forEach(attr => {
                const v = state[attr];
                if (v) {
                    const reg = new RegExp(`{{${attr}}}`, 'g')
                    html = html.replace(reg,v)
                }
            })
            this.innerHTML = html
        })
    }
    attributeChangedCallback(attr,oldValue,newValue){
        if(attr==='lang'&&this.innerHTML){
            const index=this.getAttribute('index');
            let nameDom=this.querySelector('.project-name');
            nameDom.innerHTML=window.languageObj[newValue][`project${index}name`];
            let introDom=this.querySelector('.project-intro');
            introDom.innerHTML=window.languageObj[newValue][`project${index}introduction`];
        }
    }
}

// Define the new element
customElements.define("project-card", ProjectCard);