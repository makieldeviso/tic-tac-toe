const domElements = (function () {

    // Adds Event Listener Method
    const addEvent  = function (domElement, event, assignedFunc) {
        domElement.addEventListener(event, assignedFunc);
    }

    const removeEvent  = function (domElement, event, assignedFunc) {
        domElement.removeEventListener(event, assignedFunc);
    } 

    // Dom Elements List
    const playCell = document.querySelectorAll('button.play-cell');

    return {addEvent, removeEvent, playCell}
})();

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

    const _xPlayBoard = {
        row1: ["", "", ""],
        row2: ["", "", ""],
        row3: ["", "", ""]
    }

    const _oPlayBoard = {
        row1: ["", "", ""],
        row2: ["", "", ""],
        row3: ["", "", ""]
    }


    const getPlayBoard = function (required) {

        let set = _playBoard;

        if (required === 'x') {
            set = _xPlayBoard;
        } else if (required === 'o') {
            set = _oPlayBoard;
        }

        return set;
    }

    const setPlayBoard = function (row, column, input) {
        const cellRow = row;
        const cellCol = Number(column) - 1;
        const playerMark = input;

        if (playerMark === 'x') {
            _xPlayBoard[`${cellRow}`].splice(cellCol, 1, playerMark);
        } else if (playerMark === 'o') {
            _oPlayBoard[`${cellRow}`].splice(cellCol, 1, playerMark);
        }

        _playBoard[`${cellRow}`].splice(cellCol, 1, playerMark);

        // console.log(_playBoard);
        // console.log(_xPlayBoard);
        // console.log(_oPlayBoard);

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
        domElements.playCell.forEach(node => {
            domElements.removeEvent(node, 'mouseenter', changeTurnMark);
            domElements.removeEvent(node, 'mouseleave', changeTurnMark);
            domElements.removeEvent(node, 'click', markCell);
        });
    }

    // Removes event listeners to cell on mark
    this.removeEventListener('click', markCell);
    this.removeEventListener('mouseenter', changeTurnMark);
    this.removeEventListener('mouseleave', changeTurnMark);

    // Change player
    playerTurnFlag.changePlayerTurn();

}

// Adds event listeners to the cells
domElements.playCell.forEach(node => {
    domElements.addEvent(node, 'mouseenter', changeTurnMark);
    domElements.addEvent(node, 'mouseleave', changeTurnMark);
    domElements.addEvent(node, 'click', markCell);
});

