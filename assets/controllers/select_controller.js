import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['parent', 'child','child2'];

    connect() {
        this.updateChildOptions(); // Inicjalna aktualizacja przy załadowaniu 
        console.log("champion selector loaded");
    }

    async updateChildOptions() {
        const parentValue = this.parentTarget.value;
        const childSelect = this.childTarget;
        const childSelect2 = this.child2Target;
       
        console.log(this.parentTarget.value)
        // Wyczyść obecne opcje
        childSelect.innerHTML = '<option value="">Wybierz Champion</option>';
        childSelect2.innerHTML = '<option value="">Wybierz Champion</option>';

        if (!parentValue) return;
        
        try {
           
            const response = await fetch(`/api/champions/${parentValue.toLowerCase()}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Błąd pobierania danych');
            }
            
            const options = await response.json();
            console.log(options);
            options.forEach(option => {
                console.log(option);
                const opt = document.createElement('option');
                opt.value = option;
                opt.text = option;
                childSelect.appendChild(opt.cloneNode(true));
                childSelect2.appendChild(opt.cloneNode(true));
            });

            
        } catch (error) {
            console.error('Fetch error:', error);
            childSelect.innerHTML = '<option value="">Błąd</option>';
            childSelect2.innerHTML = '<option value="">Błąd</option>';
        } 
    }

    // Wywołaj aktualizację przy zmianie rodzica
    parentChanged() {
        this.updateChildOptions();
        console.log("parent changed");
    }
}