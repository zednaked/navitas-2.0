import './style.css'
import Phaser from 'phaser';


class Explosao extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "explosao")
        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.setScale(1)
        this.setVelocityY(0)
        
        this.play('explosao')
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, this.destroi, this);
        this.setGravityY(0)
        
        this.isCircle = true
                      
    }
    destroi(sprite, animation) {
        this.destroy()
    }   
}

class Astedoide extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'astedoide')
        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.setScale(0.8)
        this.setVelocityY(Phaser.Math.Between(100, 200))
        this.setCollideWorldBounds(false)
        this.setBounce(1)
        this.setAngularAcceleration(100)
        this.setGravityY(1000)
        this.setDragY(1000)
        this.isCircle = true
        this.scene.physics.add.collider(this, this.scene.GrupoTiros, this.ColisaoTiros, null, this);
        this.scene.physics.add.collider(this, this.scene.player, this.ColisaoPlayer, null, this);
        this.timedEvent = this.scene.time.addEvent({ delay: 5000, callback: this.destroi, callbackScope: this, loop: false });
     
    }

    
    preUpdate(time, delta) {
        super.preUpdate(time, delta)


     

    }


    ColisaoTiros(sprite, tiro) {
        var desvio = Phaser.Math.Between(-10, 10)
        new Explosao(this.scene, this.x-desvio, this.y+desvio)  
        desvio = Phaser.Math.Between(-10, 10)
        new Explosao(this.scene, this.x+desvio, this.y+desvio)  
        this.destroy();
        tiro.destroy();
    }
    ColisaoPlayer(sprite, player)  {       

        var desvio = Phaser.Math.Between(-10, 10)
        new Explosao(this.scene, this.x-desvio, this.y+desvio)  
        desvio = Phaser.Math.Between(-10, 10)
        new Explosao(this.scene, this.x+desvio, this.y+desvio)  

        this.destroy();

                
    }


    destroi() {
        this.destroy()
    }   
}


class Tiro extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'tiro')
        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.setScale(1)
        this.setVelocityY(-1000)
        this.setCollideWorldBounds(false)
        this.setBounce(0)
        this.setGravityY(-1000)
        this.setDragY(1000)
        
        this.timedEvent = this.scene.time.addEvent({ delay: 500, callback: this.destroi, callbackScope: this, loop: false });
        
    }
    destroi() {
        this.destroy()
    }   

    preUpdate(time, delta) {
        super.preUpdate(time, delta)
        if (this.y < 0) {
            this.destroy()
        }
    }


}

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player')
        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setScale(0.8)
        this.setImmovable(true)
        this.cursor = this.scene.input.keyboard.createCursorKeys()
        this.timedEvent = this.scene.time.addEvent({ delay: 1000, callback: this.atira, callbackScope: this, loop: true });
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta)
       
        
        this.body.setAllowGravity(false)
        this.setDragX(800)
        this.scene.fogo.x = this.x-6
        this.scene.fogo.y = this.y+40
        const { left, right, up, down } = this.cursor;
        if (left.isDown) {
            this.setAccelerationX(-1000);
            this.scene.fogo.scaleY = -0.4
            this.scene.fogo.x = this.x-6
            this.scene.fogo.y = this.y+17
            
            
        } else if (right.isDown) {
            this.setAccelerationX(1000);
            this.scene.fogo.scaleY = -0.4
            this.scene.fogo.x = this.x-6
            this.scene.fogo.y = this.y+17
            
        } else {
            this.setAccelerationX(0);
            this.scene.fogo.scaleY = -1.5
            this.scene.fogo.y = this.y+60
        }
      
        
        

    }
    atira() {
        this.scene.GrupoTiros.add(new Tiro(this.scene, this.x, this.y))
    }
}


  

  class GameScene extends Phaser.Scene {
    constructor() {
      super('scene-game')
      this.player;  
      this.fogo
      this.astedoide;
      this.GrupoAsteroides 
      this.GrupoTiros
      this.AnimExplosao
      this.AnimFogo
      
   
      
    
    }           


    preload() {
        this.load.image('bg1', 'assets/Background/5.png')
        this.load.image('player', 'assets/Ship/3.png')
        this.load.image('astedoide', 'assets/Background/Meteor1.png')
        this.load.image('tiro', 'assets/Shoot/1.png')
        this.load.spritesheet('explosao', 'assets/Fx/Fx1.png', { frameWidth: 38, frameHeight: 38, numberOfFrames: 6 })
        this.load.spritesheet('fogo', 'assets/Fx/Fx6.png', { frameWidth: 12, frameHeight: 28, numberOfFrames: 6 })
    }   
    update() {

       

    }

    create() {
        this.AnimExplosao = this.anims.create({ key: 'explosao', frames: this.anims.generateFrameNumbers('explosao', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })
        this.AnimFogo = this.anims.create({ key: 'fogo', frames: this.anims.generateFrameNumbers('fogo', { start: 0, end: 5 }), frameRate: 10, repeat: -1 })
        this.GrupoAsteroides = new Phaser.GameObjects.Group(this)
        this.GrupoTiros = new Phaser.GameObjects.Group(this)
        this.add.image(0,0, "bg1").setOrigin(0,0)
        this.player = new Player(this, 320, 430)
        this.fogo = this.add.sprite(this.player.x-6, this.player.y+45, 'fogo').setOrigin(0,0)
        this.fogo.play('fogo')
        this.fogo.scaleY = -1

        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.LancaAsteroide, callbackScope: this, loop: true });
    }

    
    LancaAsteroide() {

        this.GrupoAsteroides.add (new Astedoide(this, Phaser.Math.Between(0, 640), 0))

    }
}
const config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    canvas: gameCanvas,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: [GameScene]
  }
const game = new Phaser.Game(config)