let shootTime = 0;
let shellType = 1;
let level = 1;
const tileSize = 57.5;

let config = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 200
            }
        }
    },
    //scene: [Level1,Level1settlement,Level2,Level2settlement,Level3,Level3settlement]
    scene: [Level3] 
};

let game = new Phaser.Game(config);