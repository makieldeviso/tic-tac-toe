# Tic-tac-toe

## About
A tic-tac-toe game featuring 3 modes, a two-player versus mode, a computer opponent with randomized moves and an unbeatable computer opponent equipped with minimax algorithm.

## Objective
Create a tic-tac-toe game playable in the browser which combines knowledge in creating logic and interactivity for the players.

Focus in writing the functionality enclosed in factories, while exercising proper ways to use scopes and closures. 

Utilize factory functions in creating objects with its methods which will control the gameplay sequence.

## Features
The player can select 3 modes:
1. Versus - Can be played with another person in a turn base format.
2. Random - Play with a computer with a randomized move set.
3. Minimax - Play with an unbeatable computer opponent, with minimax algorithm 

Selecting a game mode will open a panel where the player/s can enter their name. The player can still change game mode at this phase with the back button. 

Players can switch which character (X or O) to play by clicking on the character icons. Players can enter their names (12 max length) but skipping this will default their names to X-player or O-player respective to their characters in the edit players section. Clicking start button will initiate the game sequence.

The game will randomly select the first turner for the first round of the match. Subsequently, the loser of a round will be first turner for the next round. In case of draw, the next first turn will switch to the second turner of the previous round.

Players can click on a tile from the 3x3 game board to place their character. Players will take turn on placing their characters until a player matches theirs three in a row, in a column or diagonally, which results to a point. A point is added to the winning player's side on the score board. The round also ends in a draw if no player matches 3 of their character.

While a round is still on-going, the **Reset** button when clicked will pop a modal to ask if the match will be reset?
Confirming will reset the match and the scores. Else, if the round was already over, the **Reset** button functions to advance the match for the next round.

Clicking the **Mode** button opens a dialog to return to mode selection. Confirming will clear current progress and return the player/s to the mode selection screen.

## Live Preview
This project can be played at [Tic-tac-toe](https://makieldeviso.github.io/tic-tac-toe/)