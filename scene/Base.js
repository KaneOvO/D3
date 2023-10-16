

class Base extends Phaser.Scene {

    constructor(key) {
        super(key);
    }

    preload() {
        this.load.image('shell', 'assets/snowball.png')
        this.load.image('target', 'assets/target.png')
        this.load.image('tile', 'assets/tile.png')
        this.load.image('wind', 'assets/wind.png')
    }

    create() {
        this.transitionDuration = 1000;

        gameHeight = this.game.config.height;
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#000');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        shootTime = 0;
        shellType = 1;

        this.text = this.add.text(16, 16, 'Number of shots: 0');
        this.showtitle();

        this.shelltype = this.add.image(this.w * 0.1, this.h * 0.87, 'shell').setDepth(2).setScale(3);

        this.targetgroup = this.creatTarget();
        this.shellgroup = this.creatshell();
        this.bargroup = this.creatbarrier();

        this.windgroup = this.createWind();

        this.wind1 = this.windgroup.create(this.w * 0.5, this.h);
        this.wind1.setScale(0.5, 0.4);
        this.wind1.setSize(100, 250);

        this.time.addEvent({
            delay: 10,
            callback: () => {
                this.windgroup.children.iterate(function (child) {
                    child.body.velocity.y -= 5;
                    if (child.y <= 0) {
                        child.y = gameHeight;
                        child.body.velocity.y = -200;
                    }
                });
            },
            callbackScope: this,
            loop: true,
        });


        this.target_num;

        let angle = 0;
        let isDragging = false;
        startPoint = { x: this.w * 0.1, y: this.h * 0.8 };
        const maxDragDistance = 100;

        sock = this.physics.add.sprite(startPoint.x, startPoint.y, 'shell');
        sock.setCollideWorldBounds(true);

        this.time.addEvent({
            delay: 10,
            callback: () => {
                if (sock.y >= gameHeight - 50) {
                    sock.x = startPoint.x;
                    sock.y = startPoint.y;
                    sock.body.allowGravity = false;
                    sock.setVelocity(0, 0);
                }
            },
            callbackScope: this,
            loop: true,
        });

        sock.setInteractive();
        this.input.setDraggable(sock);
        sock.body.allowGravity = false;

        sock.on('dragstart', function (pointer) {
            isDragging = true;
        });

        sock.on('drag', function (pointer) {
            let dragDistance = Phaser.Math.Distance.Between(startPoint.x, startPoint.y, pointer.x, pointer.y);

            if (dragDistance > maxDragDistance) {
                dragDistance = maxDragDistance;
            }

            let angle = Phaser.Math.Angle.Between(pointer.x, pointer.y, startPoint.x, startPoint.y);

            sock.x = startPoint.x - Math.cos(angle) * dragDistance;
            sock.y = startPoint.y - Math.sin(angle) * dragDistance;
        });

        sock.on('dragend', function (pointer) {
            if (isDragging) {
                sock.body.allowGravity = true;
                let force = -15;
                const velocityX = (sock.x - startPoint.x) * force;
                const velocityY = (sock.y - startPoint.y) * force;
                sock.setVelocity(velocityX, velocityY);

                isDragging = false;
            }
        });


        this.startoverlap(this.shellgroup, this.targetgroup, this.bargroup, this.windgroup);

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
    shakeTween() {
        this.tweens.add({
            targets: this.cameras.main,
            x: "-=5",
            y: "-=5",
            duration: 100,
            repeat: 5,
            yoyo: true
        });
    }

    creatshell() {
        let shellgroup = this.physics.add.group(
            {
                defaultKey: 'shell',
                collideWorldBounds: false

            });

        return shellgroup
    }

    creatbarrier() {
        let bargroup = this.physics.add.group(
            {
                defaultKey: 'tile',
                collideWorldBounds: true

            });

        return bargroup
    }


    creatTarget() {
        let targetgroup = this.physics.add.group(
            {
                defaultKey: 'target',
                collideWorldBounds: true,
                allowGravity: false,
            });



        return targetgroup
    }

    createWind() {
        this.wind = this.physics.add.group({
            defaultKey: 'wind',
            collideWorldBounds: false,
            velocityY: -200,
            gravityY: -1000,
        });

        this.time.addEvent({ delay: 100, callback: () => { this.wind.velocityY -= 15; }, callbackScope: this, loop: true, });

        return this.wind;
    }

    sockOverlapWind(shell) {
        //add a force to sock
        shell.setVelocityY(-500);
    }

    overlap(shell, target) {
        shell.disableBody(true, true);
        target.disableBody(true, true);
        shellScale *= 1.5
        this.target_num--;

    }

    overlap2(shell, bar) {
        shell.disableBody(true, true);
    }

    startoverlap(shellgroup, targetgroup, bargroup, windgroup) {
        this.physics.add.overlap(shellgroup, targetgroup, this.overlap, null, this);
        this.physics.add.overlap(shellgroup, bargroup, this.overlap2, null, this);
        this.physics.add.overlap(shellgroup, windgroup, this.sockOverlapWind, null, this);
    }

    showtitle() {
        this.title = this.add.text(this.w / 2, 30, 'Level ' + level,
            {
                font: "28px Arial",
                color: "#ffffff",
            });
        this.title.setOrigin(0.5);
        this.title.setDepth(2);
    }

    finish(target_num) {
    }

    move(sprite1, movex) {
        this.tweens.add({
            targets: sprite1,
            x: movex,
            ease: 'Linear',
            duration: 3000,
            yoyo: true,
            repeat: -1
        });
    }



    update() { }


}
