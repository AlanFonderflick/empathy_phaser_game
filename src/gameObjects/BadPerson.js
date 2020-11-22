import Phaser from 'phaser'

export default class BadPerson extends Phaser.GameObjects.GameObject {

  /**
   * Character group with different sprite parts
   */
  constructor(scene, x, y, frame) {
    super(scene, x, y);
    this.scene = scene;
    this.sprite = this.scene.add.sprite(x, y, 'ghost');
    this.sprite.name = 'badPeople';
    this.scene.physics.world.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.name = 'alien';
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(1, 1);
    this.sprite.body.velocity.x = 10 + Math.random() * 100
    this.sprite.body.velocity.y = 10 + Math.random() * 100;
    this.sprite.body.debugBodyColor = 0xff0000;
    this.sprite.body.mass = 1;
    this.sprite.setTint(0xff00ff)
    this.sprite.scale = .5;

    this.scene.add.existing(this);

    //this.scene.physics.add.collider(this.sprite, this.finePeople);
    this.scene.physics.add.collider(this.scene.ghost.sprite, this.sprite);

  }

  kill(){
    this.sprite.destroy(true);
    console.log('@@@@@killed')
    this.sprite = null;
    this.destroy(true);
  }

  preUpdate(){

  }

}
