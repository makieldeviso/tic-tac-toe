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
            playArea: document.querySelector('section#play-area'),

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

            scoreBoard: document.querySelector('div#score-board'),
            p1Score: document.querySelector('p#p1-score'),
            p2Score: document.querySelector('p#p2-score'),

            boardCont: document.querySelector('div#board'), 
            optionsCont: document.querySelector('div#options'),
            resetBtn: document.querySelector('button#reset'),
            returnModeBtn: document.querySelector('button#return-mode'),

            roundAsk: document.querySelector('p#round-ask'),
            resetBtnLabel: document.querySelector('button#reset span'),
            returnModeBtnLabel: document.querySelector('button#return-mode span'),

            resetDialog: document.querySelector('dialog#reset-dialog'),
            yesResetBtn: document.querySelector('button#yes-reset'),
            noResetBtn: document.querySelector('button#no-reset'),

            returnDialog: document.querySelector('dialog#return-dialog'),
            yesReturnBtn: document.querySelector('button#yes-return'),
            noReturnBtn: document.querySelector('button#no-return'),

            footer: document.querySelector('footer')
        }
        
        return elements;
    }

    return {getNodeList, getElement}
})();

// Create Game Mode (start) -
const gameDetails = (function () {
    const defineGame = {
        gameMode: 'versus',
        
        player1: {
            name: 'x-player',
            playerMark: 'x',
            player: 'user',
            score: 0
        },

        player2: {
            name: 'o-player',
            playerMark: 'o',
            player: 'user',
            score: 0
        },

        matches: 0,

        lastWinner: ''

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

    const logMatches = function (matchNumber) {
        if (arguments.length === 0) {
            defineGame.matches = gameDetails.getMatches() + 1;
        } else if (matchNumber === 'reset') {
            defineGame.matches = 0;
        }
    }

    const getMatches = function () {
        return defineGame.matches;
    }

    const getGameDetails = function () {
        return defineGame;
    }

    const setLastWinner = function (winner) {
        defineGame.lastWinner = winner;
    }

    const getLastWinner = function () {
        return defineGame.lastWinner;
    }

    const logScore = function (player) {
        if (player === 'p1') {
            defineGame.player1.score = gameDetails.getScore("p1") + 1;
        } else if (player === 'p2') {
            defineGame.player2.score = gameDetails.getScore("p2") + 1;
        } else if (player === 'reset') {
            defineGame.player1.score = 0;
            defineGame.player2.score = 0;
        }
    }

    const getScore = function (player) {
        let playerScore;

        if (player === 'p1') {
            playerScore = defineGame.player1.score;
        } else if (player === 'p2') {
            playerScore = defineGame.player2.score;
        }
        return playerScore;
    }

    const resetGameDetails = function () {
        setGameMode('versus');
        setPlayer1('x-player', 'x', 'user');
        setPlayer2('o-player', 'o', 'user');
        logScore('reset');
        logMatches('reset');
        setLastWinner('');
    }

    // Revert changes in edit players screen to default upon back
    const setDefaultEditPlayers = function () {
        const { p1Mark, p2Mark, p1Label, p2Label, p1Input, p2Input } = domElements.getElement();

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
    };

    const getPlayerMark = function (player) {
        let mark;

        if (player === 'p1') {
            mark = defineGame.player1.playerMark;
        } else if (player === 'p2') {
            mark = defineGame.player2.playerMark;
        }

        return mark;
    }

    const p2Computer = function () {
        const p2 = defineGame.player2.player === 'computer';
        return p2;
    }

    return {
        setGameMode, 
        resetGameDetails,
        setDefaultEditPlayers,
        getGameMode,
        setPlayer1, 
        setPlayer2,
        logMatches,
        getMatches,
        setLastWinner,
        getLastWinner,
        logScore,
        getScore,
        getGameDetails,
        p2Computer,
        getPlayerMark
    }
})();


// Select game mode from buttons
const chooseGameMode = function () {
    const modeSelected = this.value
    const { slider, backModeBtn, p1Mark, p2Mark, p1Label,
        p2Label, p1Input, p2Input, footer } = domElements.getElement();

    //  Changes gameMode in the gameDetails Obj
    gameDetails.setGameMode(modeSelected);

    // Hides footer
    footer.classList.add('hidden');

    // Adds back to mode Select function (start) --
    const backModeSelect = function () {
        // Slides back to mode select screen
        slider.classList.remove('mode-selected');

        // Revert changes in edit players screen to default upon back
        gameDetails.setDefaultEditPlayers();
        gameDetails.resetGameDetails();

        // Show footer back
        footer.classList.remove('hidden');

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

    } else if (modeSelected === 'versus') {
        // Set edit players to default
        gameDetails.setDefaultEditPlayers();
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

// Sets player turn function
const playerTurnFlag = (function () {

    const playerMarks = ['x', 'o'];

    let _playerTurn = 'x';

    const rollFirstTurn = function () {
        _playerTurn = playerMarks[Math.floor(Math.random() * 2)];
    }

    const changePlayerTurn = function () {
        if (_playerTurn === 'x') {
            _playerTurn = 'o';
        } else if (_playerTurn === 'o') {
            _playerTurn = 'x';
        }
    }

    const setPlayerTurn = function(mark) {
        _playerTurn = mark;
    }

    const getPlayerTurn = function () {
        return _playerTurn;
    }

    const resetPlayerTurn = function () {
        _playerTurn = rollFirstTurn();
    }

    const getTurnAI = function () {
        const p2TurnMark = gameDetails.getPlayerMark('p2');
        let turnAI = false;

        if (p2TurnMark === _playerTurn) {
            turnAI = true;
        } 

        return turnAI;
    }

    return {changePlayerTurn, 
            getPlayerTurn, 
            resetPlayerTurn, 
            rollFirstTurn, 
            setPlayerTurn,
            getTurnAI
        }
})();

// Collect Data from user input and change gameDetails Obj to start game
const startGame = function (e) {
    if (e !== undefined) {
        // Set Player 1
        let p1Name = domElements.getElement().p1Input.value;
        const p1Mark = domElements.getElement().p1Mark.value;

        // Set Player 2
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
    }

    // Setup game screen depending on gameMode
    const setupGameBoard = (function () {
        const gameMode = gameDetails.getGameDetails();

        const player1Mark = gameMode.player1.playerMark;
        const player2Mark = gameMode.player2.playerMark;

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

        // Show banner on first turner's side on start
        // Note: rollFirstTurn() method randomly select between x and o for first turn 
        // Note: If conditional is added to avoid random first turn on consecutive matches
        if (gameDetails.getMatches() === 0) {
            playerTurnFlag.rollFirstTurn();
        }

        // Checks p1 and p2 if they have the same mark as current playerTurn and stores true or false to variable
        const p1FirstPlayer = p1TurnBanner.getAttribute('data-player') === playerTurnFlag.getPlayerTurn();
        const p2FirstPlayer = p2TurnBanner.getAttribute('data-player') === playerTurnFlag.getPlayerTurn();

        // Set attribute as shown or hidden to banner if its their turn
        const showDefaultBanner = function (xPlayer, banner) {
            if (xPlayer) {
                banner.setAttribute('data-shown', 'shown');
            } else {
                banner.setAttribute('data-shown', 'hidden');
            }
        }

        showDefaultBanner(p1FirstPlayer, p1TurnBanner);
        showDefaultBanner(p2FirstPlayer, p2TurnBanner);

        
        // Checks if p2 is computer and AI is first turn
        const p2Computer = gameDetails.p2Computer();
        const turnAI = playerTurnFlag.getTurnAI();
        const randomAI = gameDetails.getGameMode() === 'random';
        const minimaxAI = gameDetails.getGameMode() === 'minimax';

        // Note: If minimax AI is first turn, random place mark
        if (turnAI && p2Computer) {
            if (randomAI || minimaxAI) {
                runAI('random');
            }

        } else {
            // Add event listener if player is first turn
            // Note: event was previously removed from reset
            const {playCell} = domElements.getNodeList();
            playCell.forEach(cell => {
                cell.addEventListener('click', markCell);
                cell.addEventListener('mouseenter', hoverOnCell);
                cell.addEventListener('mouseleave', hoverOnCell);
            });
        }
    })();
}

const playBoard = (function () {
    
    const _playBoard = {
        row1: ['', '', ''],
        row2: ['', '', ''],
        row3: ['', '', '']
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

    // Resets playBoard Values
    const resetPlayBoard = function () {
        for (let i = 1; i <= 3; i++ ) {
            _playBoard[`row${i}`] = ['', '', ''];
        }

        // Removes marks on the playboard
        const {playCell} = domElements.getNodeList();

        playCell.forEach(cell => {
            const marked = cell.hasAttribute('data-mark');
            if (marked) {
                cell.removeAttribute('data-mark');
            }

            // Removes win indicator
            const winMarked = cell.hasAttribute('data-win');

            if (winMarked) {
                cell.removeAttribute('data-win');
            }

        });

        return _playBoard;
    }

    return {getPlayBoard, setPlayBoard, resetPlayBoard}

})();

// Sets condition for winning
const checkWin = (function () {
    let _winDetected = false;
    let _winner = 'noWinner';

    let _winningCells = [];

    // Note: this function does not check whole board, only check winning condition
    // according to last player move
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

        // Checks if Draw
        const checkDraw = (function () {  
            const board = playBoard.getPlayBoard();

            // Check all rows if there are free cells, return false if all cells are taken
            let rowsFree;
            for (let i = 1; i <= 3; i++) {
                const rowStat = board[`row${i}`].some(cell => cell === '');
                if (rowStat === true) {
                    rowsFree = true;
                    break;
                } else {
                    rowsFree = false;
                }
            }

            if (_winDetected === false && rowsFree === false)  {
                _winDetected = 'draw';
            }
        })();

        // Return player mark if winner is detected
        // Return draw if draw
        if (_winDetected === true || _winDetected === 'draw') {
            _winner = playerMark;

            if (_winDetected === 'draw') {
                _winner = 'draw';
            }
            
            // Records how many legible matches were played
            gameDetails.logMatches();

            //  Records the last Winner of the Match
            gameDetails.setLastWinner(_winner);

            // Set reset button for next match events
            domElements.getElement().resetBtn.setAttribute('data-action', 'next-match');
        }

        return _winner;
    }

    // Add UI changes/ highlight winning cells
    const showWinningCells = function (show) {
        if (show) {
            _winningCells.forEach(cell => {
                cell.setAttribute('data-win', 'win');
            });
        } else {
            _winningCells.forEach(cell => {
                cell.removeAttribute('data-win');
            });
        }
    }

    // Adds UI indication/ enlarges options when win is detected
    const enlargeOptions = function (enlarge) {
        const {optionsCont, boardCont, resetBtn, returnModeBtn, roundAsk} = domElements.getElement();
        
        // Show button function on hover
        const showOptionLabel = function (e) {
            if (this === resetBtn && e.type === 'mouseenter' ) {
                roundAsk.textContent = 'Play another round';
            } else if (this === returnModeBtn && e.type === 'mouseenter') {
                roundAsk.textContent = 'Return to Mode Select';
            } else {
                roundAsk.textContent = '\u00A0';
            }
        }

        // Note: setTimeout smoothens transition
        setTimeout(() => {
            if (enlarge) {
                optionsCont.setAttribute('data-class', 'enlarge');
                boardCont.setAttribute('data-class', 'minimize');

                // Add event listener to options buttons
                resetBtn.addEventListener('mouseenter', showOptionLabel);
                returnModeBtn.addEventListener('mouseenter', showOptionLabel);
                resetBtn.addEventListener('mouseleave', showOptionLabel);
                returnModeBtn.addEventListener('mouseleave', showOptionLabel);
            } else {
                optionsCont.setAttribute('data-class', '');
                boardCont.setAttribute('data-class', '');

                // Remove event listeners to options buttons
                resetBtn.removeEventListener('mouseenter', showOptionLabel);
                returnModeBtn.removeEventListener('mouseenter', showOptionLabel);
                resetBtn.removeEventListener('mouseleave', showOptionLabel);
                returnModeBtn.removeEventListener('mouseleave', showOptionLabel);
            }
        }, 400);
    }

    // Logs Scores and change ScoreBoard on end match
    const changeScore = function () {
        // Identify Players' marks then check if they won
        const {p1Score, p2Score, scoreBoard} = domElements.getElement();

        const p1Mark = gameDetails.getPlayerMark('p1');
        const p2Mark = gameDetails.getPlayerMark('p2');

        const p1Wins = p1Mark === _winner; // Saves true or false
        const p2Wins = p2Mark === _winner; // Saves true or false
        const gameDraw = _winner === 'draw';

        // Changes Score in player objects
        if (p1Wins) {
            gameDetails.logScore('p1');

        } else if (p2Wins) {    
            gameDetails.logScore('p2');
        }

        // Shows scores on the UI
        const p1CurrentScore = gameDetails.getScore('p1');
        const p2CurrentScore = gameDetails.getScore('p2');

        // Logs score to the winning players
        const scoreChangeUI = (function () {
            let winningPlayerBoard;

            if (p1Wins) {
                winningPlayerBoard = p1Score;
            } else if (p2Wins) {
                winningPlayerBoard = p2Score;
            } else {
                // if both p1 and p2 === false/ no winner
                winningPlayerBoard = scoreBoard;
            }
            
            // UI animation
            // Note: no UI changes on draw
            if (!gameDraw) {
                winningPlayerBoard.classList.toggle('change');

                setTimeout(()=> {
                    if (p1Wins) {
                        winningPlayerBoard.textContent = `${p1CurrentScore}`;
                    } else if (p2Wins) {
                        winningPlayerBoard.textContent = `${p2CurrentScore}`;
                    } else {
                        p1Score.textContent = '0';
                        p2Score.textContent = '0';
                    }
                }, 250);
    
                setTimeout(()=> {
                    winningPlayerBoard.classList.toggle('change');
                }, 500);
            }
        })();
    }

    const resetWin = function () {
        _winner = 'noWinner';
        _winDetected = false;
        _winningCells = [];

        showWinningCells(false);
    }

    // Used for minimax checking
    const predictWin = function (board, playerMark) {
        let winner = 'noWinner';
        
        // Check rows
        for (let i = 1; i <= 3; i++) {
            if (board[`row${i}`][0] === playerMark &&
                board[`row${i}`][1] === playerMark &&
                board[`row${i}`][2] === playerMark) {
                    winner = playerMark;
                }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board.row1[i] === playerMark &&
                board.row2[i] === playerMark &&
                board.row3[i] === playerMark) {
                    winner = playerMark;
                }
        }

        // Check diagonals left to right
        if (board.row1[0] === playerMark &&
            board.row2[1] === playerMark &&
            board.row3[2] === playerMark) {
                winner = playerMark;
        }

        // Check diagonals right to left
        if (board.row1[2] === playerMark &&
            board.row2[1] === playerMark &&
            board.row3[0] === playerMark) {
                winner = playerMark;
        }

        // Check if all spots are taken
        const boardRows = Object.keys(board);
        const freeCells = boardRows.some(row => board[row].includes(''));

        if ((winner === 'noWinner') && !freeCells) {
            winner = 'draw';
        }

        return winner;
    }

    const getWinStatus = function () {
        return {_winDetected, _winner, _winningCells};
    }

    return {detectWinner, showWinningCells, enlargeOptions, resetWin, changeScore, predictWin, getWinStatus};
})();

// Change UI on mouse hover
const hoverOnCell = function (e) {

    // Detect Player Turn
    const currentPlayerTurn = playerTurnFlag.getPlayerTurn();

    if (e.type === 'mouseenter') {
        // Adds UI depending on player turn
        if (currentPlayerTurn === 'x') {
            this.setAttribute('data-hover', 'x');
        } else if (currentPlayerTurn === 'o') {
            this.setAttribute('data-hover', 'o');
        }
        
    } else if (e.type === 'mouseleave') {
        this.removeAttribute('data-hover');
    }
}

// Mark play cell on click
const markCell = function (e) {
    const {playCell} = domElements.getNodeList();
    let cellRow;
    let cellCol;
    const playerMark = playerTurnFlag.getPlayerTurn();
    let tile;

    if (e.type === 'click') {
        cellRow = this.dataset.row;
        cellCol = this.dataset.col;
        tile = this;

    } else {
        cellRow = e.dataset.row;
        cellCol = e.dataset.col;
        tile = e;
    }
    
    // Marks the play board object
    playBoard.setPlayBoard(cellRow, cellCol, playerMark);
    
    // Removes background Element used for hover effect
    if (tile.hasAttribute('data-hover')) {
        tile.removeAttribute('data-hover');
    }

    // Marks the board with corresponding player mark
    if (playerMark === 'x') {
        tile.setAttribute('data-mark', 'x');
    } else if (playerMark === 'o') {
        tile.setAttribute('data-mark', 'o'); 
    }
    
    const currentPlayBoard = playBoard.getPlayBoard(playerMark);

    // Checks for winner
    const winner = checkWin.detectWinner(cellRow, cellCol, playerMark, currentPlayBoard);
    
    if (winner !== 'noWinner') {
        // Removes Access to board on win
        playCell.forEach(node => {
            node.removeEventListener('mouseenter', hoverOnCell);
            node.removeEventListener('mouseleave', hoverOnCell);
            node.removeEventListener('click', markCell);
        });

        // UI change to winning cells and enlarge options 
        checkWin.showWinningCells(true);
        checkWin.enlargeOptions(true);

        checkWin.changeScore();
    }

    // Removes event listeners to cell that is marked
    tile.removeEventListener('click', markCell);
    tile.removeEventListener('mouseenter', hoverOnCell)
    tile.removeEventListener('mouseleave', hoverOnCell)

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

            const {p1TurnBanner, p2TurnBanner} = domElements.getElement();
                p1TurnBanner.setAttribute('data-shown', 'hidden');
                p2TurnBanner.setAttribute('data-shown', 'hidden');

            if (winner !== 'draw') {

                const winnerBanner = document.querySelector(`div[data-player='${winner}']`);
                const winnerName = winnerBanner.querySelector('p.turn-name');
                const winnerMessage = `${winnerName.textContent.slice(0, -7)} Wins!`;
    
                setTimeout(()=> {
                    winnerBanner.setAttribute('data-win', 'win');
                    winnerBanner.setAttribute('data-shown', 'shown');
                    winnerName.textContent = winnerMessage;
                }, 300);

            } else {
                const {p1TurnName, p2TurnName} = domElements.getElement();

                setTimeout(()=> {
                    p1TurnBanner.setAttribute('data-shown', 'draw');
                    p2TurnBanner.setAttribute('data-shown', 'draw');
                    p1TurnName.textContent = 'Dr';
                    p2TurnName.textContent = 'aw!';
                }, 300);
            }
        }
    })();

    // Setup for AI Turn
    const p2Computer = gameDetails.p2Computer();
    const noWinner = winner === 'noWinner';
    const turnAI = playerTurnFlag.getTurnAI();
    const {gameMode} = gameDetails.getGameDetails();

    if (p2Computer && turnAI && noWinner ) {
        if (gameMode === 'random' ) {
            runAI('random');

        } else if (gameMode === 'minimax') {
            runAI('minimax');
        }
    } 
}
 
