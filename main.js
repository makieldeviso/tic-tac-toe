const domElements = (function () {

    // Dom Elements List
    const getNodeList = function () {
        // Store Nodes lists here
        const nodeLists = {
            playCell: document.querySelectorAll('button.play-cell'),
            playerMarks: document.querySelectorAll('button.player-mark'),
            modeBtns: document.querySelectorAll('button.mode')
        }

        return nodeLists;
    }

    const getElement = function () {
        // Store Nodes/ Elements here
        const elements = {
            p1Mark: document.querySelector('button#p1-mark'),
            p2Mark: document.querySelector('button#p2-mark'),

            p1Label: document.querySelector('label[for="player1-name"]'),
            p2Label: document.querySelector('label[for="player2-name"]'),

            p1Input: document.querySelector('input#player1-name'),
            p2Input: document.querySelector('input#player2-name'),

            slider: document.querySelector('div#slider'),
            backModeBtn: document.querySelector('button#back-mode'),

            startBtn: document.querySelector('button#start'),

            p1TurnBanner: document.querySelector('div#p1-banner'),
            p2TurnBanner: document.querySelector('div#p2-banner'),

            p1TurnName: document.querySelector('p#p1-turn-name'),
            p2TurnName: document.querySelector('p#p2-turn-name'),

            p1Avatar: document.querySelector('div#p1-avatar p'),
            p2Avatar: document.querySelector('div#p2-avatar p'),

            boardCont: document.querySelector('div#board'), 
            optionsCont: document.querySelector('div#options'),
            resetBtn: document.querySelector('button#reset'),
            returnModeBtn: document.querySelector('button#return-mode')
        }
        
        return elements;
    }

    return {getNodeList, getElement}
})();

// Creates players
// const playerCreate = (function () {
    
//     const _players = [];

//     const addPlayer = function (playerName, playerMark) {
//         const newPlayer = {playerName, playerMark};
//         _players.push(newPlayer);
//         return newPlayer
//     }

//     const getPLayers = function () {
//         return _players
//     }

//     return {addPlayer, getPLayers}

// })();

// Create Game Mode (start) -
const gameDetails = (function () {
    const defineGame = {
        gameMode: 'versus',
        
        player1: {
            name: 'x-player',
            playerMark: 'x',
            player: 'user'
        },

        player2: {
            name: 'o-player',
            playerMark: 'o',
            player: 'user'
        }
    };
 
    const setGameMode = function (modeSelected) {
        defineGame.gameMode = modeSelected;
    }

    const getGameMode = function () {
        return defineGame.gameMode;
    }

    const setPlayer1 = function (name, playerMark, user) {
        defineGame.player1.name = name;
        defineGame.player1.playerMark = playerMark;
        defineGame.player1.player = user;
    }

    const setPlayer2 = function (name, playerMark, user) {
        defineGame.player2.name = name;
        defineGame.player2.playerMark = playerMark;
        defineGame.player2.player = user;
    }

    const getGameDetails = function () {
        return defineGame;
    }

    return {
        setGameMode, 
        getGameMode,
        setPlayer1, 
        setPlayer2,
        getGameDetails
    }
})();


