class Level2 extends Base {

    constructor() {
        super("Level2");
    }

    onEnter() 
    {
        this.target_num = 2;
        

        
        
    }

    update()
    {
        this.finish(this.target_num);
    }

    

}