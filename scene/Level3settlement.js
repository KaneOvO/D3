class Level3settlement extends BaseSettlement{

    constructor() {
        super('Level3settlement');
    }

    onEnter()
    {

        this.text4.setVisible(false);

        this.text5 = this.add.text(this.w * 0.5, this.h * 0.85, 'Thank you for you playing',
            {
                font: "100px Arial",
                color: "#ffffff",    
        });
        this.text5.setOrigin(0.5);

        

        
    }
}