class Level2 extends Base {

    constructor() {
        super("Level2");
    }

    onEnter() 
    {
        this.target_num = 2;
        this.showtitle();

        
        
    }

    update()
    {
        this.finish(this.target_num);
    }

    

}