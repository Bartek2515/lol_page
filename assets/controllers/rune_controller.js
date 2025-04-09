import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['tree', 'rune1','rune2','rune3','rune4'];

    connect() {
        this.updateChildOptions(); // Inicjalna aktualizacja przy załadowaniu 
        console.log("rune selector loaded");
    }

    async updateChildOptions() {
        const treeValue = this.treeTarget.value;
        const rune1Select = this.rune1Target;
        const rune2Select = this.rune2Target;
        const rune3Select = this.rune3Target;
        const rune4Select = this.rune4Target;
        
       
        console.log(this.treeTarget.value);
        rune1Select.innerHTML = '<option value="">Wybierz rune</option>';
        rune2Select.innerHTML = '<option value="">Wybierz rune</option>';
        rune3Select.innerHTML = '<option value="">Wybierz rune</option>';
        rune4Select.innerHTML = '<option value="">Wybierz rune</option>';

        if (!treeValue) return;
        
        try {
           
            const response = await fetch(`/api/runes/${treeValue.toLowerCase()}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Błąd pobierania danych');
            }
            
            const options = await response.json();
            // console.log(options);

            let rune1 = [];
            let rune2 = [];
            let rune3 = [];
            let rune4 = [];

            options.forEach(option => {
                // console.log(option["tier"]);
                if (option['tier'] == 1){
                    rune1.push(option['name']);
                }
                if (option['tier'] == 2){
                    rune2.push(option['name']);
                }
                if (option['tier'] == 3){
                    rune3.push(option['name']);
                }
                if (option['tier'] == 4){
                    rune4.push(option['name']);
                }

            });
            // console.log(rune1);
            rune1.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.text = option;
                console.log(option);
                rune1Select.appendChild(opt);
            });
            rune2.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.text = option;
                rune2Select.appendChild(opt);
            });
            rune3.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.text = option;
                rune3Select.appendChild(opt);
            });
            rune4.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.text = option;
                rune4Select.appendChild(opt);
            });

            
        } catch (error) {
            console.error('Fetch error:', error);
            // childSelect.innerHTML = '<option value="">Błąd</option>';
            // secondaryChildSelect.innerHTML = '<option value="">Błąd</option>';
        } 
    }

    // Wywołaj aktualizację przy zmianie rodzica
    parentChanged() {
        this.updateChildOptions();
        console.log("parent changed");
    }
}