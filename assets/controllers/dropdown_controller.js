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
        
        switch (selectedValue){
            case "1":
                this.setAllRunesByTree("precision");
                break;
            case "2":
                this.setAllRunesByTree("domination");
                break;
            case "3":
                this.setAllRunesByTree("sorcery");
                break;
            case "4":
                this.setAllRunesByTree("resolve");
                break;
            case "5":
                this.setAllRunesByTree("inspiration");
                break;
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
                'grasp of the undying': this.image_t1_1Target,
                'aftershock': this.image_t1_2Target,
                'guardian': this.image_t1_3Target,
                'demolish': this.image_t2_1Target,
                'font of life': this.image_t2_2Target,
                'shield bash': this.image_t2_3Target,
                'conditioning': this.image_t3_1Target,
                'second wind': this.image_t3_2Target,
                'bone plating': this.image_t3_3Target,
                'overgrowth': this.image_t4_1Target,
                'revitalize': this.image_t4_2Target,
                'unflinching': this.image_t4_3Target
            },
            'inspiration': {
                'glacial augment': this.image_t1_1Target,
                'unsealed spellbook': this.image_t1_2Target,
                'first strike': this.image_t1_3Target,
                'hextech flashtraption': this.image_t2_1Target,
                'magical footwear': this.image_t2_2Target,
                'cash back': this.image_t2_3Target,
                'triple tonic': this.image_t3_1Target,
                'time warp tonic': this.image_t3_2Target,
                'biscuit delivery': this.image_t3_3Target,
                'cosmic insight': this.image_t4_1Target,
                'approach velocity': this.image_t4_2Target,
                'jack of all trades': this.image_t4_3Target
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
        console.log('Selected tree:', this.selectedTarget.textContent);
        const data = new FormData();
        data.append('role', this.inputRoleTarget.value);
        data.append('champion', this.inputChampionTarget.value);
        data.append('targetChampion', this.inputTargetChampionTarget.value);
        data.append('notes', this.inputNotesTarget.value);
        
        const buttons = this.getAllButtonsStates();
        
        const runeMap = {
            'precision': {
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
            },
            'domination': {
                '1': 'electrocute',
                '2': 'dark harvest',
                '3': 'hail of blades',
                '4': '',
                '5': 'cheap shot',
                '6': 'taste of blood',
                '7': 'sudden impact',
                '8': 'deep ward',
                '9': 'grisly mementos',
                '10': 'sixth sense',
                '11': 'treasure hunter',
                '12': 'relentless hunter',
                '13': 'ultimate hunter'
            },
            'sorcery': {
                '1': 'summon aery',
                '2': 'arcane comet',
                '3': 'phase rush',
                '4': '',
                '5': 'axiom arcanist',
                '6': 'manaflow band',
                '7': 'nimbus cloak',
                '8': 'transcendence',
                '9': 'celerity',
                '10': 'absolute focus',
                '11': 'scorch',
                '12': 'waterwalking',
                '13': 'gathering storm'
            },
            'resolve': {
                '1': 'grasp of the undying',
                '2': 'aftershock',
                '3': 'guardian',
                '4': '',
                '5': 'demolish',
                '6': 'font of life',
                '7': 'shield bash',
                '8': 'conditioning',
                '9': 'second wind',
                '10': 'bone plating',
                '11': 'overgrowth',
                '12': 'revitalize',
                '13': 'unflinching'
            },
            'inspiration': {
                '1': 'glacial augment',
                '2': 'unsealed spellbook',
                '3': 'first strike',
                '4': '',
                '5': 'hextech flashtraption',
                '6': 'magical footwear',
                '7': 'cash back',
                '8': 'triple tonic',
                '9': 'time warp tonic',
                '10': 'biscuit delivery',
                '11': 'cosmic insight',
                '12': 'approach velocity',
                '13': 'jack of all trades'
            },
        };
        const treeMap = runeMap[this.selectedTarget.textContent.toLowerCase()];

        
        if (!treeMap) {
            console.warn(`No mapping found for tree: ${this.selectedTarget.textContent}`);
            return;
        }


        const gatheredRunes = buttons
        .filter(button => button.state === "true") // Assuming state is boolean
        .map(button => treeMap[button.value])
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
            if (result.status === "success" && result.redirect_url) {
                console.log("REDIRECTED!!!");
                window.location.href = result.redirect_url; 
  
            }
            console.log('Success:', result);
        })
        .catch(error => console.error('Error:', error));
    }

    button(event){
        console.log(event.currentTarget);
        const clickedButton = event.currentTarget;
        const value = clickedButton.dataset.value;

        // Zastosuj efekt grayscale w zależności od stanu
        
        console.log(value);
        switch (value){
            case "1":
                if (clickedButton.dataset.state === 'false'){
                    this.setButtonStates([
                        { value: '1', state: "true" },
                        { value: '2', state: "false" },
                        { value: '3', state: "false" },
                        { value: '4', state: "false" },
                    ]);
                }else{
                    this.setButtonStates([
                        { value: '1', state: "false" },
                        { value: '2', state: "false" },
                        { value: '3', state: "false" },
                        { value: '4', state: "false" },
                    ]);
                }
                break;

            case "2":
                if (clickedButton.dataset.state === 'false'){
                    this.setButtonStates([
                        { value: '1', state: "false" },
                        { value: '2', state: "true" },
                        { value: '3', state: "false" },
                        { value: '4', state: "false" },
                    ]);
                }else{
                    this.setButtonStates([
                        { value: '1', state: "false" },
                        { value: '2', state: "false" },
                        { value: '3', state: "false" },
                        { value: '4', state: "false" },
                    ]);
                }
                break;
            case "3":
                if (clickedButton.dataset.state === 'false'){
                    this.setButtonStates([
                        { value: '1', state: "false" },
                        { value: '2', state: "false" },
                        { value: '3', state: "true" },
                        { value: '4', state: "false" },
                    ]);
                }else{
                    this.setButtonStates([
                        { value: '1', state: "false" },
                        { value: '2', state: "false" },
                        { value: '3', state: "false" },
                        { value: '4', state: "false" },
                    ]);
                }
                break;
            case "4":
                if (clickedButton.dataset.state === 'false'){
                    this.setButtonStates([
                        { value: '1', state: "false" },
                        { value: '2', state: "false" },
                        { value: '3', state: "false" },
                        { value: '4', state: "true" },
                    ]);
                }else{
                    this.setButtonStates([
                        { value: '1', state: "false" },
                        { value: '2', state: "false" },
                        { value: '3', state: "false" },
                        { value: '4', state: "false" },
                    ]);
                }
                break;
            case "5":
                if (clickedButton.dataset.state === 'false'){
                    this.setButtonStates([
                        { value: '5', state: "true" },
                        { value: '6', state: "false" },
                        { value: '7', state: "false" },
                    ]);
                }else{
                    this.setButtonStates([
                        { value: '5', state: "false" },
                        { value: '6', state: "false" },
                        { value: '7', state: "false" },
                    ]);
                }
                break;
                case "6":
                    if (clickedButton.dataset.state === 'false'){
                        this.setButtonStates([
                            { value: '5', state: "false" },
                            { value: '6', state: "true" },
                            { value: '7', state: "false" },
                        ]);
                    }else{
                        this.setButtonStates([
                            { value: '5', state: "false" },
                            { value: '6', state: "false" },
                            { value: '7', state: "false" },
                        ]);
                    }
                    break;
                case "7":
                    if (clickedButton.dataset.state === 'false'){
                        this.setButtonStates([
                            { value: '5', state: "false" },
                            { value: '6', state: "false" },
                            { value: '7', state: "true" },
                        ]);
                    }else{
                        this.setButtonStates([
                            { value: '5', state: "false" },
                            { value: '6', state: "false" },
                            { value: '7', state: "false" },
                        ]);
                    }
                    break;
                case "8":
                    if (clickedButton.dataset.state === 'false'){
                        this.setButtonStates([
                            { value: '8', state: "true" },
                            { value: '9', state: "false" },
                            { value: '10', state: "false" },
                        ]);
                    }else{
                        this.setButtonStates([
                            { value: '8', state: "false" },
                            { value: '9', state: "false" },
                            { value: '10', state: "false" },
                        ]);
                    }
                    break;
                case "9":
                    if (clickedButton.dataset.state === 'false'){
                        this.setButtonStates([
                            { value: '8', state: "false" },
                            { value: '9', state: "true" },
                            { value: '10', state: "false" },
                        ]);
                    }else{
                        this.setButtonStates([
                            { value: '8', state: "false" },
                            { value: '9', state: "false" },
                            { value: '10', state: "false" },
                        ]);
                    }
                    break;
                case "10":
                    if (clickedButton.dataset.state === 'false'){
                        this.setButtonStates([
                            { value: '8', state: "false" },
                            { value: '9', state: "false" },
                            { value: '10', state: "true" },
                        ]);
                    }else{
                        this.setButtonStates([
                            { value: '8', state: "false" },
                            { value: '9', state: "false" },
                            { value: '10', state: "false" },
                        ]);
                    }
                    break;
                case "11":
                    if (clickedButton.dataset.state === 'false'){
                        this.setButtonStates([
                            { value: '11', state: "true" },
                            { value: '12', state: "false" },
                            { value: '13', state: "false" },
                        ]);
                    }else{
                        this.setButtonStates([
                            { value: '11', state: "false" },
                            { value: '12', state: "false" },
                            { value: '13', state: "false" },
                        ]);
                    }
                    break;
                case "12":
                    if (clickedButton.dataset.state === 'false'){
                        this.setButtonStates([
                            { value: '11', state: "false" },
                            { value: '12', state: "true" },
                            { value: '13', state: "false" },
                        ]);
                    }else{
                        this.setButtonStates([
                            { value: '11', state: "false" },
                            { value: '12', state: "false" },
                            { value: '13', state: "false" },
                        ]);
                    }
                    break;
                case "13":
                    if (clickedButton.dataset.state === 'false'){
                        this.setButtonStates([
                            { value: '11', state: "false" },
                            { value: '12', state: "false" },
                            { value: '13', state: "true" },
                        ]);
                    }else{
                        this.setButtonStates([
                            { value: '11', state: "false" },
                            { value: '12', state: "false" },
                            { value: '13', state: "false" },
                        ]);
                    }
                    break;

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
    
    setButtonStates(states) {
        // Pobierz wszystkie przyciski z atrybutem name="gridButton"
        const allButtons = this.element.querySelectorAll('button[name="gridButton"]');
    
        // Przetwórz każdy przycisk
        allButtons.forEach(button => {
            const buttonValue = button.dataset.value;
    
            // Znajdź odpowiadający stan w tablicy states
            const state = states.find(s => s.value === buttonValue); // Szukaj po polu value
            console.log(state);
    
            if (state !== undefined) {
                // Ustaw stan przycisku (true/false)
                const newState = state.state;
                button.dataset.state = newState;
    
                // Zaktualizuj efekt grayscale dla obrazka w przycisku
                const image = button.querySelector('img');
                if (image) {
                    if (newState === false || newState === 'false') {
                        image.classList.add('grayscale');
                    } else {
                        image.classList.remove('grayscale');
                    }
                }
            }
        });
    
        console.log('Button states updated:', this.getAllButtonsStates());
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