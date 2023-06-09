class Base extends Phaser.Scene {

    constructor(key) {
        super(key);
    }

    preload()
    {
        this.load.image('shell1', 'assets/snowball.png')
        this.load.image('shell2', 'assets/RainbowBall.png')
        this.load.image('target', 'assets/target.png')
        this.load.image('tile', 'assets/tile.png')
    }

    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#000');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        shootTime = 0;
        shellType = 1;

        this.text =  this.add.text(16, 16, 'Number of shots: 0');
        this.showtitle();

        this.shelltype1 = this.add.image(this.w * 0.1 , this.h * 0.87, 'shell1').setDepth(2).setScale(3);
        this.shelltype2 = this.add.image(this.w * 0.1 , this.h * 0.87, 'shell2').setDepth(2).setScale(0.15).setVisible(false);;


        this.tureentBody = this.add.rectangle(this.w * 0.1 , this.h * 0.87, 150, 250, 0xffffff);
        this.tureentHead1 = this.add.circle(0,  0, 75, 0xffffff);
        this.tureentHead2 = this.add.rectangle(105 , 0, 50, 25, 0xffffff);

        this.turrent = this.add.container(this.w * 0.1, this.h * 0.68);
        this.turrent.add(this.tureentHead1);
        this.turrent.add(this.tureentHead2);

        this.targetgroup = this.creatTarget();
        this.shell1group = this.creatShell1();
        this.shell2group = this.creatShell2();
        this.bargroup = this.creatbarrier();

        this.target_num;

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
                //let shell1 = this.creatShell(shellType);
                let shell1 = this.shell1group.create(0, 0).setScale(0.7);
                shell1.enableBody(true, this.turrent.x, this.turrent.y, true, true);
                shell1.setGravity(0, -200);
                this.physics.velocityFromRotation(angle, 700, shell1.body.velocity);              
                shootTime++;
                this.text.setText('Number of shots: ' + shootTime);
            }
            else if(shellType == 2)
            {
                //let shell2 = this.creatShell(shellType);
                let shell2 = this.shell2group.create(0, 0).setScale(0.03);
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

        this.startoverlap(this.shell1group, this.shell2group, this.targetgroup, this.bargroup)

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

    creatShell1()
    {
        let shell1group = this.physics.add.group(
        {
                defaultKey: 'shell1',
                collideWorldBounds: false
                
        });

        return shell1group
    }

    creatbarrier()
    {
        let bargroup = this.physics.add.group(
            {
                    defaultKey: 'tile',
                    collideWorldBounds: true
                    
            });
    
            return bargroup
    }

    creatShell2()
    {
        let shell2group = this.physics.add.group(
        {
                defaultKey: 'shell2',
                collideWorldBounds: false
                
        });

        return shell2group
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

    overlap (shell, target)
    {
        shell.disableBody(true, true);
        target.disableBody(true, true);
        this.target_num--;
    }

    overlap2(shell, bar)
    {
        shell.disableBody(true, true);
    }

    startoverlap(shell1group, shell2group, targetgroup,bargroup)
    {
        this.physics.add.overlap(shell1group, targetgroup, this.overlap, null, this);
        this.physics.add.overlap(shell2group, targetgroup, this.overlap, null, this); 
        this.physics.add.overlap(shell1group, bargroup, this.overlap2, null, this);
        this.physics.add.overlap(shell2group, bargroup, this.overlap2, null, this);
    }

    showtitle()
    {
        this.title = this.add.text(this.w / 2, 30, 'Level ' + level,
        {
            font: "28px Arial",
            color: "#ffffff",    
        });
        this.title.setOrigin(0.5);
        this.title.setDepth(2);
    }

    finish(target_num)
    {
        if(target_num < 1)
        {
            this.gotoScene('Level'+ level + 'settlement')
        }
    }

    move(sprite1, movex)
    {
        this.tweens.add({
            targets: sprite1,
            x: movex,
            ease: 'Linear',
            duration: 3000,
            yoyo: true,
            repeat: -1
          });
    }
    


    update()
    {
        
    }

}
