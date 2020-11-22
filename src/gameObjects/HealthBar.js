import Phaser from 'phaser'

export default class HealthBar extends Phaser.GameObjects.GameObject {

    constructor (scene, x, y, team)
    {
        super(scene)
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 45 / 100;
		    this.color = 0x00ffff ;
        this.draw();
        scene.add.existing(this);

        scene.add.existing(this.bar);
    }

    decrease (amount)
    {
        this.value -= amount;

        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }
    increase (amount)
    {
        this.value += amount;

        if (this.value > 100)
        {
            this.value = 100;
        }

        this.draw();

        return (this.value === 100);
    }

    draw ()
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y+1, 47, 5);

        //  Health

        //   this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 44, 3);

        if (this.value < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else if (this.value == 100){
            this.bar.fillStyle(0xffffff);
        }
        else
        {
            this.bar.fillStyle(this.color);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 1, this.y + 2, d, 3);
    }

}
