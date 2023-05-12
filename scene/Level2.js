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
    }

    update()
    {
        this.finish(this.target_num);
    }

    

}