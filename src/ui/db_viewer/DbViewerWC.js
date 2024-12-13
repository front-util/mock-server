const NodeIds = {
    DB_ROOT : 'db-root',
    SAVE_BTN: 'db-save',
};
const Apis = {
    LOAD: '/db/get',
    SAVE: '/db/replace',
};

const htmlTemplate = `
    <div class='flex-row'>
        <button 
            class='button'
            type="button" 
            id="${NodeIds.SAVE_BTN}" 
        >
            Save changes
        </button>
    </div>
    <div 
        id="${NodeIds.DB_ROOT}" 
    ></div>
`;

class DbEditor extends HTMLElement {

    editor = null;
    rendered = false;
    timeout = null;

    static get observedAttributes() {
        return [];
    }
      
    async loadDatabase() {
        try {
            const response = await fetch(window.location.origin + Apis.LOAD);
            const initialJSON = await response.json();

            if(initialJSON) {
                this.editor?.set(initialJSON);
            }
        } catch(err) {
            console.error(err);
            return '';
        }
    }

    async saveDatabase() {
        try {
            await fetch(window.location.origin + Apis.SAVE, {
                body  : JSON.stringify(this.editor.get()),
                method: 'PUT',
            });
        } catch(err) {
            console.error(err);
        }
    }

    initializeCallbacks() {
        document.getElementById(NodeIds.SAVE_BTN).onclick = this.saveDatabase.bind(this);
    }

    async initialize () {
        this.render();
        this.rendered = true;
        this.editor = new JSONEditor(document.getElementById(NodeIds.DB_ROOT));
        this.loadDatabase();
        this.initializeCallbacks();
    }

    render() {
        this.innerHTML = htmlTemplate;
    }

    connectedCallback() {
        if(this.rendered) {
            return;
        }
        this.initialize();
    }

    disconnectedCallback() {
        this.rendered = false;
    }

}

customElements.define('db-editor', DbEditor);
