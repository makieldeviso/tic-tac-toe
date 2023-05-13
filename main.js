const domElements = (function () {

    // Adds Event Listener Method
    const addEvent  = function (domElement, event, assignedFunc) {
        domElement.addEventListener(event, assignedFunc);
    }

    const removeEvent  = function (domElement, event, assignedFunc) {
        domElement.removeEventListener(event, assignedFunc);
    } 

    // Dom Elements List
    const getNodeList = function (nodeListName) {
        // Store Nodes lists here
        const nodeLists = {
            playCell: document.querySelectorAll('button.play-cell'),
            playerMarks: document.querySelectorAll('button.player-mark'),
            modeBtns: document.querySelectorAll('button.mode')
        }

        return nodeLists[`${nodeListName}`];
    }

    const getElement = function (elementName) {
        // Store Nodes/ Elements here
        const elements = {
            p1Mark: document.querySelector('button#p1-mark'),
            p2Mark: document.querySelector('button#p2-mark'),

            p1Input: document.querySelector('input#player1-name'),
            p2Input: document.querySelector('input#player2-name')
        }
        
        return elements[`${elementName}`];
    }

    return {addEvent, removeEvent, getNodeList, getElement}
})();

// Creates players
const playerCreate = (function () {
    
    const _players = [];

    const addPlayer = function (playerName, playerMark) {
        const newPlayer = {playerName, playerMark};
        _players.push(newPlayer);
        return newPlayer
    }

    const getPLayers = function () {
        return _players
    }

    return {addPlayer, getPLayers}

})();

// Create Game Mode (start) -
const gameDetails = (function () {
    
    let gameMode = 'versus';
    const player1 = {
        name: 'x-player',
        playerMark: 'x',
        player: 'user'
    };

    const player2 = {
        name: 'o-player',
        playerMark: 'o',
        player: 'user'
    };
 
    const setGameMode = function (modeSelected) {
        gameMode = modeSelected;
    }

    const getGameMode = function () {
        return gameMode;
    }

    const setPlayer1 = function (name, playerMark, user) {
        player1.name = name;
        player1.playerMark = playerMark;
        player1.user = user;
    }

    const setPlayer2 = function (name, playerMark, user) {
        player2.name = name;
        player2.playerMark = playerMark;
        player2.user = user;
    }

    const getPlayer1 = function () {
        return player1
    }

    const getPlayer2 = function () {
        return player2
    }

    return {
        setGameMode, 
        getGameMode,
        setPlayer1, 
        setPlayer2, 
        getPlayer1, 
        getPlayer2
    }
})();

const createGameMode = function () {
    const slider = document.querySelector('div#slider');
    const modeSection = document.querySelector('section#mode-select');
    const avatarSection = document.querySelector('section#avatar-select');
    const playSection = document.querySelector('section#play-area');

    slider.classList.add('mode-selected');

    gameDetails.setGameMode(this.value);

    console.log(gameDetails.getGameMode());

}











domElements.getNodeList('modeBtns').forEach(node => {
    domElements.addEvent(node, 'click', createGameMode);
});





// Create Game Mode (end) -



const changePlayerMark = function () {
    const currentValue = this.value;
    let altButton;
    const p1Button = domElements.getElement('p1Mark');
    const p2Button = domElements.getElement('p2Mark');

    const p1Input = domElements.getElement('p1Input');
    const p2Input = domElements.getElement('p2Input');

    let currentInput;
    let altInput;
    let currentLabel;
    let altLabel;

    if (this === p1Button) {
        altButton = p2Button;
        currentInput = p1Input;
        altInput = p2Input;
        
    } else if (this === p2Button) {
        altButton = p1Button;
        currentInput = p2Input;
        altInput = p1Input;
    }

    if (currentValue === 'x') {
        this.value = 'o';
        altButton.value = 'x';

        currentInput.setAttribute('placeholder', 'o-player');
        altInput.setAttribute('placeholder', 'x-player');

    } else if (currentValue === 'o') {
        this.value = 'x';
        altButton.value = 'o';

        currentInput.setAttribute('placeholder', 'x-player');
        altInput.setAttribute('placeholder', 'o-player');

    }


    if (this.getAttribute('data-flip') === 'flip') {
        this.setAttribute('data-flip', 'reverse');
        altButton.setAttribute('data-flip', 'flip');
    } else if (this.getAttribute('data-flip') === 'reverse') {
        this.setAttribute('data-flip', 'flip');
        altButton.setAttribute('data-flip', 'reverse');
    }
}




// Adds event listeners to player mark
domElements.getNodeList('playerMarks').forEach(node => {
    domElements.addEvent(node, 'click', changePlayerMark);
});
















// Sets player turn function
const playerTurnFlag = (function () {

    let _playerTurn = 'x';

    const changePlayerTurn = function () {
        if (_playerTurn === 'x') {
            _playerTurn = 'o';
        } else if (_playerTurn === 'o') {
            _playerTurn = 'x';
        }
    }

    const getPlayerTurn = function () {
        return _playerTurn;
    }

    return {changePlayerTurn, getPlayerTurn}
})();