const runAI = function (AI) {
    const {playCell} = domElements.getNodeList();

    // Convert NodeList to Array
    const cellArray = Array.from(playCell);

    // Filter Cells that are not marked function
    const checkFreeCells = function () {
        const freeCells = cellArray.filter(cell => !cell.hasAttribute('data-mark'));
        return freeCells;
    };

    // Remove eventListeners on the cells while AI's turn
    checkFreeCells().forEach(cell => {
        cell.removeEventListener('mouseenter', hoverOnCell);
        cell.removeEventListener('mouseleave', hoverOnCell);
        cell.removeEventListener('click', markCell);
    });

    // Function contains execution/ algorithm for marking the board
    const markingExecution = function (tile) {
        setTimeout(() => {
            markCell(tile);
        }, 800);

        // Return eventListeners on the cells
        // Note: added delay to avoid rapid click
        setTimeout(() => {
            checkFreeCells().forEach(cell => {
                cell.addEventListener('mouseenter', hoverOnCell);
                cell.addEventListener('mouseleave', hoverOnCell);
                cell.addEventListener('click', markCell);
            });
        }, 1200);
    }

    // Random AI choose a cell/ tile to mark
    const randomAITurn = function () {
        // AI chooses random cell to mark
        const randomIndex = Math.floor(Math.random() * checkFreeCells().length);
        const tileAI = checkFreeCells()[randomIndex];
        
        markingExecution(tileAI);
    }

    // Minimax AI function
    const minimaxAITurn = function () {
        const player = gameDetails.getPlayerMark('p1');
        const computer = gameDetails.getPlayerMark('p2');

        const boardState = {...playBoard.getPlayBoard()};
        
        // Evaluate current board state and return scores   
        const evaluate = function (board) {
            let score;

            const playerWins = checkWin.predictWin(board, player) === player;
            const computerWins = checkWin.predictWin(board, computer) === computer;

            if (computerWins) {
                score = 1;

            } else if (playerWins) {
                score = -1;

            } else {
                score = 0; // TIE 
            }

            return score;
        }
        
        const minimax = function (board, depth, isMaximizing) {

            let isGameOver;
            if (checkWin.predictWin(board, player) !== 'noWinner' ||
            checkWin.predictWin(board, computer) !== 'noWinner') {
                isGameOver = true;
            }

            if (isGameOver) {
                return evaluate(board);
            }
            
            let bestScore;
            if (isMaximizing) {
                let maxScore = -Infinity;
                
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        // If a cell is available, evaluate
                        if (board[`row${i + 1}`][j] === '') {
                            board[`row${i + 1}`][j] = computer;
                           
                            const score = minimax(board, depth + 1, false);

                            board[`row${i + 1}`][j] = '';

                            maxScore = Math.max(maxScore, score);
                        }
                    }
                }
                bestScore = maxScore;

            } else {
                let minScore = Infinity;
                
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (board[`row${i + 1}`][j] === '') {
                            board[`row${i + 1}`][j] = player;

                            const score = minimax(board, depth + 1, true);

                            board[`row${i + 1}`][j] = '';

                            minScore = Math.min(minScore, score);
                        }
                    }
                }
                bestScore = minScore;
            }

            return bestScore;
        }

       const bestMove = function (board) {
            let bestScore = -Infinity;
            let bestCellMove;

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                  if (board[`row${i + 1}`][j] === '') {   
                    board[`row${i + 1}`][j] = computer;
                    
                    const score = minimax(board, 0, false);

                    board[`row${i + 1}`][j] = '';
                    
                    if (score > bestScore) {
                      bestScore = score;
                      bestCellMove = { row: i + 1, col: j + 1 };
                    }
                  }
                }
              }
              
              return bestCellMove;
       }

       // Returns object with row and column value of used for DOM target
       const bestMoveTile = bestMove(boardState);

       // Use bestMoveTile, filter rows then find the column
       const rowFilter = cellArray.filter(cell => cell.dataset.row === `row${bestMoveTile.row}`);
       const tileAI = rowFilter.find(cell => cell.dataset.col === `${bestMoveTile.col}`);

       // Execute command to mark tile determined by the minimax AI
       markingExecution(tileAI);
    }

    if (AI === 'random') {
        randomAITurn();

    } else if (AI === 'minimax') {
        minimaxAITurn();
    }
};

