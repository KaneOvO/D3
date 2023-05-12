class BaseSettlement extends Phaser.Scene{

    constructor(key) {
        super(key);
    }

    create()
    {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#000');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        this.input.enabled = true;

        this.text = this.add.text(this.w * 0.5, this.h * 0.2, 'Congratulations!',
        {
            font: "200px Impact",
            color: "#ff9900",    
        });
        this.text.setOrigin(0.5);

        this.text2 = this.add.text(this.w * 0.5, this.h * 0.5, 'Number of shots in this level',
        {
            font: "100px Impact",
            color: "#ff9900",    
        });
        this.text2.setOrigin(0.5);

        this.text3 = this.add.text(this.w * 0.5, this.h * 0.65, shootTime,
        {
            font: "100px Impact",
            color: "#ff9900",    
        });

        this.text4 = this.add.text(this.w * 0.5, this.h * 0.85, 'Click to go to the next level',
            {
                font: "100px Arial",
                color: "#ffffff",    
            });
            this.text4.setOrigin(0.5);
            this.text4.alpha = 0;

            this.animation = this.tweens.add({
                targets: this.text4,
                alpha:1,
                duration: 1500,
                ease: 'Linear',
                yoyo: true,
                repeat:-1,
            });

        this.input.on('pointerup', () =>
        {
            this.input.enabled = false;
            level++;
            if(level < 4)
            {
                this.gotoScene('Level'+ level);
            }
            
        })


        this.onEnter();
    }

    onEnter()
    {
        
    }

    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key);
        });
    }

    
}