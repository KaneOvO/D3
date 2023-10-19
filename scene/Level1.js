class Level1 extends Base {
  constructor() {
    super("Demo");
  }

  onEnter() {
    this.target_num = 2;

    this.targetgroup
      .create(this.w * 0.8, this.h * 0.3)
      .setGravity(0, -200);
    this.targetgroup
      .create(this.w * 0.5, this.h * 0.8)
      .setGravity(0, -200);

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
