import Phaser from 'phaser'
import BadPerson from './BadPerson'

export default class Follower extends BadPerson {

  /**
   * Character group with different sprite parts
   */
  constructor(scene, x, y, path) {
    super(scene, x, y);

    // var startPoint = new Phaser.Math.Vector2(50, 260);
    // var controlPoint1 = new Phaser.Math.Vector2(610, 25);
    // var controlPoint2 = new Phaser.Math.Vector2(320, 370);
    // var endPoint = new Phaser.Math.Vector2(735, 550);
    console.log('-------------------')
    this.myPath = new Phaser.Curves.Path(path.polyline[0].x+path.x, path.polyline[0].y+path.y);
    console.log(path.polyline[0].x+path.x, path.polyline[0].y+path.y)
    for(let i = 1; i<path.polyline.length; i++){
      console.log(path.polyline[i].x+path.x, path.polyline[i].y+path.y)
      this.myPath.lineTo(path.polyline[i].x+path.x, path.polyline[i].y+path.y);
    }

    //var curve = new Phaser.Curves.CubicBezier(startPoint, controlPoint1, controlPoint2, endPoint);

    var graphics = this.scene.add.graphics();

    graphics.lineStyle(1, 0xffffff, 1);
    this.sprite.body.mass = .1
    this.sprite.body.bounce.setTo(3, 3);
    this.sprite.setTint(0x00ff00)
    this.sprite.scale = 1;
    this.follower = this.scene.add.follower(this.myPath, path.polyline[0].x+path.x, path.polyline[0].y+path.y);

    this.follower.startFollow({
        duration: 2500,
        yoyo: true,
        ease: 'Sine.easeInOut',
        repeat: -1
    });

    this.followBall = false;


  }

  isFatBallNear(){
    let distanceToFollow = this.followBall ? 350 : 200;
    let a = this.scene.ball.sprite.body.position.x - this.sprite.body.position.x;
    let b = this.scene.ball.sprite.body.position.y - this.sprite.body.position.y;

    let distance = Math.sqrt( a*a + b*b );
    if(distance  < distanceToFollow
    && this.scene.ball.sprite.isFat == true){
      return true;
    }
    return false;
  }

  checkIfFollowMode(){
    if(this.isFatBallNear()){
      this.followBall = true;
    }
    else {
      this.followBall = false;
    }
  }

  preUpdate(){
    this.checkIfFollowMode();
    if(this.followBall){
      this.sprite.setTint(0xff0000)
      this.scene.physics.moveTo(this.sprite, this.scene.ball.sprite.body.position.x, this.scene.ball.sprite.body.position.y, 150)
    }
    else {
      this.sprite.setTint(0x00ff00)
      this.sprite.body.velocity.x = (this.follower.x-this.sprite.x);
      this.sprite.body.velocity.y = (this.follower.y-this.sprite.y);
    }
  }

}
