import Phaser from 'phaser'

export default class Portal extends Phaser.GameObjects.GameObject {

  /**
   * Character group with different sprite parts
   */
  constructor(scene, x, y, frame) {
    super(scene, x, y);
    this.scene = scene;
    this.sprite = this.scene.add.sprite(x, y, 'baddie');
    this.sprite.name = 'badPeople';
    this.scene.physics.world.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.displayWidth = 100;
    this.sprite.displayHeight = 100;
    this.sprite.name = 'portal';
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.debugBodyColor = 0x0f0f00;
    this.scene.physics.add.overlap(this.scene.ball.sprite, this.sprite, this.purgeFeeling, null, this);

    this.scene.add.existing(this);

  }

  purgeFeeling(){
    console.log('purge')
    if(this.scene.ball.sprite.isFat){      
      this.scene.ball.makeThin();
      this.scene.increaseScore();
    }
  }

  preUpdate(){

  }

}
