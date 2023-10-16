let shootTime = 0;
let shellType = 1;
let level = 1;
const tileSize = 57.5;
let shellScale = 0.7;
let gameHeight = 0;
let sock;
let startPoint;

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
                y: 1000,
            }
        }
    },
    scene: [Level1,Level1settlement,]
};

let game = new Phaser.Game(config);