//  Reset game board on click of reset button
const resetBoard = function (e) {
    const {resetBtn, resetDialog, yesResetBtn, noResetBtn, yesReturnBtn} = domElements.getElement();
    const {playCell} = domElements.getNodeList();

    let totalReset = false;
    let nextMatch = false;

    // Conditional to detect what activated the reset
    if (e === yesReturnBtn) {
        // Resets the board through Return Mode Button
        totalReset = e.dataset.action === 'total';
    } else {
        // Resets the board through Reset Button
        totalReset = this.dataset.action === 'total';
        nextMatch = this.dataset.action === 'next-match';
    }

    const initiateReset = function (action) {
        // Removes marks on board
        playBoard.resetPlayBoard();
    
        // Add new eventListeners
        playCell.forEach(node => {
            node.removeEventListener('mouseenter', hoverOnCell);
            node.removeEventListener('mouseleave', hoverOnCell);
            node.removeEventListener('click', markCell)
        });
        
        // If game mode is continuously played, allow loser to play first move on next match
        // Else, randomly select player for first turn;
        
        const setFirstTurner = (function () {
            const matchesPlayed = gameDetails.getMatches();
            const lastWinner = gameDetails.getLastWinner();
    
            if (matchesPlayed > 0) {
                if (lastWinner === 'x') {
                    playerTurnFlag.setPlayerTurn('o');
                } else if (lastWinner === 'o') {
                    playerTurnFlag.setPlayerTurn('x');
                }
            }
            
        // Note: first player turn alternates on draw, because first turner is also last turner
        // E.g. if x is first turn, x is last turn, thus o is first turn in next match
        })();
    
        // Reset number of matches played if total reset is activated,
        // Else reset board with saved number of matches
    
        if (totalReset) {
            gameDetails.logMatches('reset');
            gameDetails.logScore('reset');
        } else if (nextMatch) {
            resetBtn.setAttribute('data-action', 'total')
        }
    
        // Resets winning conditions
        checkWin.resetWin();
    
        // If total reset is activated reverts score to 0-0
        if (totalReset) {
            checkWin.changeScore();
        }
    
        // Return playBoard to original size if minimized and
        // Return options to original size if enlarged
        checkWin.enlargeOptions(false);
    
        // Adds reset animation
        playCell.forEach(node => {
            // Add timeout to remove other dataset before adding new dataset
            // Note: fixes animation bug
            setTimeout(() => {
                node.setAttribute('data-reset', 'reset');
            }, 50);
    
            setTimeout(() => {
                node.removeAttribute('data-reset');
            }, 800);
        });
    
        // UI animation to hide banners first before restarting
        domElements.getElement().p1TurnBanner.setAttribute('data-shown', 'hidden');
        domElements.getElement().p2TurnBanner.setAttribute('data-shown', 'hidden');
    
        // Remove win UI
        domElements.getElement().p1TurnBanner.setAttribute('data-win', 'no-win');
        domElements.getElement().p2TurnBanner.setAttribute('data-win', 'no-win');
        setTimeout(() => {
            domElements.getElement().p1TurnBanner.removeAttribute('data-win');
            domElements.getElement().p2TurnBanner.removeAttribute('data-win');
        }, 300);
    
        // Starts game
        // Note: startGame function do not initiate for return to Mode
        if (action !== 'returnMode') {
            setTimeout(() => {
                startGame();
            }, 800);
        }
    };

    if (totalReset && (e !== yesReturnBtn)) {
        resetDialog.showModal();

        // Reset behavior according to users' modal answer
        const resetAction = function () {
            const yes = this.value === 'yes';

            if (yes) {
                initiateReset('reset');
            }

            resetDialog.close();
            yesResetBtn.removeEventListener('click', resetAction);
            noResetBtn.removeEventListener('click', resetAction);
        }

        // Adds event listener to modal buttons
        yesResetBtn.addEventListener('click', resetAction);
        noResetBtn.addEventListener('click', resetAction);

    } else if (nextMatch) {
        // Fast reset, no prompt/ modal
        initiateReset('reset');

    } else {
        // Reset without startGame activation
        initiateReset('returnMode');
    }
}

