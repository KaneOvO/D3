class Level1 extends Base {

    constructor() {
        super("Level1");
    }

    onEnter() 
    {
        this.targetgroup.create(this.w * 0.8, this.h * 0.3).setScale(1.5).body.setAllowGravity(false);
        this.targetgroup.create(this.w * 0.5, this.h * 0.3).setScale(1.5).body.setAllowGravity(false);
        

        
        
    }

    update()
    {

    }

    

}