class Base extends Phaser.Scene {

    constructor(key) {
        super(key);
    }

    preload()
    {
        this.load.image('shell1', 'assets/snowball.png')
        this.load.image('shell2', 'assets/RainbowBall.png')
        this.load.image('target', 'assets/target.png')
    }

    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#000');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        shootTime = 0;
        this.text =  this.add.text(16, 16, 'Number of shots: 0');
        this.shelltype1 = this.add.image(this.w * 0.1 , this.h * 0.87, 'shell1').setDepth(2).setScale(3);
        this.shelltype2 = this.add.image(this.w * 0.1 , this.h * 0.87, 'shell2').setDepth(2).setScale(0.15).setVisible(false);;
        
        

        this.tureentBody = this.add.rectangle(this.w * 0.1 , this.h * 0.87, 150, 250, 0xffffff);
        // this.tureentBody2 = this.add.circle(this.w * 0.1, this.h * 0.68, 75, 0xffffff);
        // this.tureentHead = this.add.rectangle(this.w * 0.1 , this.h * 0.53, 150, 150, 0xffffff);
        this.tureentHead1 = this.add.circle(0,  0, 75, 0xffffff);//this.w * 0.1, this.h * 0.68
        this.tureentHead2 = this.add.rectangle(105 , 0, 50, 25, 0xffffff);//this.w * 0.16 , this.h * 0.68

        this.turrent = this.add.container(this.w * 0.1, this.h * 0.68);
        this.turrent.add(this.tureentHead1);
        this.turrent.add(this.tureentHead2);

        //this.turrent.setRotation(Phaser.Math.DegToRad(15));
        let targetgroup = this.creatTarget();
        targetgroup.create(this.w * 0.8, this.h * 0.3).setScale(1.5).body.setAllowGravity(false);
        

        let angle = 0;

        this.input.on('pointermove', (pointer) =>
        {
            angle = Phaser.Math.Angle.BetweenPoints(this.turrent, pointer);
            if(angle > Phaser.Math.DegToRad(45) && angle < Phaser.Math.DegToRad(135))
            {
                if(angle < Phaser.Math.DegToRad(90))
                {
                    angle = Phaser.Math.DegToRad(45);
                }
                else
                {
                    angle = Phaser.Math.DegToRad(135);
                }
                
            }
            this.turrent.setRotation(angle);
        });

        this.input.on('pointerup', () =>
        {
            if(shellType == 1)
            {
                let shell1 = this.creatShell(shellType);
                shell1.enableBody(true, this.turrent.x, this.turrent.y, true, true);
                shell1.setGravity(0, -200);
                this.physics.velocityFromRotation(angle, 700, shell1.body.velocity);
                shootTime++;
                this.text.setText('Number of shots: ' + shootTime);
            }
            else if(shellType == 2)
            {
                let shell2 = this.creatShell(shellType);
                shell2.enableBody(true, this.turrent.x, this.turrent.y, true, true);
                shell2.setGravity(0, 500);
                this.physics.velocityFromRotation(angle, 1000, shell2.body.velocity);
                shootTime++;
                this.text.setText('Number of shots: ' + shootTime);
            }

        });

        this.input.keyboard.on('keydown', (event) =>
        {
            if (event.key === '1') 
            {
                shellType = 1;
                this.shelltype1.setVisible(true);
                this.shelltype2.setVisible(false);

            }
            else if(event.key === '2')
            {
                shellType = 2;
                this.shelltype1.setVisible(false);
                this.shelltype2.setVisible(true);
            }

        });

        this.physics.add.overlap(shell, targetgroup, collide, null, this);




        this.onEnter();

    }

    onEnter() {
        
    }

    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key);
        });
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

    creatShell(shellType)
    {
        if(shellType == 1)
        {
            let shell1 = this.physics.add.sprite(0, 0, 'shell1').setScale(0.7);
            shell1.disableBody(true, true);
    
            return shell1
        }
        else if(shellType == 2)
        {
            let shell2 = this.physics.add.sprite(0, 0, 'shell2').setScale(0.03);
            shell2.disableBody(true, true);

            return shell2
        }

    }

    creatTarget()
    {
        let targetgroup = this.physics.add.group(
        {
            defaultKey: 'target',
            collideWorldBounds: true
            
        });

        

        return targetgroup
    }

    update()
    {

    }

}