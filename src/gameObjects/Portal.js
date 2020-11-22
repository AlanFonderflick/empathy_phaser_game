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

  explode(){
    this.emitter = this.scene.particles.createEmitter({
        frame: [ 'yellow' ],
        x: this.sprite.body.position.x,
        y: this.sprite.body.position.y,
        speed: { min: -800, max: 800 },
        angle: { min: 0, max: 360 },
        lifespan: 2000,
        scale: 0.2,
        frequency: -1,
        blendMode: 'ADD',
    });
    this.emitter.explode(10);
  }

  purgeFeeling(){
    if(this.scene.ball.sprite.isFat){
      this.scene.ball.makeThin();
      this.scene.increaseScore();
      this.explode();
    }
  }

  preUpdate(){

  }

}
