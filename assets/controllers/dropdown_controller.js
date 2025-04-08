import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['button', 'options', 'selected', 'input'];

    connect() {
        console.log('Dropdown controller connected');
    }

    toggle() {
        this.optionsTarget.classList.toggle('hidden');
    }

    select(event) {
        const selectedValue = event.currentTarget.dataset.value;
        const selectedText = event.currentTarget.textContent.trim();

        // Update the button text
        this.selectedTarget.textContent = selectedText;

        // Update the hidden input (if used)
        if (this.hasInputTarget) {
            this.inputTarget.value = selectedValue;
        }

        // Hide the options
        this.optionsTarget.classList.add('hidden');
    }

    // Optional: Close dropdown when clicking outside
    closeOnOutsideClick(event) {
        if (!this.element.contains(event.target)) {
            this.optionsTarget.classList.add('hidden');
        }
    }
}