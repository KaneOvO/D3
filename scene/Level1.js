class Level1 extends Base {

    constructor() {
        super("Level1");
    }

    onEnter() 
    {
        this.target_num = 2;
        
        this.targetgroup.create(this.w * 0.8, this.h * 0.3).setScale(1.5).setGravity(0, -200);
        this.targetgroup.create(this.w * 0.5, this.h * 0.8).setScale(1.5).setGravity(0, -200);

        let intro = this.add.text(this.w * 0.5, this.h * 0.1, `Mouse move to control the direction of the turret, click the left mouse button to fire the shells.

Shells hitting the target will destroy the target, destroy all the targets in the scene to enter the next level
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
