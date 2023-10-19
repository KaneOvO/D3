class Base extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {
    this.load.image("tile", "assets/tile.png");
    this.load.image('wind', 'assets/wind.png');
    this.load.image('sock', 'assets/Sock.png');
    this.load.image('sock2', 'assets/Sock2.png');
    this.load.image('blackSock', 'assets/BlackSock.png');
    this.load.image('bg', 'assets/BG.jpg');
    this.load.spritesheet('myGif', 'assets/idle.png', {
        frameWidth: 384,
        frameHeight: 480,
    });
  }

  create() {
    this.transitionDuration = 1000;

    gameHeight = this.game.config.height;
    this.w = this.game.config.width;
    this.h = this.game.config.height;
    this.s = this.game.config.width * 0.01;

    this.cameras.main.setBackgroundColor("#000");
    this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

    hitText = this.add.text(16, 16, `Current Hit Time: ${hitCount}`);
    this.showtitle();

    this.targetgroup = this.creatTarget();
    this.targetgroup2 = this.creatTarget2();
    this.shellgroup = this.creatshell();
    this.bargroup = this.creatbarrier();

    this.windgroup = this.createWind();

    

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

    sock = this.physics.add.sprite(startPoint.x, startPoint.y, "sock");
    sock.setCollideWorldBounds(true);
    sock.scale = 0.3;
    sock.setDepth(2);

    this.time.addEvent({
      delay: 10,
      callback: () => {
        if (sock.y >= gameHeight - 50) {
          sock.x = startPoint.x;
          sock.y = startPoint.y;
          sock.body.allowGravity = false;
          sock.setVelocity(0, 0);
          sock.setInteractive();
        }
      },
      callbackScope: this,
      loop: true,
    });

    //Create Gif Sprite
    this.anims.create({
        key: 'playGif',
        frames: this.anims.generateFrameNumbers('myGif', { start: 0, end: 15 - 1 }),
        frameRate: 10,
        repeat: -1
    });

    let gifSprite = this.add.sprite(this.w * 0.1, this.h * 0.9, 'myGif');
    gifSprite.setScale(-0.4,0.4);
    gifSprite.play('playGif');

    sock.setInteractive();
    this.input.setDraggable(sock);
    sock.body.allowGravity = false;

    sock.on("dragstart", function (pointer) {
      isDragging = true;
    });

    sock.on("drag", function (pointer) {
      let dragDistance = Phaser.Math.Distance.Between(
        startPoint.x,
        startPoint.y,
        pointer.x,
        pointer.y
      );

      if (dragDistance > maxDragDistance) {
        dragDistance = maxDragDistance;
      }

      let angle = Phaser.Math.Angle.Between(
        pointer.x,
        pointer.y,
        startPoint.x,
        startPoint.y
      );

      sock.x = startPoint.x - Math.cos(angle) * dragDistance;
      sock.y = startPoint.y - Math.sin(angle) * dragDistance;
    });

    sock.on("dragend", function (pointer) {
      if (isDragging) {
        sock.body.allowGravity = true;
        let force = -15;
        const velocityX = (sock.x - startPoint.x) * force;
        const velocityY = (sock.y - startPoint.y) * force;
        sock.setVelocity(velocityX, velocityY);
        sock.disableInteractive();

        isDragging = false;
      }
    });

    this.startoverlap(
      this.shellgroup,
      this.targetgroup,
      this.bargroup,
      this.windgroup,
      this.targetgroup2
    );

    this.onEnter();
  }

  onEnter() {}

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
      yoyo: true,
    });
  }

  creatshell() {
    let shellgroup = this.physics.add.group({
      defaultKey: "shell",
      collideWorldBounds: false,
    });

    return shellgroup;
  }

  creatbarrier() {
    let bargroup = this.physics.add.group({
      defaultKey: "tile",
      collideWorldBounds: true,
    });

    return bargroup;
  }

  creatTarget() {
    let targetgroup = this.physics.add.group({
      defaultKey: "sock2",
      collideWorldBounds: true,
      allowGravity: false,
      setOrigin:0.5,
    });

    return targetgroup;
  }

  creatTarget2() {
    let targetgroup = this.physics.add.group({
      defaultKey: "blackSock",
      collideWorldBounds: true,
      allowGravity: false,
      setOrigin:0.5,
    });

    return targetgroup;
  }

  createWind() {
    this.wind = this.physics.add.group({
      defaultKey: "wind",
      collideWorldBounds: false,
      velocityY: -200,
      gravityY: -1000,
    });

    this.time.addEvent({
      delay: 100,
      callback: () => {
        this.wind.velocityY -= 15;
      },
      callbackScope: this,
      loop: true,
    });

    return this.wind;
  }

  sockOverlapWind(shell) {
    //add a force to sock
    shell.setVelocityY(-700);
  }

  overlap(shell, target) {
    target.disableBody(true, true);
    shell.setScale(shell.scale * 1.5)
    this.target_num--;
    hitCount++;
    hitText.setText(`Current Hit Time: ${hitCount}`)
  }

  overlap3(shell, target) {
    target.disableBody(true, true);
    shell.setScale(shell.scale * 0.7)
    this.target_num--;
    hitCount++;
    hitText.setText(`Current Hit Time: ${hitCount}`)
  }

  overlap2(shell, bar) {
    shell.setVelocityX(0);
  }

  startoverlap(shellgroup, targetgroup, bargroup, windgroup,targetgroup2) {
    this.physics.add.overlap(sock, targetgroup, this.overlap, null, this);
    this.physics.add.overlap(sock, targetgroup2, this.overlap3, null, this);
    this.physics.add.overlap(sock, bargroup, this.overlap2, null, this);
    this.physics.add.overlap(sock, bargroup, this.overlap2, null, this);
    this.physics.add.overlap(
      sock,
      windgroup,
      this.sockOverlapWind,
      null,
      this
    );
    this.physics.add.overlap(sock, windgroup, this.sockOverlapWind, null, this);
  }

  showtitle() {
    this.title = this.add.text(this.w / 2, 30, "Demo" + level, {
      font: "28px Arial",
      color: "#ffffff",
    });
    this.title.setOrigin(0.5);
    this.title.setDepth(2);
  }

  finish(target_num) {}

  move(sprite1, movex) {
    this.tweens.add({
      targets: sprite1,
      x: movex,
      ease: "Linear",
      duration: 3000,
      yoyo: true,
      repeat: -1,
    });
  }

  update() {}
}
