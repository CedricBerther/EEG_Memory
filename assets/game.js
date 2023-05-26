const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = clonedArray[index]

        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}
const generateGame = () => {
  
    const dimensions_length = selectors.board.getAttribute('data-dimension_length')
    const dimensions_width = selectors.board.getAttribute('data-dimension_width')
    if (dimensions_length * dimensions_width % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }



    const word1 = ['ERP: Definition', 
                   'ERP: Charakteristika', 
                   'ERP Beispiel: Strand-Analogie', 
                   'ERP Beispiel: Gesichtswahrnehmung', 
                   'Von kontinuierlichen EEG zum ERP in drei wichtigen Schritten', 
                   'Segmentierung', 
                   'Mittelung', 
                   'Filterung', 
                   'Stimulus-locked potentials', 
                   'Response-locked potentials',
                   'Frühe ERPs',
                   'BSP',
                   'VEP',
                   'AEP',
                   'SSEP',
                   'MMN',
                   'Späte ERPs',
                   'P300',
                   'N400',
                   'CNV',
                   'RP / BP',
                   'ERN']
    const word2 = ['= event-related potentials. ERPs sind Spannungsveränderungen im elektrischen Feld, die in einem fixierten zeitlichen Zusammenhang zu einem Ereignis stehen.', 
                   'ERPs haben eine hohe zeitliche Auflösung. ERPs spiegeln die Verarbeitung des Ereignisses.', 
                   'Dinge, die immer gleich sind, sind klar und bei ERPs von Interesse. Dinge, die sich bewegen, sind unklar und werden herausgemittelt.', 
                   'Bsp. wird immer die Sekunde ausgeschnitten resp. herausgefiltert, wo jemand blinzelt. Der Rest, welcher «normal» verläuft, wird hervorgehoben resp. beibehalten.', 
                   'ERPs werden aus dem EEG-Signal extrahiert, indem segmentiert, gemittelt und gefiltert wird.', 
                   'Ein EEG-Spur wird in verschiedene Zeitabschnitte geteilt.', 
                   'Aktivität, die nicht in festem zeitlichem Bezug (not time-locked) zum Ereignis ist, wird herausgemittelt. Aktivität, die in festem zeitlichem Bezug (time-locked) zum Ereignis steht, kommt zum Vorschein. Wichtige Veränderung des Signal-zu-Rausch-Verhältnisses.', 
                   'Üblicherweise werden Frequenzen am unteren Ende des Spektrums herausgefiltert (Low-Cut / High-Pass Filter) und am oberen Ende (High-cut / Low-Pass Filter). Dies dient vor allem der Entfernung von Artefakten.', 
                   'Unterteilung in frühe und späte ERPs. Frühe ERPs: BSP, VEP-AEP-SSEP, MMN. Späte ERPs: P300, N400, CNV', 
                   'Unterteilung in Hervortreten vor oder nach einem Ereignis. Vorher: Readiness potential (Bereitschaftspotential). Nachher: Error Related Negativity.',
                   'Exogen, Geschieht ca. 2-120 ms nach dem Stimulus, Quellen sind modalitätsspezifisch',
                   '= brainstem potentials. Werden anhand von Klicks getestet und dienen dazu, die Integrität der Nervenbahnen im Rückenmark und Hirnstamm zu überprüfen.',
                   '= visuell evozierte Potentiale. Werden zur Untersuchung der Sehbahn genutzt.', 
                   '= auditorisch evozierte Potentiale. Werde zur Untersuchung von akustischen Bahnen genutzt und anhand von Klicks ausgelöst.', 
                   '= somatosensorisch evozierte Potentiale. Sie werden zur Untersuchung der Leitfähigkeit der sensorischen Bahnen genutzt.', 
                   '= mismatch negativity. Tritt 10-350 ms nach der Präsentation eines abweichenden Stimulus in einer Reihe gleichförmiger Reize auf. Beispiel: Tonabfolge.', 
                   'endogen, Geschieht ca. 200-600 ms nach dem Stimulus, Quellen sind aufgabenspezifisch', 
                   'Tritt 300 ms nach dem Stimulus auf, Wird anhand des Oddball-Paradigma oder CPT ausgelöst, Wird in einer Serie von gleichbleibenden Reizen evoziert, wo ein abweichender und unerwarteter Reiz in zufälliger Folge dargeboten werden.', 
                   'Tritt 400 ms nach dem Stimulus auf, Sprachrelevante Komponente, Wird dann evoziert, wenn ein Satz auf unerwartete Art beendet wird.', 
                   '= contingent negative variation. Wird in einem Zwei-Stimulus-Paradigma evoziert: Warnstimulus und Imperativstimulus.', 
                   '= readiness potential, = Bereitschaftspotential. Geschieht einige hundert Millisekunden vor der eigentlichen Bewegung. Es ist ein Mass der Aktivität des motorischen Kortex zur Vorbereitung willkürlicher Muskelbewegungen.',
                   '= error related negativity. Geschieht 40-120 ms nachdem bspw. ein Fehler in einer speeded response time task gemacht wurde. '
                ]
                   
    const word3 = [ '<a class="image" href="./assets/images/image1.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image1.png"></a>', 
                    '<a class="image" href="./assets/images/image2.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image2.png"></a>', 
                    '<a class="image" href="./assets/images/image3.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image3.png"></a>', 
                    '<a class="image" href="./assets/images/image4.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image4.png"></a>', 
                    '<a class="image" href="./assets/images/image5.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image5.png"></a>', 
                    '<a class="image" href="./assets/images/image6.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image6.png"></a>', 
                    '<a class="image" href="./assets/images/image7.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image7.png"></a>', 
                    '<a class="image" href="./assets/images/image8.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image8.png"></a>', 
                    '<a class="image" href="./assets/images/image9.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image9.png"></a>', 
                    '<a class="image" href="./assets/images/image10.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image10.png"></a>', 
                    '<a class="image" href="./assets/images/image11.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image11.png"></a>', 
                    '<a class="image" href="./assets/images/image12.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image12.png"></a>',
                    '<a class="image" href="./assets/images/image13.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image13.png"></a>', 
                    '<a class="image" href="./assets/images/image14.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image14.png"></a>', 
                    '<a class="image" href="./assets/images/image15.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image15.png"></a>', 
                    '<a class="image" href="./assets/images/image16.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image16.png"></a>', 
                    '<a class="image" href="./assets/images/image17.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image17.png"></a>', 
                    '<a class="image" href="./assets/images/image18.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image18.png"></a>', 
                    '<a class="image" href="./assets/images/image19.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image19.png"></a>', 
                    '<a class="image" href="./assets/images/image20.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image20.png"></a>', 
                    '<a class="image" href="./assets/images/image21.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image21.png"></a>', 
                    '<a class="image" href="./assets/images/image22.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image22.png"></a>'
                ];
    const pairs = [];

    for (let i = 0; i < word1.length; i++) {
        const pair = {
        id: i,
        value1: word1[i],
        value2: word2[i],
        value3: word3[i]    
        };
        pairs.push(pair);
    }

    const pickedIds = pickRandom(word1, (dimensions_length * dimensions_width) / 2).map((value) => word1.indexOf(value));
    const filteredPairs = pairs.filter((pair) => pickedIds.includes(pair.id));
    const pickedValues = [...filteredPairs.map((pair) => pair.value1), ...filteredPairs.map((pair) => pair.value2)
                         ,...filteredPairs.map((pair) => pair.value3)];
    const items = shuffle([...pickedValues])
    const cards = `
    <div class="board" style="grid-template-columns: repeat(${dimensions_width}, auto)">
        ${items.map(item => {
            const matchingPair = filteredPairs.find(pair => pair.value1 === item || pair.value2 === item|| pair.value3 === item);
            const id = matchingPair ? matchingPair.id : '';
            return `
                <div class="card" id="${id}">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `;
        }).join('')}
    </div>
`;

    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))

    
}



