import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ["input", "results"]
    
    connect() {
        console.log("wyszukiwarka")
    }

    filter() {
        const query = this.inputTarget.value.toLowerCase().trim(); // Usuwamy białe znaki z początku i końca
        const items = this.element.querySelectorAll("[data-search-value]"); // Pobieramy wszystkie elementy z atrybutem data-search-value
    
        items.forEach(item => {
          const value = item.dataset.searchValue.toLowerCase();
          console.log("Value:", value, "Includes query?", value.includes(query));
          item.style.display = value.includes(query) ? "block" : "none";
        });
    }
}
