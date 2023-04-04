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
    const word1 = ['A1', 'B1', 'C1']
    const word2 = ['A2', 'B2', 'C2']
    const word3 = ['A.jpg', 'B.jpg', 'C.jpg']
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