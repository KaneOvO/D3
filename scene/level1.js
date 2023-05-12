class Level1 extends Base {

    constructor() {
        super("Level1");
    }

    onEnter() 
    {
        this.target_num = 2;
        

        this.targetgroup.create(this.w * 0.8, this.h * 0.3).setScale(1.5).setGravity(0, -200);
        this.targetgroup.create(this.w * 0.5, this.h * 0.8).setScale(1.5).setGravity(0, -200);


       
        
        
    }

    update()
    {
        this.finish(this.target_num);
    }

    

}