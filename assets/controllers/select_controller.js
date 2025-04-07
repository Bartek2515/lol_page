import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['parent', 'child','child2'];

    connect() {
        this.updateChildOptions(); // Inicjalna aktualizacja przy załadowaniu
        
    }

    updateChildOptions() {
        const parentValue = this.parentTarget.value;
        const childSelect = this.childTarget;
        const secondary_child_select = this.child2Target;
       
        console.log(this.parentTarget.value)
        // Wyczyść obecne opcje
        childSelect.innerHTML = '<option value="">Wybierz Champion</option>';
        secondary_child_select.innerHTML = '<option value="">Wybierz Champion</option>';

        
        const options = {
            'Mid': [
                { value: '1a', text: 'Podkategoria 1A' },
                { value: '1b', text: 'Podkategoria 1B' },
            ],
            'Top': [
                { value: '2a', text: 'Podkategoria 2A' },
                { value: '2b', text: 'Podkategoria 2B' },
            ],
        };

        // Dodaj nowe opcje na podstawie wyboru rodzica
        if (parentValue && options[parentValue]) {
            options[parentValue].forEach(option => {
                const opt = document.createElement('option');
                opt.value = option.value;
                opt.text = option.text;
                childSelect.appendChild(opt.cloneNode(true));
                secondary_child_select.appendChild(opt.cloneNode(true));
            });
        }
    }

    // Wywołaj aktualizację przy zmianie rodzica
    parentChanged() {
        this.updateChildOptions();
        console.log("parent changed");
    }
}