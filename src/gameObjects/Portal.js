import Phaser from 'phaser'

export default class Portal extends Phaser.GameObjects.GameObject {

  /**
   * Character group with different sprite parts
   */
  constructor(scene, x, y, frame) {
    super(scene, x, y);
    this.scene = scene;
    this.sprite = this.scene.add.sprite(x, y, 'portal');
    this.sprite.name = 'badPeople';
    this.scene.physics.world.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.displayWidth = 180;
    this.sprite.displayHeight = 207;
    this.sprite.name = 'portal';
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.debugBodyColor = 0x0f0f00;
    this.scene.physics.add.overlap(this.scene.ball.sprite, this.sprite, this.purgeFeeling, null, this);

    this.scene.add.existing(this);
    this.sprite.setDepth(0);

  }

  explode(){
    this.emitter = this.scene.particles.createEmitter({
        frame: [ 'blue' ],
        x: this.sprite.body.position.x+this.sprite.body.width/2,
        y: this.sprite.body.position.y+this.sprite.body.height/2,
        speed: { min: -800, max: 800 },
        angle: { min: 0, max: 360 },
        lifespan: 2000,
        scale: 0.2,
        frequency: -1,
        blendMode: 'ADD',
    });
    this.emitter.explode(30);
  }

  purgeFeeling(){
    if(this.scene.ball.sprite.isFat){
      this.scene.ball.makeThin();
      this.scene.increaseScore();
      this.explode();
    }
  }

  preUpdate(){
    this.sprite.rotation -= 0.01;
  }

}
