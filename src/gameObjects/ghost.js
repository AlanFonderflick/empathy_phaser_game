import Phaser from 'phaser'

export default class Ghost extends Phaser.GameObjects.GameObject {

  /**
   * Character group with different sprite parts
   */
  constructor(scene, x, y, frame) {
    super(scene, x, y);
    this.scene = scene;
    this.sprite = this.scene.add.sprite(x, y, 'baddie');
    this.sprite.name = 'ghost';
    this.setDrag = .97;
    this.scene.physics.world.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.set(0.8);
    this.sprite.body.allowRotation = true;
    this.sprite.body.immovable = false;
    this.sprite.body.debugBodyColor = 0xffffff;
    this.sprite.body.mass = 1
    this.sprite.body.useDamping = true;
    this.sprite.body.setAllowDrag()
    this.scene.add.existing(this);
  }

  preUpdate(){
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    this.sprite.body.angularVelocity = 0;

    if (this.scene.cursors.left.isDown)
    {
      this.sprite.body.angularVelocity = -250;
    }
    else if (this.scene.cursors.right.isDown)
    {
      this.sprite.body.angularVelocity = 250;
    }

    if (this.scene.cursors.up.isDown)
    {
      this.sprite.body.velocity = this.scene.physics.velocityFromAngle(this.sprite.angle, 200);
      //this.physics.accelerateTo(this.ball, this.x -20, this.y, 20, 200, 200);
    }
  }

}
