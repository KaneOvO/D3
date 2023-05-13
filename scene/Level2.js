class Level2 extends Base {

    constructor() {
        super("Level2");
    }

    onEnter() 
    {
        this.target_num = 2;
        
        for(let i = 0; i < this.h * 0.4 ; i += tileSize)
        {
            let bar = this.bargroup.create(this.w * 0.6, i).setScale(0.5).setGravity(0, -200);
            bar.body.immovable = true;
        }

        for(let i = this.h; i > this.h * 0.6 ; i -= tileSize)
        {
            let bar = this.bargroup.create(this.w * 0.6, i).setScale(0.5).setGravity(0, -200);
            bar.body.immovable = true;
        }

        this.targetgroup.create(this.w * 0.8, this.h * 0.8).setScale(1.5).setGravity(0, -200);

        this.targetgroup.create(this.w * 0.7, this.h * 0.9).setScale(1.5).setGravity(0, -200);

        let intro = this.add.text(this.w * 0.5, this.h * 0.11, `There will be some barriers in the game and the shells cannot penetrate these barriers.

Click the number 2 key to switch to the rainbow shell, this shell has a unique trajectory, use it smartly to get over the barriers.
        
Click the number 1 key to switch back to the snowball shell.
        `,
        {
            font: "24px Arial",
            color: "#ffffff",    
        });
        intro.setOrigin(0.5);
    }

    update()
    {
        this.finish(this.target_num);
    }

    

}