// Return to Title Screen/ Mode Select 
const returnMode = function () {
    const {returnDialog, yesReturnBtn, noReturnBtn, slider, footer} = domElements.getElement();

    const initiateReturn = function () {
        const yes = this.value === 'yes';

        if (yes) {
            // Overwrites the Edit player values
            gameDetails.setDefaultEditPlayers();

            // Resets the defineGame Obj
            gameDetails.resetGameDetails();

            // Resets Board
            // Note: argument 'this', so that resetBoard func 
            // detect that it was triggered by return mode
            resetBoard(this);

            // Slides back to mode-select
            slider.classList.remove('game-start', 'mode-selected');

            // Show footer back
            footer.classList.remove('hidden');
        }
        
        // Removes event listeners
        yesReturnBtn.removeEventListener('click', initiateReturn);
        noReturnBtn.removeEventListener('click', initiateReturn);

        returnDialog.close();
    }

    yesReturnBtn.addEventListener('click', initiateReturn);
    noReturnBtn.addEventListener('click', initiateReturn);
    returnDialog.showModal();
}

// Dedicated add eventListener function
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

    // Reset and return to Mode Buttons 
    domElements.getElement().resetBtn.addEventListener('click', resetBoard);
    domElements.getElement().returnModeBtn.addEventListener('click', returnMode);
})();




