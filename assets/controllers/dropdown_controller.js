import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['button', 'options', 'selected', 'input','image'];

    connect() {
        console.log('Dropdown controller connected');
    }

    toggle() {
        this.optionsTarget.classList.toggle('hidden');
    }

    select(event) {
        const selectedValue = event.currentTarget.dataset.value;
        const selectedText = event.currentTarget.textContent.trim();
        const selectedImage = event.currentTarget.dataset.image;
        console.log(selectedImage);
        console.log(selectedValue);

        // Update the button text
        this.selectedTarget.textContent = selectedText;

        if (this.hasImageTarget && selectedImage) {
            this.imageTarget.src = selectedImage;
        }

        // Hide the options
        this.optionsTarget.classList.add('hidden');
    }
}