const chooseGameMode = function () {
    const modeSelected = this.value
    const {slider} = domElements.getElement();
    const {backModeBtn} = domElements.getElement();

    // const modeSection = document.querySelector('section#mode-select');
    // const avatarSection = document.querySelector('section#avatar-select');
    // const playSection = document.querySelector('section#play-area');

    const {p1Mark} = domElements.getElement();
    const {p2Mark} = domElements.getElement();

    const {p1Label} = domElements.getElement();
    const {p2Label} = domElements.getElement();

    const {p1Input} = domElements.getElement();
    const {p2Input} = domElements.getElement();

    //  Changes gameMode in the gameDetails Obj
    gameDetails.setGameMode(modeSelected);

    // Adds back to mode Select function (start) --
    const backModeSelect = function () {
        // Slides back to mode select screen
        slider.classList.remove('mode-selected');

        // Revert changes in edit players screen to default upon back
        const setDefaultPlayers = (function () {
            p1Mark.value = 'x';
            p2Mark.value = 'o';
            
            p1Mark.setAttribute('data-flip', 'flip');
            p2Mark.setAttribute('data-flip', 'reverse');

            p1Label.textContent = 'Enter Player 1 Name';
            p2Label.textContent = 'Enter Player 2 Name';

            p1Input.setAttribute('placeholder', 'x-player');
            p2Input.setAttribute('placeholder', 'o-player');

            p1Input.value = '';
            p2Input.value = '';

            p2Input.disabled = false;

            gameDetails.setPlayer1('x-player', 'x', 'user');
            gameDetails.setPlayer1('o-player', 'o', 'user');
            gameDetails.setGameMode('versus');

        })();

        // Remove event listener on back
        backModeBtn.removeEventListener('click', backModeSelect);
    }

    backModeBtn.addEventListener('click', backModeSelect);
    // Adds back to mode Select function (end) --

    // Changes UI to edit player screen
    slider.classList.add('mode-selected');

    // Changes mode banner for edit player screen depending on gameMode
    const modeBanner = document.querySelector('p#game-mode');
    const capitalizedMode = `${modeSelected[0].toUpperCase()}${modeSelected.slice(1)}`;
    modeBanner.textContent = (`${capitalizedMode} Mode`);

    if (modeSelected === 'random' || modeSelected === 'minimax') {
        p1Label.textContent = 'Enter Player Name';
        p2Label.textContent = 'A.I. Name';

        if (modeSelected === 'random') {
            p2Input.value = 'Mr. Randomizer';
            p2Input.disabled = true;
        } else if (modeSelected === 'minimax') {
            p2Input.value = 'Ms. Unbeatable';
            p2Input.disabled = true;
        }
    }

}

