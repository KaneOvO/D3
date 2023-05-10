class BaseScene extends Phaser.Scene {

    constructor(key) {
        super(key);
    }

    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);





    }

    //add a funtion to creat a sprite and set it can be interactive
    addsprite(x, y, name)
    {
        let temp = this.add.sprite(x, y, name); 
        temp.setInteractive();

        return temp;
    }

    //add a functuon to make the scene can be shake
    shakeTween()
    {
        this.tweens.add({
            targets: this.cameras.main,
            x: "-=5",
            y: "-=5",
            duration: 100,
            repeat: 5,
            yoyo: true
          });
    }

    update()
    {

    }

}