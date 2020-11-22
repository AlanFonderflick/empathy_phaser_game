import Phaser from 'phaser'
import Arrow from './arrow'
export default class Ghost extends Phaser.GameObjects.GameObject {

  /**
   * Character group with different sprite parts
   */
  constructor(scene, x, y, frame) {
    super(scene, x, y);
    this.scene = scene;
    this.sprite = this.scene.add.sprite(0, 0);
    this.img = this.scene.add.sprite(0, 0, 'ghost');
    this.sprite.name = 'ghost';
    this.setDrag = .97;
    this.scene.physics.world.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.set(0.8);
    this.sprite.body.allowRotation = true;
    this.sprite.body.immovable = false;
    this.sprite.body.mass = 1
    this.sprite.body.useDamping = true;
    this.sprite.body.setAllowDrag();
    this.sprite.angle = 90;
    this.sprite.displayHeight = 48;
    this.arrow = new Arrow(scene, 20, 0);
    this.container = this.scene.add.container(x, y, [this.sprite]);

    this.scene.add.existing(this);
    this.imgOffsetY = 0;
    this.incrementor = +1;
    this.sprite.setDepth(10);

    this.emitter = this.scene.particles.createEmitter({
        frame: [ 'yellow' ],
        x: this.sprite.body.position.x+20,
        y: this.sprite.body.position.y+20,
        speed: { min: -800, max: 800 },
        angle: { min: 0, max: 360 },
        lifespan: { min: 500, max: 700 },
        scale: 0.2,
        frequency: -1,
        blendMode: 'ADD',
    });
    this.emitter.startFollow(this.sprite)
  }

  makeOffsetY(){
    if(this.imgOffsetY > 4){
      this.incrementor = -0.2;
    }
    else if(this.imgOffsetY < -5){
      this.incrementor = +0.2;
    }
    this.imgOffsetY += this.incrementor;
  }

  getAbsoluteX(){
    return this.sprite.body.position.x+22;
  }

  getAbsoluteY(){
    return this.sprite.body.position.y+20;
  }

  makeRotation(isReversed){
    let value = 4.160;
    let angle = isReversed ? -value : value;
    this.arrow.sprite.angle += angle;
  }

  fixImageToSprite(){
    this.makeOffsetY();
    this.img.x = this.getAbsoluteX();
    this.img.y = this.getAbsoluteY()+this.imgOffsetY;
  }

  preUpdate(){
    this.fixImageToSprite();

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    this.sprite.body.angularVelocity = 0;

    if (this.scene.cursors.left.isDown)
    {
      this.sprite.body.angularVelocity = -250
      this.makeRotation(true);

    }
    else if (this.scene.cursors.right.isDown)
    {
      this.sprite.body.angularVelocity = 250;
      this.makeRotation();
    }

    if(this.sprite.angle < 90 && this.sprite.angle > -90){
      this.img.flipX = true;
    }
    else {
      this.img.flipX = false;
    }

    if (this.scene.cursors.up.isDown)
    {
      this.sprite.body.velocity = this.scene.physics.velocityFromAngle(this.sprite.angle, 200);
      //this.physics.accelerateTo(this.ball, this.x -20, this.y, 20, 200, 200);
    }
  }

}
