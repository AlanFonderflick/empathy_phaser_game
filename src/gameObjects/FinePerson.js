import Phaser from 'phaser'

export default class FinePerson extends Phaser.GameObjects.GameObject {

  /**
   * Character group with different sprite parts
   */
  constructor(scene, x, y, frame) {
    super(scene, x, y);
    this.scene = scene;
    this.sprite = this.scene.add.sprite(x, y, 'baddie');
    this.sprite.name = 'finePeople';
    this.scene.physics.world.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(0, 0);
    this.sprite.body.immovable = true;
    this.sprite.body.onCollide = true;
    this.sprite.hasFeeling = true;
    this.sprite.parent = this;
    this.scene.add.existing(this);
  }

  recharge(){
    this.sprite.hasFeeling = true;
  }

  kill(){
    this.destroy();
    this.sprite.destroy();
  }

  preUpdate(){
    if(this.sprite.hasFeeling){
      this.sprite.body.debugBodyColor = 0xffff00;
    }
    else {
      this.sprite.body.debugBodyColor = 0x00ffff;
    }
  }

}
