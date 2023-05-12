class Level3 extends Base {

    constructor() {
        super("Level3");
    }

    onEnter() 
    {
        this.target_num = 5;

        for(let i = 0; i < this.h * 0.3 ; i += tileSize)
        {
            let bar = this.bargroup.create(this.w * 0.6, i).setScale(0.5).setGravity(0, -200);
            bar.body.immovable = true;
        }

        for(let i = this.h; i > this.h * 0.7 ; i -= tileSize)
        {
            let bar = this.bargroup.create(this.w * 0.8, i).setScale(0.5).setGravity(0, -200);
            bar.body.immovable = true;
        }

        for(let i = this.h; i > this.h * 0.7 ; i -= tileSize)
        {
            let bar = this.bargroup.create(this.w * 0.4, i).setScale(0.5).setGravity(0, -200);
            bar.body.immovable = true;
        }
        

        this.targetgroup.create(this.w * 0.7, this.h * 0.95).setScale(1.5).body.setGravity(0, -200);
        this.targetgroup.create(this.w * 0.9, this.h * 0.95).setScale(1.5).body.setGravity(0, -200);

        let movetarget1 = this.targetgroup.create(this.w * 0.9, this.h * 0.2).setScale(1.5).body.setGravity(0, -200);
        this.move(movetarget1, 0.8);




        
        
    }

    update()
    {
        this.finish(this.target_num);
    }

    

}