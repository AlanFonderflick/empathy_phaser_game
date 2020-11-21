import Phaser from 'phaser'

export default class ball extends Phaser.GameObjects.GameObject {

  /**
   * Character group with different sprite parts
   */
  constructor(scene, x, y, frame) {
    super(scene, x, y);
    this.scene = scene;
    this.sprite = this.scene.add.sprite(0, 0, 'car');
    this.sprite.name = 'ball';

    this.scene.physics.world.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.set(0.8);
    this.sprite.body.allowRotation = true;
    this.sprite.body.immovable = false;
    this.sprite.body.debugBodyColor = 0xff00ff;
    this.sprite.body.useDamping = true;
    this.sprite.setDrag = .97;

    this.sprite.isFat = false;
    this.sprite.chargedPerson = null;

    this.isRushing = false;
    this.scene.add.existing(this);
  }

  setBallAcceleration(){
    let accelerationFactor = this.isRushing ? 2 : 0.6;
    this.sprite.body.velocity.x = (this.scene.ghost.sprite.x-this.sprite.x-10)*accelerationFactor;
    this.sprite.body.velocity.y = (this.scene.ghost.sprite.y-this.sprite.y)*accelerationFactor;
  }

  makeThin(){
    this.sprite.isFat = false;
    this.sprite.chargedPerson = null;
  }
  makeFat(person){
    this.sprite.isFat = true;
    this.sprite.chargedPerson = person.parent;
  }

  looseFeeling(){
    if(this.sprite.isFat){
      this.sprite.chargedPerson.recharge();
      this.makeThin();
    }
  }

  preUpdate(){
    this.isRushing = false;


    if (this.scene.cursors.space.isDown)
    {
      this.isRushing = true;
    }

    if(this.sprite.isFat){
      this.sprite.displayWidth = 60;
      this.sprite.displayHeight = 60;
    }
    else {
      this.sprite.displayWidth = 30;
      this.sprite.displayHeight = 30;
    }

    this.setBallAcceleration();
  }

}
