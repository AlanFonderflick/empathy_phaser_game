import Phaser from 'phaser'

export default class Ghost {

  /**
   * Character group with different sprite parts
   */
  constructor(scene, x, y, frame) {
    super(scene, x, y);
    scene.add.existing(this)
  }

  create(){
    this.add.sprite(400, 300, 'car');
    this.car.name = 'car';
    //car.anchor.set(0.5);

    this.physics.world.enable(this.car, Phaser.Physics.ARCADE);

    this.car.body.collideWorldBounds = true;
    this.car.body.bounce.set(0.8);
    this.car.body.allowRotation = true;
    this.car.body.immovable = false;
  }

}