// Create Game Mode (end) -
const changePlayerDetails = function () {
    const currentValue = this.value;
    let altButton;
    const {p1Mark} = domElements.getElement();
    const {p2Mark} = domElements.getElement();

    const {p1Input} = domElements.getElement();
    const {p2Input} = domElements.getElement();

    let currentInput;
    let altInput;

    if (this === p1Mark) {
        altButton = p2Mark;
        currentInput = p1Input;
        altInput = p2Input;
        
    } else if (this === p2Mark) {
        altButton = p1Mark;
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

    // Adds animation to player mark buttons
    if (this.getAttribute('data-flip') === 'flip') {
        this.setAttribute('data-flip', 'reverse');
        altButton.setAttribute('data-flip', 'flip');
    } else if (this.getAttribute('data-flip') === 'reverse') {
        this.setAttribute('data-flip', 'flip');
        altButton.setAttribute('data-flip', 'reverse');
    }
}

// Collect Data from user input and change gameDetails Obj to start game
const startGame = function () {

    // Set Player 1
    let p1Name = domElements.getElement().p1Input.value;
    const p1Mark = domElements.getElement().p1Mark.value;

    let p2Name = domElements.getElement().p2Input.value;
    const p2Mark = domElements.getElement().p2Mark.value;

    // Sets p2 to computer if not versus mode
    let p2Player = 'user';
    if (gameDetails.getGameMode() !== 'versus') {
        p2Player = 'computer';
    }

    // Sets name to default if no name was entered
    if (p1Name.length === 0) { 
        p1Name = domElements.getElement().p1Input.getAttribute('placeholder');
    }

    if (p2Name.length === 0) {
        p2Name = domElements.getElement().p2Input.getAttribute('placeholder');
    }

    // Sets the players in the gameDetails Obj
    gameDetails.setPlayer1(p1Name, p1Mark, 'user');
    gameDetails.setPlayer2(p2Name, p2Mark, p2Player);

    // Slides to play board screen
    domElements.getElement().slider.classList.add('game-start');


    // Setup game screen depending on gameMode
    const setupGameBoard = (function () {
        const gameMode = gameDetails.getGameDetails();

        const player1Mark = gameMode.player1.playerMark;
        const player2Mark = gameMode.player2.playerMark;

        console.log(gameMode);

        console.log(gameMode.player1.name);

        const {
            p1TurnBanner,
            p2TurnBanner,
            p1TurnName,
            p2TurnName,
            p1Avatar,
            p2Avatar } = domElements.getElement();

        // Sets player name on the banner
        p1TurnName.textContent = `${gameMode.player1.name}'s turn`;
        p2TurnName.textContent = `${gameMode.player2.name}'s turn`;

        // Sets avatar/ playerMark on the banner
        p1Avatar.textContent = `${player1Mark.toUpperCase()}`;
        p2Avatar.textContent = `${player2Mark.toUpperCase()}`;
   
        // Styles Banner according to mark
        const styleBanner = function (banner, mark) {
            if (mark === 'x') {
                banner.setAttribute('data-player', 'x')
    
            } else if (mark === 'o') {
                banner.setAttribute('data-player', 'o')
            }
        }

        styleBanner(p1TurnBanner, player1Mark);
        styleBanner(p2TurnBanner, player2Mark);


        // Show banner on x-player's side on start
        // Note: x-player always have first move
        const p1XPlayer = p1TurnBanner.getAttribute('data-player') === 'x';
        const p2XPlayer = p2TurnBanner.getAttribute('data-player') === 'x';

        const showDefaultBanner = function (xPlayer, banner) {
            if (xPlayer) {
                banner.setAttribute('data-shown', 'shown');
            } else {
                banner.setAttribute('data-shown', 'hidden');
            }
        }

        showDefaultBanner(p1XPlayer, p1TurnBanner);
        showDefaultBanner(p2XPlayer, p2TurnBanner);

    })();

}




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

    const _winningCells = [];

    const detectWinner = function (cellRow, cellCol, playerMark, currentPlayBoard) {
        // Note: Change cellCol to Array Index
        const cellColIndex = Number(cellCol) - 1;
        
        // Check row if all columns has same mark
        const checkAllInRow = (function () {
            if (currentPlayBoard[`${cellRow}`][0] === playerMark &&
                currentPlayBoard[`${cellRow}`][1] === playerMark &&
                currentPlayBoard[`${cellRow}`][2] === playerMark) {
                    _winDetected = true;

                for (let i = 1; i <= 3; i++) {
                    const cell = document.querySelector(`button[data-row='${cellRow}'][data-col='${i}']`);
                    _winningCells.push(cell);
                }
            }
        })();

        // Check column if all rows has same mark
        const checkAllInColumn = (function () {
            if (currentPlayBoard.row1[cellColIndex] === playerMark &&
                currentPlayBoard.row2[cellColIndex] === playerMark &&
                currentPlayBoard.row3[cellColIndex] === playerMark) {
                    _winDetected = true;

                for (let i = 1; i <= 3; i++) {
                    const cell = document.querySelector(`button[data-row='row${i}'][data-col='${cellCol}']`);
                    _winningCells.push(cell);
                }
            }
        })();

        // Check diagonals from left to right
        const checkDiagonalLeft = (function () {
            if (currentPlayBoard.row1[0] === playerMark &&
                currentPlayBoard.row2[1] === playerMark &&
                currentPlayBoard.row3[2] === playerMark) {
                    _winDetected = true;

                for (let i = 1; i <= 3; i++) {
                    const cell = document.querySelector(`button[data-row='row${i}'][data-col='${i}']`);
                    _winningCells.push(cell);
                }
            }
        })();

        // Check diagonals from right to left
        const checkDiagonalRight = (function () {
            if (currentPlayBoard.row1[2] === playerMark &&
                currentPlayBoard.row2[1] === playerMark &&
                currentPlayBoard.row3[0] === playerMark) {
                    _winDetected = true;

                for (let i = 1; i <= 3; i++) {
                    const cell = document.querySelector(`button[data-row='row${i}'][data-col='${4 - i}']`);
                    _winningCells.push(cell);
                }

            }
        })();

        // Return player mark if winner is detected
        if (_winDetected) {
            _winner = playerMark;
        }

        return _winner;
    }

    const getWinningCells = function () {
        return _winningCells;
    }

    // Add UI changes/ highlight winning cells
    const showWinningCells = function () {
        _winningCells.forEach(cell => {
            cell.setAttribute('data-win', 'win');
        });

        

        console.log(_winningCells);
    }

    const enlargeOptions = function (enlarge) {
        const {optionsCont, boardCont } = domElements.getElement();
       
        if (enlarge) {
            optionsCont.setAttribute('data-class', 'enlarge');
            boardCont.setAttribute('data-class', 'minimize');
        } else {
            optionsCont.setAttribute('data-class', '');
            boardCont.setAttribute('data-class', '');
        }
    }

    return {detectWinner, getWinningCells, showWinningCells, enlargeOptions};
})();