const playBoard = (function () {
    
    const _playBoard = {
        row1: ["", "", ""],
        row2: ["", "", ""],
        row3: ["", "", ""]
    }

    const getPlayBoard = function () {
        return _playBoard;
    }

    const setPlayBoard = function (row, column, input) {
        const cellRow = row;
        const cellCol = Number(column) - 1;
        const playerMark = input;

        _playBoard[`${cellRow}`].splice(cellCol, 1, playerMark);
    }

    return {getPlayBoard, setPlayBoard}

})();

// Sets condition for winning
const checkWin = (function () {
    let _winDetected = false;
    let _winner = 'noWinner';

    const detectWinner = function (cellRow, cellCol, playerMark, currentPlayBoard) {
        // Note: Change cellCol to Array Index
        const cellColIndex = Number(cellCol) - 1;
        
        // Check row if all columns has same mark
        const checkAllInRow = (function () {
            if (currentPlayBoard[`${cellRow}`][0] === playerMark &&
                currentPlayBoard[`${cellRow}`][1] === playerMark &&
                currentPlayBoard[`${cellRow}`][2] === playerMark) {
                    _winDetected = true;
            }
        })();

        // Check column if all rows has same mark
        const checkAllInColumn = (function () {
            if (currentPlayBoard.row1[cellColIndex] === playerMark &&
                currentPlayBoard.row2[cellColIndex] === playerMark &&
                currentPlayBoard.row3[cellColIndex] === playerMark) {
                    _winDetected = true;
            }
        })();

        // Check diagonals from left to right
        const checkDiagonalLeft = (function () {
            if (currentPlayBoard.row1[0] === playerMark &&
                currentPlayBoard.row2[1] === playerMark &&
                currentPlayBoard.row3[2] === playerMark) {
                    _winDetected = true;
            }
        })();

        // Check diagonals from right to left
        const checkDiagonalRight = (function () {
            if (currentPlayBoard.row1[2] === playerMark &&
                currentPlayBoard.row2[1] === playerMark &&
                currentPlayBoard.row3[0] === playerMark) {
                    _winDetected = true;
            }
        })();


        // Return player mark if winner is detected
        if (_winDetected) {
            _winner = playerMark;
        }

        return _winner;
    }

    return {detectWinner};
})();


// Change UI on mouse hover
const changeTurnMark = function (e) {

    // Detect Player Turn
    const currentPlayerTurn = playerTurnFlag.getPlayerTurn();

    if (e.type === 'mouseenter') {
        const buttonBg = document.createElement('div');
        buttonBg.classList.add('button-bg');

        // Adds UI depending on player turn
        if (currentPlayerTurn === 'x') {
            buttonBg.classList.add('x-hovered');
        } else if (currentPlayerTurn === 'o') {
            buttonBg.classList.add('o-hovered');
        }
 
        this.appendChild(buttonBg);
        
    } else if (e.type === 'mouseleave') {
        this.removeChild(document.querySelector('div.button-bg'));
    }
}

// Mark play cell on click
const markCell = function () {
    const cellRow = this.dataset.row;
    const cellCol = this.dataset.col;
    const playerMark = playerTurnFlag.getPlayerTurn();

    // Marks the play board object
    playBoard.setPlayBoard(cellRow, cellCol, playerMark);
    
    // Removes background Element used for hover effect
    this.removeChild(document.querySelector('div.button-bg'));
    
    // Marks the board with corresponding player mark
    if (playerMark === 'x') {
        this.classList.add('x-marked');
    } else if (playerMark === 'o') {
        this.classList.add('o-marked'); 
    }
    
    const currentPlayBoard = playBoard.getPlayBoard(playerMark);

    const winner = checkWin.detectWinner(cellRow, cellCol, playerMark, currentPlayBoard);

    // Removes Access to board on win
    if (winner !== 'noWinner') {
        domElements.getNodeList('playCell').forEach(node => {
            domElements.removeEvent(node, 'mouseenter', changeTurnMark);
            domElements.removeEvent(node, 'mouseleave', changeTurnMark);
            domElements.removeEvent(node, 'click', markCell);
        });
    }

    // Removes event listeners to cell that is marked
    this.removeEventListener('click', markCell);
    this.removeEventListener('mouseenter', changeTurnMark);
    this.removeEventListener('mouseleave', changeTurnMark);

    // Change player
    playerTurnFlag.changePlayerTurn();

}

// Adds event listeners to the cells
domElements.getNodeList('playCell').forEach(node => {
    domElements.addEvent(node, 'mouseenter', changeTurnMark);
    domElements.addEvent(node, 'mouseleave', changeTurnMark);
    domElements.addEvent(node, 'click', markCell);
});


