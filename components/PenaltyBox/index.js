class PenaltyBox extends HTMLElement {
    
    constructor() {
        super();
    }

    connectedCallback() {
        this.render()
    }
    async render() {
        let html;
        if (!PenaltyBox.originHTML) {
            PenaltyBox.originHTML = fetch('./components/PenaltyBox/index.html').then(res => res.text());
            html = await PenaltyBox.originHTML;
            PenaltyBox.originHTML = html;
        } else {
            html = await Promise.resolve(PenaltyBox.originHTML);
        }
        this.innerHTML = html
    }

}

// Define the new element
customElements.define("penalty-box", PenaltyBox);