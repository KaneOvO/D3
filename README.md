# D3

Where to play my game?

https://kaneovo.github.io/D3/

How my design satisfies the experience requirements below

1.The game uses both continuous and discrete inputs from the player

continuous input:The game changes the direction of the turret every time the player moves the mouse and it is updated in real time.
discrete input: When the player presses the left mouse button, the turret will fire a cannonball. When the player presses the number key 1, it will switch to shell type 1, and when the player presses the number key 2, it will switch to shell type 2.

2.The player’s goal can only be achieved indirectly (by allowing the physics engine to move key objects into position/contact).

The main goal of the game is to hit all the targets in the scene, this can only be achieved by clicking the left mouse button at the right angle and timing to fire the shells to hit the targets.

3.3+ physics-based gameplay scenes (possibly implemented with a single Phaser Scene subclass).

There is a base class in the game base, in which I implement all the physics groups and the physics interaction logic between them.
There are also three level classes level1-3, which inherit from the base class and represent each of the three levels in the game. 
I implement only their unique scene layout in these three level classes, without any interaction logic.


4.Other scenes are used to separate and contextualize the gameplay scenes

There is a base class settlement in the game, in which I implement the settlement at the end of all levels.
There are also three level classes levelsettlement1-3, which inherit from the settlement class and represent the settlement scenario after each of the three levels in the game, with some modifications according to the progress of the game.

Credit:

Art Source:

snowball.png: Made by alf0186

https://opengameart.org/content/snowball-pixel-art

RainbowBall.png: Made by BananaOwl

https://opengameart.org/content/rainbow-ball

target.png: Made by Kyzerole

https://opengameart.org/content/target

tile.png: Made by telles0808

https://www.deviantart.com/telles0808/art/RPG-Maker-RTP-Tileset-159218223
