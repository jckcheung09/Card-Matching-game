# Tarot Matching
https://github.com/jckcheung09/gameProject
### How to run
Run game with index.html if you have cloned or downloaded the directory.
You can clone or download this game with the clone or download green button on this page https://github.com/jckcheung09/gameProject
Alternatively you can go to https://jckcheung09.github.io/gameProject/ to play.
The game's goal is to match as many cards as possible, using as little moves and time as possible.

### Goals
The goal of this project is to build a card matching game using html css and javascript. The game should require the user to match all the cards on screen, the game should allow players to select a difficulty at the start, the amount of moves and time taken to complete. The game should allow players to select a difficulty at the start, display a score screen when all cards are matched displaying time and moves taken, it should also have a way for users to play the next game.
### Method of approach
This project's development loosely follows the agile model where the goal is to rapidly prototype ensuring that the game is always functional to a degree. The game was initially built with only two cards on screen to ensure that basic card matching works the actual card flipping animation was then implemented , it was then scaled to 2 pairs of cards to ensure that the game can handle matching more than 1 pair of cards
### Challenges
The logic for checking if two cards match are simple but ended up being much more complicated when html animation is involved, structuring the html in such a way that the flipping animation and card checking logic works.
The other challenge was user inputs, the game struggled is breakable if the user select cards too quickly and allowed users to select more than two cards and since the game logic only ever compares two cards and it created a lot of problems where two cards that arent matched to each other are counted as matched by the game and that in turn created un-winnable states. There were two ways to solve the issue one was to remove the eventlisteners when 2 cards are selected which made cards un-clickable and the other was to do it with in game logic which will yield the same results. In the end it was done with in game logic where the game didn't flip or compare more cards once two cards are selected and it was done with a small time delay.
### Achievements
The game is fully functional and have 4 difficulties: 4 cards, 8 cards, 12 cards and maniac mode. The cards are always randomly shuffled an assigned each time. The game have and card flipping animation when a card is selected, correctly registers when two cards selected are matched and also display a special animation on the cards that are matched. Selected cards are unflipped if they dont match. The time taken and amount of moves are tracked and displayed on screen, when all the cards are matched the game display a victory screen and show the moves and time taken by the player. Sound effects are implemented to give players feedback when things happen on screen the following have sounds effects: card flipped, card matched, selected cards are not matched. Two background theme is implemented, the main background theme plays when the user selected a difficulty and the game starts the other plays on the result screen.
### Future improvements
Replace bootstrap columns with a better structure as it stands the page scales to a certain degree but is not well aligned due to using bootstrap columns, the game could be improved by using flex box so elements collapse better in smaller screens. How cards are placed according to difficulty can be improved upon instead of turning on cards by rows according to difficulty.
More difficulty options and a high scoreboard/rating to provide user with more options and feedback on how well they did in the game.
A shuffle animation screen that shuffle the correct amount of cards according to difficulty, and place them correctly on screen.
A fortune telling mode that is randomize a fortune reading according to how well that the user perform.

### Todos
[x] Allow cards to be flipped
[x] Have a flip animation
[x] Special animation when the selected cards match
[x] cards should be randomly shuffled and placed.
[x] check if flipped cards are matched with each other if yes keep them both flipped if not un-flipp the selected cards
[x] Track how many moves the player have taken to match all cards
[x] Track how much long the player taken to match all cards
[x] The game should end when all the cards are matched.
[x] A score screen to indicate that the player has won and how many moves and time it took the player to complete
[x] Have a button to allow players to replay the game at the score screen
[x] Have multiple difficulty that is selectable by the user.
[x] set up the correct amount of cards on screen according to the difficulty that is selected
[x] Have a background sound track
[x] Have a score screen sound track
[x] Have a sound track when cards are flipped
[x] Have a sound track when cards are matched
[ ] Have a shuffle animation shown after player selects difficulty and before all the cards are displayed
[x] animated back ground
[ ] animated score screen
[ ] fortune telling at the score screen according to how well the player performed



### License
----

MIT
