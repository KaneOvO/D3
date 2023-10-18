class Level1 extends Base {
  constructor() {
    super("Demo");
    //this.images = [];
    //this.img;
  }

  onEnter() {
    this.target_num = 2;

    this.targetgroup
      .create(this.w * 0.8, this.h * 0.3)
      .setScale(1.5)
      .setGravity(0, -200);
    this.targetgroup
      .create(this.w * 0.5, this.h * 0.8)
      .setScale(1.5)
      .setGravity(0, -200);

    let intro = this.add.text(this.w * 0.5, this.h * 0.1, ``, {
      font: "24px Arial",
      color: "#ffffff",
    });
    intro.setOrigin(0.5);

    //这下面

    //this.spawnImage();
    // Looping event to spawn a new image every second
    // this.time.addEvent({
    //     delay: 3000, // Every 1 second
    //     callback: () => { this.spawnImage; },
    //     callbackScope: this,
    //     loop: true
    // });
  }

  spawnImage() {
    // this.img = this.physics.add.sprite(this.w * 0.5, this.h, 'wind').setScale(0.5);
    // this.img.rotation = Phaser.Math.DegToRad(-90);
    // this.img.setGravityY(-200);
    //console.log(img);
    // this.img.setVelocityY(-300); // Adjust this value to control speed
    //this.images.push(img);
    // this.time.addEvent({ delay: 100, callback: () => { this.img.body.velocity.y -= 15; }, callbackScope: this, loop: true, });
  }

  update() {
    // if (this.img.y <= 0) {
    //     //let img = this.images.shift(); // Remove the oldest image from the array
    //     this.img.body.y = this.h;
    //     this.img.body.velocity.y = -200;
    // }

    this.finish(this.target_num);
  }
}
