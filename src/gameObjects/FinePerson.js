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
    this.getParticles();
  }

  kill(){
    this.sprite.destroy(true);
    this.sprite = null;
    this.destroy(true);
  }

  getParticles(){
    this.emitter = this.scene.particles.createEmitter({
        frame: [ 'red' ],
        x: this.scene.ball.sprite.body.position.x,
        y: this.scene.ball.sprite.body.position.y,
        speed: { min: -800, max: 800 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.5, end: 0 },
        lifespan: 2000,
        scale: 0.2,
        frequency: -1,
        blendMode: 'ADD',
        moveToX: this.sprite.x,
        moveToY: this.sprite.y,
    });
    this.emitter.explode(10);
  }

  emitParticles(target){
    let scene = this.scene;
    let rectangles = {
        contains: function (x, y)
        {
            var rect1 = new Phaser.Geom.Rectangle(target.sprite.body.x,
              target.sprite.body.y,
              target.sprite.body.width,
              target.sprite.body.height);
            return Phaser.Geom.Rectangle.Contains(rect1, x, y)
        }
    };

    this.emitter = this.scene.particles.createEmitter({
        frame: [ 'red', 'blue' ],
        speed: 10,
        lifespan: 2000,
        scale: 0.2,
        angle: { min: 0, max: 360 },
        frequency: -1,
        blendMode: 'ADD',
        moveToX: this.scene.ball.sprite.x,
        moveToY: this.scene.ball.sprite.y,
        emitZone: { source: new Phaser.Geom.Rectangle(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height) },
        deathZone: { type: 'onEnter', source: rectangles }
    });
    this.emitter.explode(10);
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
