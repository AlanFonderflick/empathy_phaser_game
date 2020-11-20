export default class Stage1 extends Phaser.Scene {

  /**
   *  Game scene containing the main game logic
   *  @extends Phaser.Scene
   */
  constructor() {
    super('game');
  }

  preload() {
    this.load.image('logo', './src/assets/logo.png');
  }


  createRandomPeople(){
    this.randomPeople = this.add.group();
    this.randomPeople.enableBody = true;

    for (let i = 0; i < 7; i++)
    {
      let randomX = Math.random()*500;
      let randomY = Math.random()*500;
      let s = this.randomPeople.create(randomX, randomY, 'baddie');
      this.physics.world.enable(s, Phaser.Physics.ARCADE);

      s.name = 'alien' + s;
      s.body.collideWorldBounds = true;
      s.body.bounce.setTo(1, 1);
      s.body.velocity.x = 10 + Math.random() * 100
      s.body.velocity.y = 10 + Math.random() * 100;
      s.body.debugBodyColor = 0xff0000;
      s.body.mass = 1
    }
  }

  createGhost(){
    this.ghost = this.add.sprite(400, 300, 'ghost');
    this.ghost.name = 'ghost';

    this.physics.world.enable(this.ghost, Phaser.Physics.ARCADE);

    this.ghost.body.collideWorldBounds = true;
    this.ghost.body.bounce.set(0.8);
    this.ghost.body.allowRotation = true;
    this.ghost.body.immovable = false;
    this.ghost.body.debugBodyColor = 0xffffff;
    this.ghost.body.mass = .1
    this.ghost.body.useDamping = true;
    this.ghost.body.setAllowDrag()
    this.ghost.setDrag = .95;

  }

  createBall(){
    this.ball = this.add.sprite(500, 300, 'car');
    this.ball.name = 'ball';

    this.physics.world.enable(this.ball, Phaser.Physics.ARCADE);

    this.ball.body.collideWorldBounds = true;
    this.ball.body.bounce.set(0.8);
    this.ball.body.allowRotation = true;
    this.ball.body.immovable = false;
    this.ball.body.debugBodyColor = 0xff00ff;
    this.ball.body.useDamping = true;
    this.ball.setDrag = .97;
  }

  setBallAcceleration(){
    console.log(this.isRushing)
    let accelerationFactor = this.isRushing ? 2 : 0.6;
    this.ball.body.velocity.x = (this.ghost.x-this.ball.x-10)*accelerationFactor;
    this.ball.body.velocity.y = (this.ghost.y-this.ball.y)*accelerationFactor;
  }

  create() {

    this.createRandomPeople();
    this.createGhost();
    this.createBall();

    this.physics.add.collider(this.randomPeople, this.randomPeople);
    this.physics.add.collider(this.ghost, this.randomPeople);
    this.cursors = this.input.keyboard.createCursorKeys();

  }

  update(){
    this.isRushing = false;
    this.ghost.body.velocity.x = 0;
    this.ghost.body.velocity.y = 0;
    this.ghost.body.angularVelocity = 0;

    if (this.cursors.left.isDown)
    {
      this.ghost.body.angularVelocity = -250;
    }
    else if (this.cursors.right.isDown)
    {
      this.ghost.body.angularVelocity = 250;
    }

    if (this.cursors.up.isDown)
    {
      this.ghost.body.velocity = this.physics.velocityFromAngle(this.ghost.angle, 200);
      //this.physics.accelerateTo(this.ball, this.ghost.x -20, this.ghost.y, 20, 200, 200);

    }

    if (this.cursors.space.isDown)
    {
      this.isRushing = true;
    }

    this.setBallAcceleration();

  }


}
