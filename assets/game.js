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


    const word1 = ['A1', 
                   'B1', 
                   'C1', 
                   'D1', 
                   'E1', 
                   'F1', 
                   'G1', 
                   'H1', 
                   'I1', 
                   'J1']
    const word2 = ['A2 Das hier ist ein Test-Text, welcher über mehrere Zeilen gehen soll. Deswegen wird sollte diesen Beispieltext möglichst lang sein. Dadurch soll sichergestellt werden, dass er mehrere Zeilen ist. Das er hoffentlich ist.', 
                   'B2 Das hier ist ein Test-Text, welcher über mehrere Zeilen gehen soll. Deswegen wird sollte dieser Beispieltext möglichst lang sein. Dadurch soll sichergestellt werden, dass er mehrere Zeilen ist. Das er hoffentlich ist.', 
                   'C2 Das hier ist ein Test-Text, welcher über mehrere Zeilen gehen soll. Deswegen wird sollte diesen Beispieltext möglichst lang sein. Dadurch soll sichergestellt werden, dass er mehrere Zeilen ist. Das er hoffentlich ist.', 
                   'D2 Das hier ist ein Test-Text, welcher über mehrere Zeilen gehen soll. Deswegen wird sollte dieser Beispieltext möglichst lang sein. Dadurch soll sichergestellt werden, dass er mehrere Zeilen ist. Das er hoffentlich ist.', 
                   'E2 Das hier ist ein Test-Text, welcher über mehrere Zeilen gehen soll. Deswegen wird sollte dieser Beispieltext möglichst lang sein. Dadurch soll sichergestellt werden, dass er mehrere Zeilen ist. Das er hoffentlich ist.', 
                   'F2 Das hier ist ein Test-Text, welcher über mehrere Zeilen gehen soll. Deswegen wird sollte dieser Beispieltext möglichst lang sein. Dadurch soll sichergestellt werden, dass er mehrere Zeilen ist. Das er hoffentlich ist.', 
                   'G2 Das hier ist ein Test-Text, welcher über mehrere Zeilen gehen soll. Deswegen wird sollte dieser Beispieltext möglichst lang sein. Dadurch soll sichergestellt werden, dass er mehrere Zeilen ist. Das er hoffentlich ist.', 
                   'H2 Das hier ist ein Test-Text, welcher über mehrere Zeilen gehen soll. Deswegen wird sollte dieser Beispieltext möglichst lang sein. Dadurch soll sichergestellt werden, dass er mehrere Zeilen ist. Das er hoffentlich ist.', 
                   'I2 Das hier ist ein Test-Text, welcher über mehrere Zeilen gehen soll. Deswegen wird sollte dieser Beispieltext möglichst lang sein. Dadurch soll sichergestellt werden, dass er mehrere Zeilen ist. Das er hoffentlich ist.', 
                   'J2 Das hier ist ein Test-Text, welcher über mehrere Zeilen gehen soll. Deswegen wird sollte dieser Beispieltext möglichst lang sein. Dadurch soll sichergestellt werden, dass er mehrere Zeilen ist. Das er hoffentlich ist.']
                   const word3 = [
                    '<a class="image" href="./assets/images/image1.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image1.png"></a>', 
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
                    '<a class="image" href="./assets/images/image12.png" data-lightbox="mygallery"><img class="image" src="./assets/images/image12.png"></a>'
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