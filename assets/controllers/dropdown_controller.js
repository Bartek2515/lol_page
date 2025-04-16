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
        'image_t1_4',
        'image_t2_1',
        'image_t2_2',
        'image_t2_3',
        'image_t3_1',
        'image_t3_2',
        'image_t3_3',
        'image_t4_1',
        'image_t4_2',
        'image_t4_3',
        'inputRole',
        'inputChampion',
        'inputTargetChampion',
        'inputNotes'
    ];

    connect() {
        console.log('Dropdown controller connected');
        this.setAllRunesByTree("precision");
    }

    toggle() {
        this.optionsTarget.classList.toggle('hidden');
    }

    select(event) {
        const selectedValue = event.currentTarget.dataset.value;
        const selectedText = event.currentTarget.textContent.trim();
        const selectedImage = event.currentTarget.dataset.image;
       
        // Update the button text
        this.selectedTarget.textContent = selectedText;
        //update image
        if (this.hasImageTarget && selectedImage) {
            this.imageTarget.src = selectedImage;
        }

        if(selectedValue == 1){
           this.setAllRunesByTree("precision");
        }else if (selectedValue == 2){
            this.setAllRunesByTree("domination");
        }else if (selectedValue == 3){
            this.setAllRunesByTree("sorcery");
        }else if (selectedValue == 4){
            this.setAllRunesByTree("resolve");
        }else if (selectedValue == 5){
            this.setAllRunesByTree("inspiration");
        }
        // Hide the options
        this.optionsTarget.classList.add('hidden');
    }

    async setAllRunesByTree(tree){
        const runeToImageMap = {
            'precision': {
                'press the attack': this.image_t1_1Target,
                'lethal tempo': this.image_t1_2Target,
                'fleet footwork': this.image_t1_3Target,
                'conqueror': this.image_t1_4Target,
                'absorb life': this.image_t2_1Target,
                'triumph': this.image_t2_2Target,
                'presence of mind': this.image_t2_3Target,
                'alacrity': this.image_t3_1Target,
                'haste': this.image_t3_2Target,
                'bloodline': this.image_t3_3Target,
                'coup de grace': this.image_t4_1Target,
                'cut down': this.image_t4_2Target,
                'last stand': this.image_t4_3Target
            },
            'domination': {
                'electrocute': this.image_t1_1Target,
                'dark harvest': this.image_t1_2Target,
                'hail of blades': this.image_t1_3Target,
                'cheap shot': this.image_t2_1Target,
                'taste of blood': this.image_t2_2Target,
                'sudden impact': this.image_t2_3Target,
                'deep ward': this.image_t3_1Target,
                'grisly mementos': this.image_t3_2Target,
                'sixth sense': this.image_t3_3Target,
                'treasure hunter': this.image_t4_1Target,
                'relentless hunter': this.image_t4_2Target,
                'ultimate hunter': this.image_t4_3Target
            },
            'sorcery': {
                'summon aery': this.image_t1_1Target,
                'arcane comet': this.image_t1_2Target,
                'phase rush': this.image_t1_3Target,
                'axiom arcanist': this.image_t2_1Target,
                'manaflow band': this.image_t2_2Target,
                'nimbus cloak': this.image_t2_3Target,
                'transcendence': this.image_t3_1Target,
                'celerity': this.image_t3_2Target,
                'absolute focus': this.image_t3_3Target,
                'scorch': this.image_t4_1Target,
                'waterwalking': this.image_t4_2Target,
                'gathering storm': this.image_t4_3Target
            },
            'resolve': {
                'press the attack': this.image_t1_1Target,
                'lethal tempo': this.image_t1_2Target,
                'fleet footwork': this.image_t1_3Target,
                'absorb life': this.image_t2_1Target,
                'triumph': this.image_t2_2Target,
                'presence of mind': this.image_t2_3Target,
                'alacrity': this.image_t3_1Target,
                'haste': this.image_t3_2Target,
                'bloodline': this.image_t3_3Target,
                'coup de grace': this.image_t4_1Target,
                'cut down': this.image_t4_2Target,
                'last stand': this.image_t4_3Target
            },
            'inspiration': {
                'press the attack': this.image_t1_1Target,
                'lethal tempo': this.image_t1_2Target,
                'fleet footwork': this.image_t1_3Target,
                'absorb life': this.image_t2_1Target,
                'triumph': this.image_t2_2Target,
                'presence of mind': this.image_t2_3Target,
                'alacrity': this.image_t3_1Target,
                'haste': this.image_t3_2Target,
                'bloodline': this.image_t3_3Target,
                'coup de grace': this.image_t4_1Target,
                'cut down': this.image_t4_2Target,
                'last stand': this.image_t4_3Target
            }
        };

        try {
            const runes = await this.getRunesByTree(tree);
            const treeMap = runeToImageMap[tree];

            if (!treeMap) {
                console.warn(`No mapping found for tree: ${tree}`);
                return;
            }

            runes.forEach(rune => {
                const imageTarget = treeMap[rune.name];
                console.log(rune.name)
                console.log(rune.img);
                if (imageTarget && rune.img) {
                    imageTarget.src = rune.img;
                } else {
                    console.warn(`Missing mapping or image for rune: ${rune.name}`);
                }
            });
        } catch (error) {
            console.error(`Error setting runes for tree ${tree}:`, error);
        }
    }
    send(event) {
        console.log(this.selectedTarget.textContent);
        event.preventDefault();
        console.log('Sending role:', this.inputRoleTarget.value);
        
        const data = new FormData();
        data.append('role', this.inputRoleTarget.value);
        data.append('champion', this.inputChampionTarget.value);
        data.append('targetChampion', this.inputTargetChampionTarget.value);
        data.append('notes', this.inputNotesTarget.value);
        
        const buttons = this.getAllButtonsStates();
        
        const runeMap = {
            '1': 'press the attack',
            '2': 'lethal tempo',
            '3': 'fleet footwork',
            '4': 'conqueror',
            '5': 'absorb life',
            '6': 'triumph',
            '7': 'presence of mind',
            '8': 'alacrity',
            '9': 'haste',
            '10': 'bloodline',
            '11': 'coup de grace',
            '12': 'cut down',
            '13': 'last stand'
        };

        const gatheredRunes = buttons
        .filter(button => button.state === "true") // Assuming state is boolean
        .map(button => runeMap[button.value])
        .filter(rune => rune !== undefined);

        // Wysyłanie runów jako tablicy
        gatheredRunes.forEach(rune => data.append('runes[]', rune));
        console.log(data);
        fetch('/api/add', {
            method: 'POST',
            body: data,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => console.error('Error:', error));
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
            state: button.dataset.state,
            value: button.dataset.value
        }));

        console.log('Stan wszystkich przycisków:', buttonStates);
        return buttonStates
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