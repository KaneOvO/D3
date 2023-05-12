class Level3 extends Base {

    constructor() {
        super("Level3");
    }

    onEnter() 
    {
        this.target_num = 2;
        this.showtitle(1);

        this.targetgroup.create(this.w * 0.8, this.h * 0.3).setScale(1.5).body.setAllowGravity(false);
        this.targetgroup.create(this.w * 0.5, this.h * 0.3).setScale(1.5).body.setAllowGravity(false);
        
        
    }

    update()
    {
        this.finish(this.target_num, 1);
    }

    

}