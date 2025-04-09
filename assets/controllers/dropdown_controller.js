import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = [
        'button', 
        'options', 
        'selected', 
        'input',
        'image',
        'image_t1_1',
        'image_t1_2',
        'image_t1_3',
        'image_t2_1',
        'image_t2_2',
        'image_t2_3',
        'image_t3_1',
        'image_t3_2',
        'image_t3_3',
        'image_t4_1',
        'image_t4_2',
        'image_t4_3',
    ];

    connect() {
        console.log('Dropdown controller connected');
    }

    toggle() {
        this.optionsTarget.classList.toggle('hidden');
    }

    async select(event) {
        const selectedValue = event.currentTarget.dataset.value;
        const selectedText = event.currentTarget.textContent.trim();
        const selectedImage = event.currentTarget.dataset.image;
       
        const image_t1_1 = this.image_t1_1Target
        const image_t1_2 = this.image_t1_2Target
        const image_t1_3 = this.image_t1_3Target

        const image_t2_1 = this.image_t2_1Target
        const image_t2_2 = this.image_t2_2Target
        const image_t2_3 = this.image_t2_3Target

        const image_t3_1 = this.image_t3_1Target
        const image_t3_2 = this.image_t3_2Target
        const image_t3_3 = this.image_t3_3Target

        const image_t4_1 = this.image_t4_1Target
        const image_t4_2 = this.image_t4_2Target
        const image_t4_3 = this.image_t4_3Target
        
        
        // Update the button text
        this.selectedTarget.textContent = selectedText;
        //update image
        if (this.hasImageTarget && selectedImage) {
            this.imageTarget.src = selectedImage;
        }

        if(selectedValue == 1){
            let runes = await this.getRunesByTree("precision");
            console.log(runes);
            runes.forEach(rune => {
                switch (rune["name"]) {
                    case "press the attack":
                        image_t1_1.src = rune["img"]
                        break;
                    case "lethal tempo":
                        image_t1_2.src = rune["img"];
                        break;
                    case "fleet footwork":
                        image_t1_3.src = rune["img"];
                        break;
                    case "overheal":
                        image_t2_1.src = rune["img"];
                        break;
                    case "triumph":
                        image_t2_2.src = rune["img"];
                        break;
                    case "presence of mind":
                        image_t2_3.src = rune["img"];
                        break;
                    case "alacrity":
                        image_t3_1.src = rune["img"];
                        break;
                    case "haste":
                        image_t3_2.src = rune["img"];
                        break;
                    case "bloodline":
                        image_t3_3.src = rune["img"];
                        break;
                    case "coup de grace":
                        image_t4_1.src = rune["img"];
                        break;
                    case "cut down":
                        image_t4_2.src = rune["img"];
                        break;
                    case "last stand":
                        image_t4_3.src = rune["img"];
                        break;
                    
                    default:
                        // Kod do wykonania, jeśli żaden przypadek nie pasuje
                }
            });
        }
        // Hide the options
        this.optionsTarget.classList.add('hidden');
    }
    button(event){
        console.log(event.currentTarget);
        const clickedButton = event.currentTarget;
        const value = clickedButton.dataset.value;
        console.log(value);
        const image = clickedButton.querySelector('img');
        const currentState = clickedButton.dataset.state === 'true';
        clickedButton.dataset.state = !currentState;

        // Zastosuj efekt grayscale w zależności od stanu
        if (image) {
            if (clickedButton.dataset.state === 'false') {
                image.classList.add('grayscale');
            } else {
                image.classList.remove('grayscale');
            }
        }
        
    }
    getAllButtonsStates(){
        const allButtons = this.element.querySelectorAll('button[name="gridButton"]');
        const buttonStates = Array.from(allButtons).map(button => ({
            state: button.dataset.state
        }));

        console.log('Stan wszystkich przycisków:', buttonStates);
        return buttonStates
    }
    async getRuneImg(rune){
        try {
           
            const response = await fetch(`/api/rune/${rune}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Błąd pobierania danych');
            }
            
            const runes = await response.json();
            console.log(runes['img']);
            return runes["img"];
            
        } catch (error) {
            console.error('Fetch error:', error);
        }try {
           
            const response = await fetch(`/api/rune/${rune}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Błąd pobierania danych');
            }
            
            const runes = await response.json();
            console.log(runes['img']);
            return runes["img"];
            
        } catch (error) {
            console.error('Fetch error:', error);
        } 
    }
    async getRunesByTree(tree){
        try {
           
            const response = await fetch(`/api/runes/${tree}`, {
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Błąd pobierania danych');
            }
            
            const runes = await response.json();
            // console.log(runes);
            return runes;
            
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}