class Level1 extends Base {
  constructor() {
    super("Demo");
  }

  onEnter() {

    this.backgroundImage = this.add.image(0, 0, "bg").setOrigin(0).setDepth(-1);
    let scaleX = this.cameras.main.width / this.backgroundImage.width;
    let scaleY = this.cameras.main.height / this.backgroundImage.height;
    let scale = Math.max(scaleX, scaleY);
    this.backgroundImage.setScale(scale).setScrollFactor(0);

    this.target_num = 2;

    this.targetgroup.create(this.w * 0.8, this.h * 0.35).setGravity(0, -1000);
    this.targetgroup.create(this.w * 0.5, this.h * 0.8).setGravity(0, -1000);

    this.targetgroup2.create(this.w * 0.5, this.h * 0.3).setGravity(0, -1000);

    this.wind1 = this.windgroup.create(this.w * 0.7, this.h);
    this.wind1.setScale(0.5, 0.4);
    this.wind1.setSize(100, 250);

    for (let i = 0; i < this.h * 0.4; i += tileSize) {
      let bar = this.bargroup
        .create(this.w * 0.6, i)
        .setScale(0.5)
        .setGravity(0, -1000);
      bar.body.immovable = true;
    }

    let intro = this.add.text(this.w * 0.5, this.h * 0.1, ``, {
      font: "24px Arial",
      color: "#ffffff",
    });
    intro.setOrigin(0.5);
  }

  update() {
    this.finish(this.target_num);
  }
}
