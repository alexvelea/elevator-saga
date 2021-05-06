# Code for elevatorsaga game.
Try out the game [here](https://play.elevatorsaga.com/).

### Level 2&3 strategy

Only stop at required floors, dont go `0..4..0` everytime. When going up, only go stop at the levels where people want to get off or at levels where people want to go up.

### Level 4 strategy

Implement support for 2 elevators which unaware of each other.

### Level 5 strategy

Implement support for 4 elevators which unaware of each other.
Nitpick with how many people an elevator can hold.

### Level 6..10 strategy

Same as lvl 5, but with native support for undefined number of elevators.

### Level 11

Use indicator API & don't move 2 elevators to pick up people from one floor

### Level 12

Make elevators wait at lvl 0 to reduce max-wait time in case of no available tasks