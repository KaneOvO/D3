let shootTime = 0;
let shellType = 1;
let level = 1;

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
    scene: [Level1settlement] 
};

let game = new Phaser.Game(config);