const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} moves`
        selectors.timer.innerText = `time: ${state.totalTime} sec`
    }, 1000)
}

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const flipCard = card => {
    
    if (card.textContent === '\n                    \n                    \n                ') {
        // Lightbox-Code hinzufügen, um das Bild in der Lightbox anzuzeigen
        id = card.getAttribute("id")
        let idNumber = parseInt(id); // convert string to number
        idNumber++; // increment the number
        id = idNumber.toString(); // convert back to string
        var lightboxHTML = '<a href="./assets/images/image' + id + '.png" data-lightbox="mygallery"><img src="./assets/images/image' + id + '.png"></a>';
        document.querySelector('.popup-gallery .popup-image').innerHTML = lightboxHTML;
        // Lightbox öffnen
        $('.popup-gallery a').first().click();
    }

    state.flippedCards++
    state.totalFlips++
    const text = card.innerText;
    const popupGallery = document.querySelector('.popup-gallery');
    const popupText = popupGallery.querySelector('.popup-text');
    if (popupText) {
        popupText.remove();
    }

    const newPopupText = document.createElement('div');
    newPopupText.textContent = text;
    newPopupText.classList.add('popup-text');
    popupGallery.appendChild(newPopupText);
    popupGallery.style.display = 'flex';

    // add an event listener to hide the popup gallery when clicked
    popupGallery.addEventListener('click', event => {
    popupGallery.style.display = 'none';
    });



    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 3) {
        card.classList.add('flipped')

    }
        
    if (state.flippedCards === 3) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')
        const [card1, card2, card3] = flippedCards
        const id1 = card1.getAttribute("id")
        const id2 = card2.getAttribute("id")
        const id3 = card3.getAttribute("id")
    
        if (id1 === id2 && id2 === id3) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
            flippedCards[2].classList.add('matched')
        }
    
        setTimeout(() => {
            flipBackCards()
        }, 1000)

        // If there are no more cards that we can flip, we won the game
if (!document.querySelectorAll('.card:not(.flipped)').length) {
    setTimeout(() => {
      popupGallery.style.display = 'none';
      selectors.boardContainer.classList.add('flipped')
      selectors.win.innerHTML = `
        <span class="win-text">
          You won!<br />
          with <span class="highlight">${state.totalFlips}</span> moves<br />
          under <span class="highlight">${state.totalTime}</span> seconds
        </span>
      `
      clearInterval(state.loop)
    }, 1000)
  }
    }
    
}


const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame()
        }
    })
}

generateGame()
attachEventListeners()