// Change UI on mouse hover
const hoverOnCell = function (e) {

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

    // Checks for winner
    const winner = checkWin.detectWinner(cellRow, cellCol, playerMark, currentPlayBoard);
    
    if (winner !== 'noWinner') {
        // Removes Access to board on win
        domElements.getNodeList().playCell.forEach(node => {
            node.removeEventListener('mouseenter', hoverOnCell);
            node.removeEventListener('mouseleave', hoverOnCell);
            node.removeEventListener('click', markCell);
        });

        // UI change to winning cells and enlarge options 
        checkWin.showWinningCells();
        checkWin.enlargeOptions(true);

    }

    // Removes event listeners to cell that is marked
    this.removeEventListener('click', markCell);
    this.removeEventListener('mouseenter', hoverOnCell);
    this.removeEventListener('mouseleave', hoverOnCell);

    // Change player
    playerTurnFlag.changePlayerTurn();

    // Shows Turn Change UI
    const shownTurnChange = (function () {
        const newPlayer = playerTurnFlag.getPlayerTurn();
    
        const oldPlayerBanner = document.querySelector(`div[data-player='${playerMark}']`);
        const newPlayerBanner = document.querySelector(`div[data-player='${newPlayer}']`);
        
        oldPlayerBanner.setAttribute('data-shown', 'hidden');
        newPlayerBanner.setAttribute('data-shown', 'shown');

        if (winner !== 'noWinner') {

            const winnerBanner = document.querySelector(`div[data-player='${winner}']`);
            const winnerName = winnerBanner.querySelector('p.turn-name');
            const winnerMessage = `${winnerName.textContent.slice(0, -7)} Wins!`;
            oldPlayerBanner.setAttribute('data-shown', 'hidden');
            newPlayerBanner.setAttribute('data-shown', 'hidden');

            setTimeout(()=> {
                winnerBanner.setAttribute('data-shown', 'shown');
                winnerName.textContent = winnerMessage;
            }, 300);
            

        }
    })();

}


const addEventFunctions = (function () {
    // Mode Buttons
    domElements.getNodeList().modeBtns.forEach(node => {
        node.addEventListener ('click', chooseGameMode);
    });

    // Adds event listeners to player mark
    domElements.getNodeList().playerMarks.forEach(node => {
        node.addEventListener ('click', changePlayerDetails);
     });


    //  Start Button
    domElements.getElement().startBtn.addEventListener('click', startGame);

    // Adds event listeners to the cells
    domElements.getNodeList().playCell.forEach(node => {
        node.addEventListener('mouseenter', hoverOnCell);
        node.addEventListener('mouseleave', hoverOnCell);
        node.addEventListener('click', markCell)
    });

})();





