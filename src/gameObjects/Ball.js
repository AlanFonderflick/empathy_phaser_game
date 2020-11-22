import Phaser from 'phaser';
import HealthBar from './HealthBar'

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
    this.bar = new HealthBar(scene, this.sprite.body.position.x+20, this.sprite.body.position.y+40);


    this.makeBounce();

    this.emitter = this.scene.particles.createEmitter({
        frame: [ 'blue' ],
        x: this.sprite.body.position.x+20,
        y: this.sprite.body.position.y+20,
        speed: { min: 5, max: 10 },
        lifespan: { min: 500, max: 700 },
        scale: 0.2,
        frequency: -1,
        blendMode: 'ADD',
    });
    this.emitter.startFollow(this.sprite)
    this.isRushing = false;
    this.isReloading = false;
    this.scene.add.existing(this);
  }

  setBallAcceleration(){
    let accelerationFactor = this.isRushing ? 2 : 0.6;
    let distanceWithGhost = Math.abs((this.scene.ghost.getAbsoluteX()-this.sprite.x)-((this.scene.ghost.getAbsoluteY()-this.sprite.y)));
    let ghostTarget = this.scene.ghost.img.flipX ? 130 : 0;
    let targetOffset = distanceWithGhost > 50 ? 30 : -60+ghostTarget;
    this.sprite.body.velocity.x = (this.scene.ghost.getAbsoluteX()-this.sprite.x-targetOffset)*accelerationFactor;
    this.sprite.body.velocity.y = (this.scene.ghost.getAbsoluteY()-this.sprite.y)*accelerationFactor;
  }

  makeThin(){
    this.makeBounce();
    this.sprite.isFat = false;
    this.sprite.chargedPerson = null;
  }
  makeFat(person){
    this.makeBounce();
    this.sprite.isFat = true;
    this.sprite.chargedPerson = person.parent;
  }

  makeBounce(){
    if(this.tween){
      this.tween.remove();
    }
    this.tween = this.scene.tweens.add({
      targets     : this.sprite,
      scale       : 1.1,
      ease        : 'Quad',
      yoyo        : true,
      duration    : 600,
      repeat      : -1
    });
  }

  looseFeeling(){
    this.makeBounce();
    if(this.sprite.isFat){
      this.sprite.chargedPerson.recharge();
      this.makeThin();
    }
  }

  decreaseBar(){
    if(this.bar.value > 0){
      this.bar.decrease(1);
    }
    if(this.bar.value < 1){
      this.isReloading = true;
    }
  }
  increaseBar(){
    if(this.bar.value < 100){
      this.bar.increase(.5);
    }
    if(this.bar.value < 100 && this.isReloading){
      this.bar.increase(1.5);
    }
    if(this.bar.value == 100 && this.isReloading){
      this.isReloading = false;
    }
  }

  preUpdate(){
    //Display bar
    this.bar.x = this.sprite.x-23;
    this.bar.y = this.sprite.y+28;
    this.bar.draw();

    this.isRushing = false;
    if (this.scene.cursors.space.isDown && this.bar.value > 1 && !this.isReloading)
    {
      this.isRushing = true;
      this.decreaseBar();
    } else {
      this.increaseBar();
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

    if(this.isRushing){
      this.emitter.frequency = 10;
    } else {
      this.emitter.frequency = -1;

    }
  }

}
