//import './style.css'


//import Phaser from 'phaser';
import { title } from 'process';

const tempoSpawnInimigo = 100; // Reduzindo o tempo de spawn dos inimigos para aumentar a intensidade do jogo
const TempoEntreGruposInimigos = 1200; // Diminuindo o tempo entre grupos de inimigos para manter a ação constante
const TempoEntreWaves = 1500; // Aumentando o tempo entre as waves para permitir momentos de recuperação entre os desafios
const TempodeumaWave = 15000; // Reduzindo o tempo de uma wave para manter a jogabilidade intensa
const tempoTextEntrewaves = 1000; // Reduzindo o tempo entre as waves para manter a jogabilidade intensa


const width = 400
const height = 800

const tiroInimigo1 = {

    dano:1,
    cooldown: 1000,
    nivel: 0,
    nivelmax: 3,
    multiplicador: 0.25,
    frequencia: 1000,
    escala: 0.5,
    velocidadetiro: 1000,
    tempodevida: 1000,
    inimigo: true,
    
    tipo: 'tiro10'
}
const tiroInimigo2 = {
    dano:1,
    cooldown: 1000,
    nivel: 0,
    nivelmax: 3,
    multiplicador: 0.25,
    frequencia: 1000,
    escala: 0.6,
    velocidadetiro: 1000,
    inimigo: true,
    tempodevida: 1000,
    tipo: 'tiro5'
}


const tiroInimigoLentoCurto = {
    ...tiroInimigo1,
    velocidadetiro: 320,
    tempodevida: 2000,
    frequencia: 1400
}

const tiroInimigoNave2 = {
    ...tiroInimigo1,
    velocidadetiro: 600,
    tempodevida: 3000,
    frequencia: 2000

}

const tiroinimigoNave1 = {
    ...tiroInimigo1,
    velocidadetiro: 800,
    tempodevida: 3000,
    frequencia: 1000
}

const enemynave4 = {
            
            maxporgrupo: 2,
            atirador: true,
            life: 2,
            criadude: true,
            segundoMovimento: false,
            EventoMorre: 6000,
            frequenciadetiro: 2000,
            velocidadetiro: 2000,
            PodeMaior: true,
            drop: ['gem2',"gem3"],
            vely: 200,
            score: 3,
            hasThruster: true,
            tipo: 'enemynave4',
            tipoTiro: tiroInimigoNave2
}
const enemynave1 = {
    ...enemynave4,
    life: 1,
    drop: ['gem3','gem4'],
    score: 1,
    hasThruster: true,
    criadude: false,
    tipo: 'enemynave1',
    tipoTiro: tiroInimigoNave2
}

const enemynave2 = {
    ...enemynave4,
    EventoMorre: 4000,
    life: 3,
    drop: ['gem2','gem1'],
    score: 2,
    hasThruster: true,
    criadude: false,
    tipo: 'enemynave2',
    tipoTiro: tiroinimigoNave1

}

const enemynave3 = {
    ...enemynave4,
    life: 4,
    drop: ['gem3','gem1'],
    score: 3,
    tipo: 'enemynave3',
    criadude: false,
    hasThruster: true,
    tipoTiro: tiroinimigoNave1
}

const bebezinho = {
    ...enemynave4,
    maxporgrupo: 2,
    life: 1,
    drop: ['gem1','gem2'],
    vely: 350,
    EventoMorre: 4000,
    hasThruster: false,
    criadude: false,
    tipo: 'bebezinho',
    score: 1,
    tipoTiro: tiroInimigoLentoCurto,
}

const dude = {
    ...enemynave4,
    maxporgrupo: 2,
    EventoMorre: 3000,
    life: 1,
    drop: ['gem1','gem2'],
    score: 1,
    vely: 350,
    criadude: false,
    tipo: 'dude',
    hasThruster: false,
    tipoTiro: tiroInimigoLentoCurto
}


const jelly = {
    ...enemynave4,
    maxporgrupo: 3,
    life: 1,
    drop: ['gem1'],
    EventoMorre: 3000,
    score: 1,
    vely: 450,
    criadude: false,
    tipo: 'jelly',
    tipoTiro: tiroInimigo1,
    hasThruster: false,
    atirador: false
}

const jelly2 = {
    maxporgrupo: 4,
    ...enemynave4,
    life: 1.2,
    drop: ['gem1'],
    EventoMorre: 3000,
    score: 2,
    criadude: false,
    tipo: 'jelly2',
    vely: 400,
    tipoTiro: tiroInimigo1,
    hasThruster: false,
    atirador: false
}

const boss1 = {
    ...enemynave3,
    maxporgrupo: 1,
    life: 10,
    drop: ['gem4'],
    score: 10,
    tipo: 'boss1',
    criadude: true,
    hasThruster: true,
    tipoTiro: tiroInimigo1
}

const boss2 = {
    ...enemynave3,
    maxporgrupo: 1,
    life: 15,
    drop: ['gem5'],
    score: 15,
    tipo: 'boss2',
    hasThruster: true,
    tipoTiro: tiroInimigo1
}

const boss3 = {
    ...enemynave3,
    maxporgrupo: 1,
    life: 10,
    drop: ['gem6'],
    score: 20,
    tipo: 'boss3',
    hasThruster: true,
    tipoTiro: tiroInimigo1
}

const tiroP = {
            nome:'Devastador',
            descricao: 'Tiro devastador, mas lento',
            icone: 'powerup1',
            dano:1.5,
            nivel: 0,
            nivelmax: 3,
            multiplicador: 0.25,
            velocidadetiro: 700,
            cooldown: 1000,
            frequencia: 600,
            tempodevida: 800,
            escala: 2,
            tirotriplo: false,
            tiroduplo: false,
            spread: false,

          
            tipo: 'tiro'
}
const tiroB = {
            nome:'Fast Shot',
            descricao: 'Tiro rápido, mas fraco',
            icone: 'powerup2',
            dano:0.3,
            cooldown: 100,
            nivel: 0,
            nivelmax: 3,
            multiplicador: 0.25,         
            frequencia: 100,
            escala: 1, 
            velocidadetiro: 2210,
            tempodevida: 800,
            tipo: 'tiro2',
            tirotriplo: false,
            tiroduplo: false,
            spread: false
}
const tiroR = {
            nome:'Laser',
            descricao: 'Tiro laser, mas fraco',
            icone: 'powerup3',
            dano:1,
            cooldown: 1000,
            nivel: 0,
            nivelmax: 3,
            multiplicador: 0.25,
            frequencia: 500,
            escala: 1,
            velocidadetiro: 1200,
            tempodevida: 1000,
            tipo: 'tiro3'
}
const tiroE = { 
            nome:'Espiral',
            descricao: 'Tiro espiral, mas fraco',
            dano:1,
            icone: 'powerup4',
            cooldown: 1000,
            nivel: 0,
            nivelmax: 3,
            multiplicador: 0.25, 
            escala: 1,
            velocidadetiro: 2000,
            tempodevida: 1000,
            frequencia: 300,
            tipo: 'tiro4'
}
const tiroS = { 
            nome:'Blaster',
            descricao: 'Tiro blaster, mas fraco',
            dano:2,
            icone: 'powerup5',
            cooldown: 1000,
            nivel: 0,
            nivelmax: 3,
            multiplicador: 0.25,
            escala: 2,
            velocidadetiro: 800,
            tempodevida: 800,
            frequencia: 400,
            tipo: 'tiro5'
}
const tiroS2 = {
            nome:'Shotgun',
            descricao: 'Tiro shotgun, mas fraco',
            dano:3,
            cooldown: 1000,
            icone: 'powerup6',
            nivel: 0,
            nivelmax: 3,
            multiplicador: 0.25,
            escala: 2,
            frequencia: 600,
            velocidadetiro: 700,
            tempodevida: 500,
            tipo: 'tiro6'
}
const tiroD = {
            nome:'Flak',
            descricao: 'Tiro flak, mas fraco',
            dano:3,
            cooldown: 1000,
            icone: 'powerup7',
            nivel: 0,
            nivelmax: 3,
            multiplicador: 0.25,
            escala: 4,
            velocidadetiro: 400,
            tempodevida: 600,
            frequencia: 1200,
            tipo: 'tiro7'
}

const satelite = {
            nome:'Satelite S',
            descricao: 'Satelite Simples',
            icone: 'satelite',
            dano:1,
            cooldown: 1000,
            nivel: 1,
            nivelmax: 3,
            multiplicador: 0.25,
            escala: 1,
            velocidadetiro: 1000,
            tempodevida: 1000,
            frequencia: 1000,

            atira: false,
            tipo: 'satelite'
}
const missel = {
            nome:'Rocket',
            descricao: 'Missel',
            icone: 'rocket',
            dano:1,
            cooldown: 1000,
            nivel: 1,
            nivelmax: 3,
            multiplicador: 0.25,
            velocidadetiro: 300,
            tempodevida: 600,
            frequencia: 600,
            atira: false,
            tipo: 'rocket'
}

const life = {
    nome:'Life',
    descricao:'Life',
    icone: 'fulllife',
    dano:1,
    cooldown: 1000,
    nivel: 1,
    nivelmax: 3,
    multiplicador: 0.25,
    velocidadetiro: 300,
    tempodevida: 600,
    frequencia: 600,
    atira: false,
    tipo: 'life'
}

const nukem = {
    nome:'Nukem',
    descricao:'nukem',
    icone: 'fulllife',
    dano:1,
    cooldown: 1000,
    nivel: 1,
    nivelmax: 3,
    multiplicador: 0.25,
    velocidadetiro: 300,
    tempodevida: 600,
    frequencia: 600,
    atira: false,
    tipo: 'nukem'
}

const shield = {
    nome:'Shield',
    descricao:'Shield',
    icone: 'shield',
    dano:1,
    cooldown: 1000,
    nivel: 1,
    nivelmax: 3,
    multiplicador: 0.25,
    velocidadetiro: 300,
    tempodevida: 600,
    frequencia: 600,
    atira: false,
    tipo: 'shield'
}





const DanoBaseRocket = 2




//fazer padrões

//padrõres de inimigos
const pattern1 = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
];

const pattern2 = [
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const pattern3 = [
    [0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 1, 1],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0]
];




const padroes = [pattern1, pattern2, pattern3]

const TiposInimigos = ['enemynave1', 'enemynave2', 'enemynave3', 'enemynave4', 'boss1', 'boss2', 'boss3', 'dude', 'jelly', 'jelly2', 'bebezinho', 'asteroide']




const FXExplosao = ['fx1', 'fx2', 'fx3', 'fx4','fx7']
const FXFire = ['fxfire', 'fx8', 'fx9']
const FXMisc = ['fx5', 'fx6']

class Rocket extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, esquerda = true) {
        super(scene, x - 30, y, 'rocket');
    

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(1);
        this.setDragY(300)
        this.isRocket = true;
       // this.setVelocityX(200);
        this.setVelocityY(-2000); // Set negative velocity on the y-axis to move upwards
        this.setGravityY(-2000);

        this.isDestroyed = false;

        this.scene.physics.add.overlap(this, this.scene.enemyGroup, this.destroyEnemy, null, this);
        this.scene.physics.world.on('worldbounds', this.destroy, this);
        
        this.thruster = this.scene.add.particles(this.x, this.y-50, this.scene.textures.get('fxfire'), {
            scale: { start: 1, end: 0    },
            alpha: { start: 1, end: 0 },
            tint: { start: 0xff945e, end: 0xff945e },
            rotate: { start: 0, end: 360, ease: 'Back.easeOut' },
            speed: { min: 100, max: 100 },
            lifespan: 150,
            frequency: 15,
            gravityY: 11190,
            blendMode: 'ADD'
        });

        this.esquerda = esquerda
        this.scene.GrupoTiros.add(this)

        this.scene.time.addEvent({ delay: missel.tempodevida, callback: this.destroi, callbackScope: this, loop: false });
        
    }

    smokeup()
    {
        if (this.isDestroyed) {return}
        for (var i = 0; i < 7; i++) {
            new FX(this.scene, this.x-Phaser.Math.Between(-20,20), this.y+Phaser.Math.Between(-20,20), -1, ['fxsmoke'])
        }

    }

    destroi(){
        if (this.isDestroyed) {return}
        this.smokeup()
        this.isDestroyed = true;
        this.thruster.destroy();
        super.destroy();

    }

    destroyEnemy(rocket, enemy) {
        if (this.isDestroyed) {
            return;
        }
        this.smokeup()
        this.isDestroyed = true;
        this.thruster.destroy();
        
        enemy.life -= missel.dano

        this.destroy();
    }



    preUpdate() {
        // Update rocket position and rotation based on velocity
        //this.x += this.body.velocity.x / 60;

        this.thruster.setPosition(this.x, this.y+10);
        if (this.y < 0) {
            this.isDestroyed = true;
            this.destroi();
        }

        // Find the nearest enemy
        let nearestEnemy = null;
        let nearestDistance = Infinity;
        
            
            this.scene.GrupoInimigos.getChildren().forEach(enemy => {
                const distance = Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y);
                if (distance < nearestDistance) {
                    nearestEnemy = enemy;
                    nearestDistance = distance;
                }
            });
        

        // Move towards the nearest enemy
        if (nearestEnemy) {
            const angle = Phaser.Math.Angle.Between(this.x, this.y, nearestEnemy.x, nearestEnemy.y);
            const speed = 400; // Adjust the speed as needed
            this.setVelocityX(Math.cos(angle) * speed);
            this.setVelocityY(Math.sin(angle) * speed);
        }
    }
}




class RocketLauncher {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
            this.rockets =  new Phaser.GameObjects.Group(this)
        this.esquerda = true

        //this.scene.input.keyboard.on('keydown-SPACE', this.fireRocket, this);
       // this.fireRocket();
    }

    fireRocket() {

    

        const rocket = new Rocket(this.scene, this.player.x, this.player.y);

        if (this.esquerda) {

            rocket.setAccelerationX (-100)
            rocket.setAccelerationY (-300)
            rocket.setVelocityX(Phaser.Math.Between(-10, -120)); // Set initial velocity
            
            // Adjust rocket trajectory based on player's direction
            if (this.player.flipX) {
            
                rocket.setVelocityY(-400);
            } else {
                rocket.setVelocityY(-400);
            }
            
         } else {
            rocket.x += 60
            rocket.setAccelerationX (100)
            rocket.setAccelerationY (-300)
            rocket.setVelocityX(Phaser.Math.Between(10, 120)); // Set initial velocity

            if (this.player.flipX) {
            
                rocket.setVelocityY(-400);
            } else {
                rocket.setVelocityY(-400);
            }
         }


         this.rockets.add(rocket);
        this.esquerda = !this.esquerda
    }

    preUpdate(time, delta) {
         
    }


    update() {

        this.rockets.getChildren().forEach(rocket => {
            //rocket.update();
            //rocket.update();
            //rocket.setVelocityY(-200)

            // Destroy rocket if it goes off-screen
            if (rocket.y < 0 ) {

                rocket.destroi()
            
                
            }
        });
    }
}

// Usage:
// const rocketLauncher = new RocketLauncher(scene, player);
// In the update() method of your scene, call rocketLauncher.update();


class SpawnerTween {
    constructor(scene, startX, startY, endX, endY, duration, interval, tipo = 'bebezinho', qtd = 1) {
        this.scene = scene;
        this.qtd = qtd;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.duration = duration;
        this.interval = interval;
        this.tipo = tipo;
        this.spawner = new Spawner(this.scene, this.startX, this.startY,this.tipo,this.qtd);
        
        

        this.timer = this.scene.time.addEvent({
            delay: this.interval,
            callback: this.launchSpawner,
            callbackScope: this,
            loop: true
        });


        this.tween = this.scene.tweens.add({
            targets: this.spawner,
            x:{start: this.startX, to: this.endX},
            y: {start: this.startY, to: this.endY},
            duration: this.duration,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: 0,
            onComplete: () => { this.timer.destroy(); this.timer = null; }
        });
   
    }


    stop() {
        if (this.tween) {
            this.tween.stop();
        }

        if (this.timer) {
            this.timer.remove();
        }
    }

    launchSpawner() {
        this.spawner.LancaInimigo();
        console.log('launching spawner');
    }
}


class Satelite extends Phaser.Physics.Arcade.Sprite {
     constructor(scene, x, y, tipo = 'tiro2', dano = 1, cooldown = 1000, atira = false) {
     
        super(scene, x, y, 'satelite')
        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.setScale(2)
        this.setVelocityY(0)
        this.setCollideWorldBounds(false)
        this.setBounce(0)
        this.setGravityY(0)
        this.setImmovable(true)
        this.isCircle = true
        this.tipo = tipo
        this.dano = dano
        this.cooldown = cooldown
        this.velocidade = 10
        this.atira = atira
        if (this.atira){
            this.timedEvent = this.scene.time.addEvent({ delay: this.cooldown, callback: this.atira, callbackScope: this, loop: true });
        }
        this.scene.physics.add.collider(this, this.scene.GrupoTirosInimigos, this.ColisaoTirosInimigos, null, this);
        this.scene.physics.add.collider(this, this.scene.GrupoInimigos, this.ColisaoInimigos, null, this);
     
        const time = this.scene.time.now;
        this.initialAngle = Phaser.Math.FloatBetween(0, Math.PI * 2);
        const radius = 60;
        //this.x = this.scene.player.x + radius * Math.cos(this.initialAngle);
        //this.y = this.scene.player.y + radius * Math.sin(this.initialAngle);
        this.desvio = Phaser.Math.Between(0, 5000)

    
    }

 
        atira() {
            this.scene.GrupoTiros.add(new Tiro(this.scene, this.x, this.y, -1, 800, false, this.tipo))
        }


        ColisaoTirosInimigos(sprite, tiro) {
            var desvio = Phaser.Math.Between(-10, 10)
            new FX(this.scene, this.x-desvio, this.y+desvio,-1, FXExplosao)
            desvio = Phaser.Math.Between(-10, 10)
            new FX(this.scene, this.x+desvio, this.y+desvio, -1, FXFire)
    
            tiro.destroy();
        }
        ColisaoInimigos(sprite, inimigo) {
            var desvio = Phaser.Math.Between(-10, 10)
            new FX(this.scene, this.x-desvio, this.y+desvio,-1, FXExplosao)
            desvio = Phaser.Math.Between(-10, 10)
            new FX(this.scene, this.x+desvio, this.y+desvio, -1, FXFire)
            
            inimigo.destroy();
        }

        preUpdate(time, delta) {
            super.preUpdate(time, delta)

            //gira ao redor do player
            this.setScale(Math.sin(time / 400) / 4 + 1.5)
            this.x = this.scene.player.x + 60 * Math.cos((time + this.desvio) / (800 + this.velocidade)) 
            this.y = this.scene.player.y + 60 * Math.sin(time / (400 + this.velocidade))

        }





}

class FX extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, tipo = -1, FX = FXFire) {
      
        //const ImgFX = ['fx1', 'fx2', 'fx3', 'fx4', 'fx5', 'fx6', 'fx7', 'fx8', 'fx9', 'fxfire', 'fxsmoke']
        const fx = FX[Phaser.Math.Between(0,FX.length-1)]     
        super(scene, x, y, fx)
         
        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.setScale(Phaser.Math.FloatBetween(1.5,2.5 ))
        this.setVelocityY(0)
        
        this.play(fx)
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, this.destroi, this);
        this.setGravityY(0)
        
        this.isCircle = true
                      
    }
    destroi(sprite, animation) {
        this.destroy()
    }   
}

class Drop extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, drops = ['gem1', 'gem2', 'gem3', 'gem4'] ) {

       // const ImgDrops = ['powerup1', 'powerup2', 'powerup3', 'powerup4', 'powerup5', 'powerup6', 'powerup7', 'gem1', 'gem2', 'gem3', 'gem4']
       
         const drop = drops[Phaser.Math.Between(0, drops.length-1)]

        super(scene, x, y, drop)

        this.drop = drop
        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)

        this.setImmovable(true)
        this.setScale(1.25)
        this.setVelocityY(Phaser.Math.Between(300, 400))
        this.setGravityY(550)

        this.scene.physics.add.collider(this, this.scene.player, this.ColisaoPlayer, null, this);
        this.timedEvent = this.scene.time.addEvent({ delay: 3000, callback: this.destroi, callbackScope: this, loop: false });        
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        // Calculate the direction towards the player
        const directionX = this.scene.player.x - this.x;
        const directionY = this.scene.player.y - this.y;

        // Normalize the direction vector
        const length = Math.sqrt(directionX * directionX + directionY * directionY);
        const normalizedDirectionX = directionX / length;
        const normalizedDirectionY = directionY / length;

        // Set the velocity towards the player
        const speed = 159; // Adjust the speed as needed
        this.setVelocity(normalizedDirectionX * speed, normalizedDirectionY * speed+ 500);
    }
    
    destroi() {
        this.destroy()
    }

    ColisaoPlayer(sprite, player)  {   
        
        this.scene.updateUI()
        if (this.drop === 'gem1') {
            this.scene.score += 1
        }
        if (this.drop === 'gem2') {
            this.scene.score += 2
        }
        if (this.drop === 'gem3') {
            this.scene.score += 3
        }
        if (this.drop === 'gem4') {
            this.scene.score += 5
        }
        this.scene.updateUI()
               
        
        player.blink()

        this.destroi()

    }
}


//must create a way to spawn enemies in a pattern

class AsteroidPattern {
    constructor(scene) {
        this.scene = scene;
        this.asteroids = [];
    }

    createPattern(x, y) {
        const pattern = padroes[Phaser.Math.Between(0, 2)];
         y -= 100
        const startX = x - (pattern[0].length * 50) / 2;
        const startY = y - (pattern.length * 50) / 2;

        for (let row = 0; row < pattern.length; row++) {
            for (let col = 0; col < pattern[row].length; col++) {
                if (pattern[row][col] === 1) {
                    const asteroid = new Astedoide(this.scene, startX + col * 50, startY + row * 50);
                    this.asteroids.push(asteroid);
                }
            }
        }
    }

    destroyPattern() {
        this.asteroids.forEach(asteroid => asteroid.destroy());
        this.asteroids = [];
    }
}

class Inimigo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, tipoinimigo = bebezinho) {
        super(scene, x, y, tipoinimigo.tipo)  
        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)

        this.maior = false
        this.life = tipoinimigo.life
        this.segueJogador = false
        this.zigzag = false
        this.atirador = tipoinimigo.atirador
        this.dasher = false //é movimento
        this.disableX = false
        this.disableY = false
        this.segundoMovimento = false
        this.movimentoSin = false
        this.movimentoCos = false
        this.criadude = false
        this.smoker = false
        this.PodeMaior = false
        this.vely = tipoinimigo.vely
        this.drops = tipoinimigo.drops
        this.setDepth(0)
        this.score = tipoinimigo.score

        this.definicoes = tipoinimigo

        this.arma = tipoinimigo.tipoTiro

        this.frequenciadetiro = tipoinimigo.frequenciadetiro

        this.velocidadetiro = tipoinimigo.velocidadetiro

        this.hasThruster = tipoinimigo.hasThruster
        this.tipodetiro = tipoinimigo.tipoTiro

        this.EventoMovimento = 800
        this.EventoMorre = tipoinimigo.EventoMorre
        
        this.thruster = null;

        this.tipoinimigo = tipoinimigo.tipo

       
        if (this.PodeMaior === true) {
            this.setScale(Math.random() < 0.1 ? 1.5 : 1) 
            if (this.scaleX > 1) {
                this.maior = true
                this.score += 1
                this.EventoMorre += 3000
                this.velocidadetiro *= 2
                this.life += 2
            }
        }else{

            this.setScale(1)
        }
        
        this.setVelocityY(Phaser.Math.Between(this.vely, this.vely + 10))
        this.setCollideWorldBounds(false)

        this.setGravityY(800)
        this.setBounce(0)
        this.setImmovable(true)
        this.setDragY(850)

        //this.tint = new Phaser.Display.Color(Phaser.Math.Between(0, 255), Phaser.Math.Between(0, 255), Phaser.Math.Between(0, 255)).color

        this.isCircle = true
        
        this.scene.physics.add.collider(this, this.scene.GrupoTiros, this.ColisaoTiros, null, this);
        this.scene.physics.add.collider(this, this.scene.player, this.ColisaoPlayer, null, this);
        this.MorreEvent = this.scene.time.addEvent({ delay: this.EventoMorre, callback: this.destroi, callbackScope: this, loop: false });
        if (this.atirador === true) {
            this.TiroEvent = this.scene.time.addEvent({ delay: this.frequenciadetiro, callback: this.atira, callbackScope: this, loop: true });
        }
        this.MovimentoEvent = this.scene.time.addEvent({ delay: this.EventoMovimento, callback: this.Movimento, callbackScope: this, loop: true });
        if (this.hasThruster)
        {

            this.thruster = this.scene.add.particles(this.x, this.y, this.scene.textures.get('fxfire'), {
                scale: { start: 1, end: 0 },
                alpha: { start: 1, end: 0 },
                rotate: { start: 0, end: 360, ease: 'Back.easeOut' },
                speed: { min: 100, max: 100 },
                lifespan: 50,
                frequency: 7,
                gravityY: -11190,
                blendMode: 'ADD',
                

            });

        }

        this.scene.GrupoInimigos.add(this)
    }

    smokeup()
    {
        for (var i = 0; i < 3; i++) {
            new FX(this.scene, this.x-Phaser.Math.Between(-20,20), this.y+Phaser.Math.Between(-20,20), -1, ['fxsmoke'])
        }

    }

    //cria um inimigo do tipo 'dude' na posição x, y

    CriaDude (){

        const inim = new Inimigo(this.scene, this.x, this.y+10, 'dude')   

    }


    Movimento() {
        if (this.active === false) {return}
        this.setVelocityX(Phaser.Math.Between(-this.vely, this.vely))
        this.setVelocityY(Phaser.Math.Between(-this.vely, this.vely))
        this.angle += Phaser.Math.Between(-3, 3)
        this.gravity = Phaser.Math.Between(-3, 3)

        if (this.segundoMovimento === true) {
            this.setVelocityX(Phaser.Math.Between(-this.vely, this.vely))
            this.setVelocityY(Phaser.Math.Between(-this.vely, this.vely))
            this.angle += Phaser.Math.Between(-3, 3)
            this.gravity = Phaser.Math.Between(-3, 3)
        }



    }

    atira() {
        if (this.active === false) {return}

        if (this.smoker === true) {
            if(Math.random() < 0.1)
            {
                this.smokeup()

            }
        }

        if (this.criadude === true) {
            if(Math.random() < 0.1)
            {
                this.CriaDude()
                return

            }
        }

        
       // console.log(this.arma)
        this.scene.GrupoTirosInimigos.add ( new Tiro(this.scene, this.x, this.y+10, -1,this.velocidadetiro,false,this.arma,true).setScale(this.arma.escala* -1))
        
        if (this.maior === true) {
            this.scene.GrupoTirosInimigos.add ( new Tiro(this.scene, this.x+10, this.y+10, -1, this.velocidadetiro,false, this.arma,true).setScale(this.arma.escala * -1))
        }
    }   



    ColisaoTiros(sprite, tiro) {
        this.setTint(0xffa500); // Laranja

        
        this.scene.time.delayedCall(400, () => {
            this.clearTint();
        });

        var desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x-desvio, this.y+desvio,-1, FXExplosao)
        desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x+desvio, this.y+desvio, -1, FXFire)
        

        if (tiro.isRocket) {
            this.life -= missel.dano
        }else{


            
            this.life -= this.scene.player.arma.dano
        }

        tiro.destroi();
    }

    ColisaoPlayer(sprite, player)  {
        
        var desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x-desvio, this.y+desvio)
        desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x+desvio, this.y+desvio)
        this.scene.player.tomaDano()
        this.life -= 1
        //this.destroy();
    }

    destroi() {
        if (this.active === false) {return}
        if (this.hasThruster){
            
            this.thruster.destroy()
        
        }
        this.scene.GrupoInimigos.remove(this)
        
        this.smokeup()
        
        this.destroy()

        
        
    }


    preUpdate(time, delta) {
        super.preUpdate(time, delta)
        if (this.life <= 0) {

            this.scene.score += this.score
            this.scene.updateUI()
            var desvio = Phaser.Math.Between(-10, 10)
            new FX(this.scene, this.x-desvio, this.y+desvio)
            desvio = Phaser.Math.Between(-10, 10)
            new FX(this.scene, this.x+desvio, this.y+desvio)
            
            new Drop(this.scene, this.x, this.y, this.drops)
            
            this.destroi()
           
        }

        if (this.zigzag === true) {
            this.x +=  Math.sin(time / 100)  * 4
        }

        this.scaleX +=  Math.sin(time / 100)  / 50
        this.scaleY += Math.cos(time / 100) /50

        if (this.hasThruster)
        {
            this.thruster.setPosition(this.x, this.y-27);

        }
    }


}

class Astedoide extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      
        const ImgAsteroides = ['astedoide1', 'astedoide2', 'astedoide3', 'astedoide4', 'astedoide5']

        super(scene, x, y, ImgAsteroides[Phaser.Math.Between(0, 4)])
        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.setScale(1)
        this.setVelocityY(Phaser.Math.Between(100, 105))
        this.setCollideWorldBounds(false)
        this.setBounce(1)
        this.setAngularAcceleration(100)
        this.setGravityY(1000)
        this.setDragY(1000)
        this.isCircle = true
        this.scene.physics.add.collider(this, this.scene.GrupoTiros, this.ColisaoTiros, null, this);
        this.scene.physics.add.collider(this, this.scene.player, this.ColisaoPlayer, null, this);
        this.timedEvent = this.scene.time.addEvent({ delay: 10000, callback: this.destroi, callbackScope: this, loop: false });
     
    }

    
    preUpdate(time, delta) {
        super.preUpdate(time, delta)
    }


    ColisaoTiros(sprite, tiro) {
        var desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x-desvio, this.y+desvio,-1, FXExplosao)  
        desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x+desvio, this.y+desvio, -1, FXFire)  

        new Drop(this.scene, this.x, this.y)

        this.destroy();
        tiro.destroy();

        
    }
    ColisaoPlayer(sprite, player)  {       

        var desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x-desvio, this.y+desvio)  
        desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x+desvio, this.y+desvio)  
        this.scene.player.tomaDano()
        this.destroy();

                
    }


    destroi() {
    
        this.destroy()

    }   
}


class Tiro extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, direcao = 1, velocidadetiro = 300, rocket = false, tipo = tiroP, inimigo = false ) {




        super(scene, x, y, tipo.tipo)

        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.setScale(1)

        if (inimigo == true)
        {

            this.setScale(-1)
            direcao = 1

        }else{
            direcao = -1
        }

        

        this.tipo = tipo

        this.setVelocityY(tipo.velocidadetiro * direcao)
        this.setCollideWorldBounds(false)
        this.setBounce(0)
        this.setGravityY(tipo.velocidadetiro * direcao)
        this.setDragY(50)
        
        
        this.timedEvent = this.scene.time.addEvent({ delay: tipo.tempodevida, callback: this.destroi, callbackScope: this, loop: false });

        
        
    }
    destroi() {
        this.timeEvent = null
        this.destroy()
    }   

    preUpdate(time, delta) {
        super.preUpdate(time, delta)
        if (this.rocket === true) {
            this.x +=  Math.sin(time / 90)  * 5
        }
        //this.y += Math.cos(time / 100) /50

        if (this.y < 0) {
            this.destroi()
        }
    }


}
class ThrusterEmitter {
    constructor(scene, x, y,rotation, tipo = 'fxfire') {

        this.scene = scene;

        this.emitter = this.scene.add.particles(x,y, tipo,{
            x: x,
            y: y,
            //speed: { min: -100, max: 100 },
            //scale: { start: 1, end: 0 },
            lifespan: 100,
           // blendMode: 'ADD',
            //frequency: 50,
            quantity: 1,
           // gravityY: 200,
            on: false
        });

        //this.emitter.startFollow({ x: x, y: y });
        this.emitter.setAngle(rotation);
        


    }

    start() {
        this.emitter.start();
    }

    stop() {
        this.emitter.stop();
    }
}







class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player')

        this.arma = tiroP

        this.tipodetiro = 'P'
        
        this.hasRockets = false;


        this.dano = 1
        this.frequenciadetiro = 1000
        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setScale(1)
        this.setImmovable(true)

        this.levelP = 0
        this.levelB = 0
        this.levelR = 0
        this.levelE = 0
        this.levelS = 0
        this.levelS2 = 0
        this.levelD = 0

        this.vidas = 3
        this.energia = 1

        this.energycooldown = 1000
      
        this.shieldcusto = 0.1
        this.shield = true //voce começa com shield perde se esta abaixo de 0.1 de energia

        this.satelites = 3 //quantidade de satelites que o player tem

        this.invencibilidade = 1000 //tempo de invencibilidade
        this.invencivel = false 

        this.GodMode = false //se true o player não toma dano

       

        this.velocidadetiro = 800

      

        this.rocketLauncher = new RocketLauncher(this.scene, this);

        this.cursor = this.scene.input.keyboard.createCursorKeys()
        this.timedEvent = this.scene.time.addEvent({ delay: this.arma.frequencia, callback: this.atira, callbackScope: this, loop: true });
        this.EnergiaEvent = this.scene.time.addEvent({ delay: this.energycooldown, callback: this.RecuperaEnergia, callbackScope: this, loop: true });  
        this.scene.physics.add.collider(this, this.scene.GrupoTirosInimigos, this.ColisaoTiros, null, this);
        this.shield = this.scene.add.image(this.x, this.y, 'shield').setScale(1)
        .setAlpha(0.9)
        

        this.RocketDisparoTimer = this.scene.time.addEvent({ delay: missel.frequencia, callback: this.atiraMissel, callbackScope: this, loop: true }); 
       
        this.nivelRocket = 0
        //this.scene.powerupSelection()
    }

 lifePU() {
    this.scene.healthbarcolor.setScale(1, 1)
    this.scene.energybarcolor.setScale(1, 1)
 }

    
    atiraMissel () {

        if (this.nivelRocket > 4) {
            this.nivelRocket = 4
        }
        if (this.nivelRocket > 1) {
            this.RocketDisparoTimer.delay = missel.frequencia - (this.nivelRocket * 50)
        }
            
    

        if (this.hasRockets) {
            this.rocketLauncher.fireRocket()
        }
    }

    lancaSatelite ()
    {

        this.scene.GrupoSatelites.add(new Satelite(this.scene, this.x, this.y, 'tiro2', 1, 1000, false))

    }

    reset(){
        this.vidas = 3
        this.energia = 1
        this.scene.healthbarcolor.setScale(1, 1)
        this.scene.energybarcolor.setScale(1, 1)
        this.level = 0
        this.score = 0
        this.scene.score = 0
        this.scene.nextlevelscore = 30
        this.scene.updateUI()
        this.tipodetiro = 'P'
        this.arma = tiroP
        this.dano = 1
        this.frequenciadetiro = 1000
        this.velocidadetiro = 800
    
    }

    RecuperaEnergia() {
        if (this.scene.energybarcolor.scaleX < 1) {
            this.scene.energybarcolor.setScale(this.scene.energybarcolor.scaleX+0.1, 1)
        }
    }

    ColisaoTiros(sprite, tiro) {
        var desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x-desvio, this.y+desvio,-1, FXExplosao)
        desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x+desvio, this.y+desvio, -1, FXFire)
        this.tomaDano()
        tiro.destroy();
    }
    setVelocidadeTiro(vel) {
        this.velocidadetiro = vel
    }
    setfrequenciaTiro(freq) {
        this.frequenciadetiro = freq
        this.timedEvent.delay = freq
    }

    setTipoTiro(tipo) {
        this.tipodetiro = tipo
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.scene.updateUI()

        // Your existing code...

        // Calculate the alpha value based on energy
        const shieldAlpha = this.scene.energybarcolor.scaleX - 0.2;

        // Set the alpha value of the shield
        this.shield.setAlpha(shieldAlpha);
        this.shield.x = this.x
        this.shield.y = this.y
        this.scaleX +=  Math.sin(time / 150)  / 75
        this.scaleY += Math.cos(time / 150) /70

        this.body.setAllowGravity(false)
        this.setDragX(500)
       

        this.rocketLauncher.update();

        const { left, right, up, down, D } = this.cursor;

        if (this.scene.sys.game.device.input.touch) {
            const pointer = this.scene.input.activePointer;
            
            if (pointer.isDown) {
                if (pointer.x < this.scene.game.config.width / 2) {
                    left.isDown = true;
                } else {
                    right.isDown = true;
                }   
            } else {
                left.isDown = false;
                right.isDown = false;
            }
        }



        if (left.isDown) {
            this.setAccelerationX(-2500);
            this.setVelocityX(-350);
            this.scene.thruster.x = this.x
            this.scene.thruster.y = this.y+17
            
            
        } else if (right.isDown) {
            this.setAccelerationX(2500);
            this.setVelocityX(350);
            this.scene.thruster.x = this.x
            this.scene.thruster.y = this.y+17
        }else if (up.isDown) {

        } else {
            this.setAccelerationX(0);
            this.scene.thruster.y = this.y+20
            this.scene.thruster.x = this.x
        }
      
        var justleft = Phaser.Input.Keyboard.JustDown(left)
        var justright = Phaser.Input.Keyboard.JustDown(right)
        
    
        
        

    }

    blink(){
        for (var i = 0; i < 3; i++) {
            new FX(this.scene, this.x-Phaser.Math.Between(-20,20), this.y+Phaser.Math.Between(-20,20), -1, ['fx5'])
        }
    }

    smokeup()
    {
        for (var i = 0; i < 3; i++) {
            new FX(this.scene, this.x-Phaser.Math.Between(-20,20), this.y+Phaser.Math.Between(-20,20), -1, ['fxsmoke'])
        }

    }

    upaarma() {
        this.arma.nivel += 1
        if (this.arma.nivel > this.arma.nivelmax) {this.arma.nivel = this.arma.nivelmax}
        

        //this.scene.timedEvent
        if (this.arma == tiroP)
        {
            if (this.arma.nivel == 1) {

                this.arma.dano = 1.5
               //this.arma.tiroduplo = true
                //this.arma.tirotriplo = false
                this.timedEvent.delay -= 50
            
            }else if (this.arma.nivel == 2) {
                this.arma.dano = 0.8
                this.arma.tiroduplo = true
                this.arma.tirotriplo = false
               // this.scene.get('scene-game').player.timedEvent.delay -= 100
            
            }else if (this.arma.nivel == 3) {
                this.arma.dano = 0.7
                this.arma.tiroduplo = false
                this.arma.tirotriplo = true
                //this.scene.get('scene-game').player.timedEvent.delay -= 100

            }else{
                this.arma.dano = 1.2
                this.arma.tiroduplo = false
                this.arma.tirotriplo = false
            }

        }
        //fast shot
       if (this.arma == tiroB)
        {
            if (this.arma.nivel == 1) {
                this.arma.dano = 0.5
               this.arma.tiroduplo = true
                this.arma.tirotriplo = false
                //this.timedEvent.delay -= 50
            
            }else if (this.arma.nivel == 2) {
                this.arma.dano = 0.4
                this.arma.tiroduplo = false
                this.arma.tirotriplo = true
               // this.scene.get('scene-game').player.timedEvent.delay -= 100
            
            }else if (this.arma.nivel == 3) {
                this.arma.dano = 0.3
                this.arma.tiroduplo = false
                this.arma.tirotriplo = false
                this.arma.spread = true
                //this.scene.get('scene-game').player.timedEvent.delay -= 100

            }else{
                this.arma.dano = 0.3
                this.arma.tiroduplo = false
                this.arma.tirotriplo = false
            }

        }
        //flak
      if (this.arma == tiroR)
        {
            if (this.arma.nivel == 1) {
            
               //this.arma.tiroduplo = true
                //this.arma.tirotriplo = false
                this.timedEvent.delay -= 150
            
            }else if (this.arma.nivel == 2) {
                this.arma.tiroduplo = true
                this.arma.tirotriplo = false
               // this.scene.get('scene-game').player.timedEvent.delay -= 100
            
            }else if (this.arma.nivel == 3) {
                this.arma.escala += 0.2
                //this.scene.get('scene-game').player.timedEvent.delay -= 100

            }else{
                this.arma.tiroduplo = false
                this.arma.tirotriplo = false
            }

        }

    }

    atira() {
        
       

        if (this.arma.tiroduplo)
        {

            this.scene.GrupoTiros.add(new Tiro(this.scene, this.x+30, this.y, 1, this.arma.velocidadetiro, false, this.arma,false).setScale(this.arma.escala))
            this.scene.GrupoTiros.add(new Tiro(this.scene, this.x-30, this.y, 1, this.arma.velocidadetiro, false, this.arma,false).setScale(this.arma.escala))
            return
        }
        if (this.arma.tirotriplo){

            this.scene.GrupoTiros.add(new Tiro(this.scene, this.x, this.y-20, 1, this.arma.velocidadetiro, false, this.arma,false).setScale(this.arma.escala-.2))
            this.scene.GrupoTiros.add(new Tiro(this.scene, this.x+30, this.y+15, 1, this.arma.velocidadetiro, false, this.arma,false).setScale(this.arma.escala-.4))
            this.scene.GrupoTiros.add(new Tiro(this.scene, this.x-30, this.y+15, 1, this.arma.velocidadetiro, false, this.arma,false).setScale(this.arma.escala-.4))
            return

        }
        if (this.arma.spread)
        {
            this.scene.GrupoTiros.add(new Tiro(this.scene, this.x, this.y, 1, this.arma.velocidadetiro, false, this.arma,false).setScale(this.arma.escala))
            this.scene.GrupoTiros.add(new Tiro(this.scene, this.x+10, this.y, 1, this.arma.velocidadetiro, false, this.arma,false).setScale(this.arma.escala))
            this.scene.GrupoTiros.add(new Tiro(this.scene, this.x-10, this.y, 1, this.arma.velocidadetiro, false, this.arma,false).setScale(this.arma.escala))
            this.scene.GrupoTiros.add(new Tiro(this.scene, this.x+30, this.y+15, 1, this.arma.velocidadetiro, false, this.arma,false).setScale(this.arma.escala-.4))
            this.scene.GrupoTiros.add(new Tiro(this.scene, this.x-30, this.y+15, 1, this.arma.velocidadetiro, false, this.arma,false).setScale(this.arma.escala-.4))
            return

        }

        
            
            this.scene.GrupoTiros.add(new Tiro(this.scene, this.x, this.y, 1, this.arma.velocidadetiro, false, this.arma,false).setScale(this.arma.escala))

        
    }  
       
    
    tomaDano(){
       
        this.scene.cameras.main.shake(100, 0.01);
        if (this.scene.energybarcolor.scaleX > 0.1) {
            this.scene.energybarcolor.setScale(this.scene.energybarcolor.scaleX-0.4, 1)
        }else{
            this.scene.healthbarcolor.setScale(this.scene.healthbarcolor.scaleX-0.1, 1)
        }

        if (this.scene.healthbarcolor.scaleX <= 0) {

            this.scene.healthbarcolor.setScale(1, 1)
            
            this.vidas -= 1        
        }

        if(this.scene.energybarcolor.scaleX<=0) this.scene.energybarcolor.scaleX = 0
        if(this.scene.healthbarcolor.scaleX<=0) this.scene.healthbarcolor.scaleX = 0
        if (this.vidas <= 0) {
            this.waveIndex = 0  
            this.scene.scene.start('scene-gameover')

                
        }
    }
}


  class GameScene extends Phaser.Scene {
    constructor() {
      super('scene-game')
    
        this.isTitleScreen = true
    
    
      this.tiposdeWave = ['wavefacil', 'waveboss', 'wavecomplexa', 'waveMedia', 'waveDificil', 'waveMuitoDificil', 'waveInsana']
    
    
      this.tipoWave = 'wavefacil0'    
    
        this.healthtext
        this.energytext
        this.evolutiontext
        this.timebarcolor
        this.vidasText
        this.hudCima 
        

        
        this.quantidadeEstrelasFundo = 20

        this.player;  
        this.fogo
        this.astedoide;
        this.GrupoAsteroides 
        this.GrupoTiros
        this.AnimExplosao
        this.AnimFogo
        this.ImgAsteroides = []
        this.nextlevelscore = 30
        this.qtoporgrupo = 4

        this.GrupoTirosInimigos
        this.GrupoInimigos
        this.GrupoSpawners
        this.GrupoSpawnerTimer
        this.GrupoDrops
        this.GrupoSatelites

            

        this.textScore
        this.textLevel
        this.timebarText
        

        this.healthbarbg
        this.healthbarcolor

        this.energybarbg
        this.energybarcolor

        this.evolutionbarbg
        this.evolutionbarcolor
        
        this.imgTiroCirculo

        this.imgTitleScreen

        this.imgLife = []

        this.score = 0
        this.level = 0 

        this.FXanims = []

        this.waveIndex = 0;
        this.waveDuration = TempodeumaWave; // duration of each wave in milliseconds
        
        
        this.timeBetweenWaves = TempoEntreWaves; // time between waves in milliseconds
        

        this.waveTimer = null;
        this.intermizzoTimer = null;
        this.spawnTimer = null;
        
        this.waveText = null;
        this.waveTextTween = null;

        this.tempoSpawnInimigo = tempoSpawnInimigo

        this.width = width  
        this.height = height

        this.thruster

        }           

    reset(){
        this.player.reset()
        this.GrupoTiros.clear(true, true)
        this.GrupoTirosInimigos.clear(true, true)
        this.GrupoAsteroides.clear(true, true)
        this.GrupoInimigos.clear(true, true)
        this.GrupoSatelites.clear(true, true)
        this.score = 0
        this.level = 0

        this.updateUI()
        this.waveIndex = 0
        this.evolutionbarcolor.setScale(0, 1);
        this.startNextWave()
        this.powerupSelection()
      
    }


    //o jogo deve possuir um sistema de waves de inimigos
    //o sistema de waves deve ser chamado ao final de cada wave que dura um tempo determinado
    //o sistema de waves tambem termina quando o ultimo inimigo da wave é destruido
    //entre as waves o jogador deve ter um tempo de alguns segundos voando até a proxima wave
    powerupSelection ()
    {
        this.scene.pause()
        this.scene.launch('PowerUpSelectionScene');
    }

    betweenWaves() {
   
        // Iniciar a cena de seleção de power up
     
        //this.player.lancaSatelite();
        const color = Phaser.Display.Color.RandomRGB(20, 30);
      
        if (this.waveIndex % 2 === 0 && this.waveIndex > 0) {
            console.log('disparando uma media')
            this.tipoWave = 'wavefacil03'
        }

        
        
        if (this.waveIndex % 3 === 0 && this.waveIndex > 0)  {
            console.log('boss !')
            this.tipoWave = 'wavefacilboss';

        }

        // Set the background color to the generated color
        this.cameras.main.setBackgroundColor(color.color);

        if(this.tipoWave === 'wavefacilboss') {

            this.waveText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'WAVE BOSS !!!', { fontFamily: 'PressStart2P', fontSize: 30, color: '#ffffff' });   
        }else{
            this.waveText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Wave ' + (this.waveIndex + 1), { fontFamily: 'PressStart2P', fontSize: 30, color: '#ffffff' });   

        }

        
        this.waveText.setOrigin(0.5);
        this.waveTextTween = this.tweens.add({
            targets: this.waveText,
            alpha: 0,
            duration: this.timeBetweenWaves / 2,
            ease: 'Linear',
            repeat: 0,
            yoyo: false,
            onComplete: () => { this.waveText.destroy(); this.waveTextTween = null; }
        });

        this.intermizzoTimer = this.time.addEvent({ delay: this.timeBetweenWaves, callback: this.startNextWave, callbackScope: this, loop: false });
        this.waveTimer = null;
        this.spawnTimer = null;
        this.waveIndex++;


    }



    startNextWave() {
      
       
       
 
        this.waveTimer = this.time.addEvent({ delay: TempodeumaWave, callback: this.betweenWaves, callbackScope: this, loop: false });
        //this.spawnTimer =  this.time.addEvent({ delay: this.tempoSpawnInimigo, callback: this.LancaAsteroide, callbackScope: this, loop: true });
        this.GrupoSpawnerTimer = this.time.addEvent({ delay: TempoEntreGruposInimigos, callback: this.LancaSpawner, callbackScope: this, loop: true });
       // new SpawnerTween(this, Phaser.Math.Between(0, 400), 10,'boss1',1)
        

    }

    LancaSpawner() {
        

        const naves =  ['enemynave2','enemynave1']
        const waveFacil0 = [jelly,jelly2,bebezinho]
        const waveFacil01 =[dude,jelly2,bebezinho]
        const waveFacil02 =[enemynave2,enemynave3]
        const waveFacil03 =  [enemynave1,enemynave4]
        const waveMedia0   =['enemynave2','enemynave3','enemynave4']
        const waveMedia01  =['enemynave2','enemynave3','enemynave4']
        const waveMedia02  =['enemynave2','enemynave3','enemynave4']
        const waveMedia03  =['enemynave2','enemynave3','enemynave4']


        
        //const waveFacil1 = ['bebezinho','enemynave2','enemynave3', 'jelly']
       // const waveFacil2 = ['enemynave2','enemynave1', 'bebezinho', 'jelly', 'jelly2', 'dude']
        const waveFacilBoss = [boss1, boss2, boss3]
        

        if (this.tipoWave === 'wavefacil0') {
            const escolha = Phaser.Math.Between(0, waveFacil0.length-1)
            new Spawner(this, Phaser.Math.Between(10, 390), 10,waveFacil0[escolha],waveFacil0[escolha].maxporgrupo)
            const escolha2 = Phaser.Math.Between(0, waveFacil0.length-1)
            new Spawner(this, Phaser.Math.Between(10, 390), 10,waveFacil0[escolha2],waveFacil0[escolha2].maxporgrupo)
        
            this.tipoWave = 'wavefacil01'
            return

        }else if (this.tipoWave === 'wavefacil01') {
            const escolha = Phaser.Math.Between(0, waveFacil01.length-1)
            new Spawner(this, Phaser.Math.Between(10, 350), 10,waveFacil01[escolha],waveFacil01[escolha].maxporgrupo)
            const escolha2 = Phaser.Math.Between(0, waveFacil0.length-1)
            new Spawner(this, Phaser.Math.Between(10, 350), 10,waveFacil0[escolha2],waveFacil0[escolha2].maxporgrupo)
           
            this.tipoWave = 'wavefacil02'
            return

            
        }else if (this.tipoWave === 'wavefacil02') {
            const escolha = Phaser.Math.Between(0, waveFacil02.length-1)
            new Spawner(this, Phaser.Math.Between(10, 350), 10,waveFacil02[escolha],waveFacil02[escolha].maxporgrupo)
            const escolha2 = Phaser.Math.Between(0, waveFacil02.length-1)
            new Spawner(this, Phaser.Math.Between(10, 350), 10,waveFacil02[escolha2],waveFacil02[escolha2].maxporgrupo)
            this.tipoWave = 'wavefacil0'
            return
        
        }else if (this.tipoWave === 'wavefacil03') {
            const escolha = Phaser.Math.Between(0, waveFacil03.length-1)
            new Spawner(this, Phaser.Math.Between(10, 350), 10,waveFacil03[escolha],waveFacil03[escolha].maxporgrupo)
            
            this.tipoWave = 'wavefacil0'
            return
        }else if (this.tipoWave === 'wavemedia0') {
            const escolha = Phaser.Math.Between(0, waveMedia0.length-1)
            new Spawner(this, Phaser.Math.Between(10, 350), 10,waveMedia0[escolha],waveMedia0[escolha].maxporgrupo)
            
            this.tipoWave = 'wavemedia01'
            return

        }else if (this.tipoWave === 'wavemedia01') {
            const escolha = Phaser.Math.Between(0, waveMedia01.length-1)
            new Spawner(this, Phaser.Math.Between(10, 350), 10,waveMedia01[escolha],4)
            
            this.tipoWave = 'wavemedia02'
            return
        
        }else if (this.tipoWave === 'wavemedia02') {
            const escolha = Phaser.Math.Between(0, waveMedia02.length-1)
            new Spawner(this, Phaser.Math.Between(10, 350), 10,waveMedia02[escolha],4)
            
            this.tipoWave = 'wavemedia03'
            return
            
        }else if (this.tipoWave === 'wavemedia03') {
            const escolha = Phaser.Math.Between(0, waveMedia03.length-1)
            new Spawner(this, Phaser.Math.Between(10, 350), 10,waveMedia03[escolha],4)
            
            this.tipoWave = 'wavemedia01'
            return



        }else if (this.tipoWave === 'wavefacilboss') {
            const escolha = Phaser.Math.Between(0, waveFacilBoss.length-1)
            const escolha2 = Phaser.Math.Between(0, waveFacil02.length-1)
            new Spawner(this, Phaser.Math.Between(10, 350), 10,waveFacilBoss[escolha],1)
            
            this.tipoWave = 'wavefacil0'
            return
        
         }else{


            const escolha = Phaser.Math.Between(0, waveFacil0.length-1)

            new Spawner(this, Phaser.Math.Between(0, 400), 10,waveFacil0[escolha],waveFacil0[escolha].maxporgrupo)

        }

    }


    preload() {
        
        this.load.image('bg1', 'assets/Background/3b.png')
        this.load.image('player', 'assets/Ship/2.png')

        this.load.image('titlescreen','assets/HUD/title.png')

        this.load.image('emptylife', 'assets/HUD/EmptylLife.png')

        this.load.image('fulllife', 'assets/HUD/FullLife.png')
        this.load.image('healthbarbg', 'assets/HUD/HealthBar.png')
        this.load.image('healthbar', 'assets/HUD/HealthBarColor.png')

        this.load.image('energybarbg', 'assets/HUD/EnergieBar.png')
        this.load.image('energybar', 'assets/HUD/EnergieBarColor.png')

        //q: é possivel fazer isso  this.load.image('energybar',this.add.circle...
        
        
        

        this.load.image('hudCima','assets/HUD/top.png')


        //naves olhanco para cima
        this.load.image('enemynave1', 'assets/Ship/11.png').flipY = true
        this.load.image('enemynave2', 'assets/Ship/6.png').flipY = true
        this.load.image('enemynave3', 'assets/Ship/6b.png').flipY = true
        this.load.image('enemynave4', 'assets/Ship/4.png').flipY = true




        //naves de boss olhando pra baixo
        this.load.image('boss1', 'assets/Ship/7.png')
        this.load.image('boss2', 'assets/Ship/8.png')
        this.load.image('boss3', 'assets/Ship/9.png')
        

        //naves olhando pra baixo
        this.load.image('bebezinho', 'assets/Ship/10.png')
        this.load.image('jelly', 'assets/Ship/jelly.png')
        this.load.image('jelly2', 'assets/Ship/jelly-2.png')
        this.load.image('dude', 'assets/Ship/5.png')


        
        this.load.image('LifeIcon', 'assets/HUD/LifeIcon.png')

        this.load.image('tiro', 'assets/Shoot/1.png')
        this.load.image('tiro2', 'assets/Shoot/2.png')
        this.load.image('tiro3', 'assets/Shoot/3.png')
        this.load.image('tiro4', 'assets/Shoot/4.png')
        this.load.image('tiro5', 'assets/Shoot/5.png')
        this.load.image('tiro6', 'assets/Shoot/6.png')
        this.load.image('tiro7', 'assets/Shoot/7.png')
        this.load.image('tiro8', 'assets/Shoot/8.png')
        this.load.image('tiro9', 'assets/Shoot/9.png')
        this.load.image('tiro10', 'assets/Shoot/10.png')
        this.load.image('tiro11', 'assets/Shoot/11.png')
        this.load.image('tiro12', 'assets/Shoot/12.png')
        this.load.image('tiro13', 'assets/Shoot/13.png')
        this.load.image('tiro14', 'assets/Shoot/14.png')


        this.load.image('astedoide1', 'assets/Background/Meteor1.png')
        this.load.image('astedoide2', 'assets/Background/Meteor2.png')
        this.load.image('astedoide3', 'assets/Background/Meteor3.png')
        this.load.image('astedoide4', 'assets/Background/Meteor4.png')
        this.load.image('astedoide5', 'assets/Background/Meteor5.png')
        
        this.load.image('rocket', 'assets/Item/Rocket.png')
        this.load.image('powerup1', 'assets/Item/PowerUp1.png')
        this.load.image('powerup2', 'assets/Item/PowerUp2.png')
        this.load.image('powerup3', 'assets/Item/PowerUp3.png')
        this.load.image('powerup4', 'assets/Item/PowerUp4.png')
        this.load.image('powerup5', 'assets/Item/PowerUp5.png')
        this.load.image('powerup6', 'assets/Item/PowerUp6.png')
        this.load.image('powerup7', 'assets/Item/PowerUp7.png')

        this.load.image('satelite', 'assets/Item/Bomb.png')

        this.load.image('gem1', 'assets/Item/Gem1.gif')
        this.load.image('gem2', 'assets/Item/Gem2.gif')
        this.load.image('gem3', 'assets/Item/Gem3.gif')
        this.load.image('gem4', 'assets/Item/Gem4.gif')


        this.load.image('shield', 'assets/Fx/Shield.png')
        this.load.image('shieldfraco', 'assets/Fx/Shield2.png')
        this.load.spritesheet('fx1', 'assets/Fx/Fx1.png', { frameWidth: 38, frameHeight: 38, numberOfFrames: 6 })
        this.load.spritesheet('fx2', 'assets/Fx/Fx2.png', { frameWidth: 34, frameHeight: 34, numberOfFrames: 6 })
        this.load.spritesheet('fx3', 'assets/Fx/Fx3.png', { frameWidth: 30, frameHeight: 30, numberOfFrames: 6 })
        this.load.spritesheet('fx4', 'assets/Fx/Fx4.png', { frameWidth: 36, frameHeight: 36, numberOfFrames: 6 })
        this.load.spritesheet('fx5', 'assets/Fx/Fx5.png', { frameWidth: 14, frameHeight: 28, numberOfFrames: 5 })
        this.load.spritesheet('fx6', 'assets/Fx/Fx6.png', { frameWidth: 12, frameHeight: 28, numberOfFrames: 6 })
        this.load.spritesheet('fx7', 'assets/Fx/Fx7.png', { frameWidth: 82, frameHeight: 72, numberOfFrames: 8 })
        this.load.spritesheet('fx8', 'assets/Fx/Fx8.png', { frameWidth: 32, frameHeight: 32, numberOfFrames: 7 })
        this.load.spritesheet('fx9', 'assets/Fx/Fx9.png', { frameWidth: 32, frameHeight: 32, numberOfFrames: 7 })

        this.load.spritesheet('fxfire', 'assets/Fx/fx fire.png', { frameWidth: 16, frameHeight: 16, numberOfFrames: 6 })
        this.load.spritesheet('fxsmoke', 'assets/Fx/smoke.png', { frameWidth: 16, frameHeight: 16, numberOfFrames: 6 })
        

        this.load.spritesheet('explosao', 'assets/Fx/Fx1.png', { frameWidth: 38, frameHeight: 38, numberOfFrames: 6 })
        this.load.spritesheet('fogo', 'assets/Fx/Fx6.png', { frameWidth: 12, frameHeight: 28, numberOfFrames: 6 })
    }   
 



    updateUI() {
    
        
        this.vidasText.setText('x' + this.player.vidas) 
        this.textScore.setText('SCORE: ' + this.score);
        this.textLevel.setText('LVL ' + this.level);
    


        if (this.waveTimer)
        {
            this.timebarText.setText("T - "+ Phaser.Math.FloorTo(this.waveTimer.getRemainingSeconds()));
        }
        var valor = this.nextlevelscore - this.score


    
        
        if (this.level < 1) {
            this.evolutionbarcolor.setScale(valor/this.nextlevelscore, 1);
        }else{
            this.evolutionbarcolor.setScale(valor / this.nextlevelscore * 1.9, 1);
        }
        
        
        if (this.nextlevelscore <= this.score) {
            this.level++;
            this.powerupSelection()

            // Cálculo do valor do score necessário para o próximo level
            this.nextlevelscore += Math.pow(this.level, 1.5) * 30;

            // Atualiza a barra de evoluçãao do jogador mostrando o quanto falta até o proximo level
            
            this.evolutionbarcolor.setScale(0, 1);
            console.log("proximo score: "+this.nextlevelscore)

        }
        
    }
   
createBackground(scene) {
    
    const width = scene.game.config.width;
    const height = scene.game.config.height;
    const sizemin = 0.2
    const sizemax = 2
    const speedmaxz = 3
    const speedminz = 1
    // Create a group to hold the stars
    const starsGroup = scene.add.group();

    // Generate stars at the top of the screen
    for (let i = 0; i < this.quantidadeEstrelasFundo; i++) {
        const x = Phaser.Math.Between(0, width);
        const y = Phaser.Math.Between(-height, 0);
        const size = Phaser.Math.Between(sizemin, sizemax);
        const speed = Phaser.Math.Between(speedminz, speedmaxz); // Add random speed for each star

        // Create a star sprite and add it to the group
        const star = scene.add.circle(x, y, size, 0xffffff ) ;
       // star.setAlpha(Phaser.Math.Between(0.1, 1));
        starsGroup.add(star);

        // Create a tween to move the star from top to bottom with random speed
        const duration = Phaser.Math.Between(2000, 4000); // Randomize duration
        scene.tweens.add({
            targets: star,
            y: height*2,
            duration: duration,
            repeat: -1,
            yoyo: false,
            onComplete: function(tween, target) {
                // Remove star when it reaches the bottom of the screen
                target.destroy();
                
                // Generate a new star at the top of the screen with random properties
                const newX = Phaser.Math.Between(0, width);
                const newY = Phaser.Math.Between(-height, 0);
                const newSize = Phaser.Math.Between(sizemin, sizemax);
                const newSpeed = Phaser.Math.Between(speedminz, speedmaxz);
                const newDuration = Phaser.Math.Between(2000, 4000);
                
                const newStar = scene.add.circle(newX, newY, newSize, Phaser.Math.RND.pick([0xffF4CB, 0x55ff00, 0x5500ff]));
                
                newStar.setAlpha(Phaser.Math.Between(0.3, 1));
                starsGroup.add(newStar);

                // Restart the tween for the new star
                scene.tweens.add({
                    targets: newStar,
                    y: height*2,
                    duration: newDuration,
                    repeat: -1,
                    yoyo: false,
                    onComplete: function(tween, target) {

                        target.destroy();
                    }
                });
            }
        });
    }
}



        criaUI (){


            this.hudCima = this.add.image(-210, 30, 'hudCima').setOrigin(0,0).setDepth(1)
        
 
        
            this.healthtext = this.add.text(88, 131, 'HP', { fontSize: '13px', fontFamily: 'PressStart2P', fill: '#FFFACB' }).setDepth(2);
            
            this.healthbarcolor = this.add.rectangle(61, 130, 76, 15, 0xff0000).setOrigin(0, 0).setDepth(1);
    
    
            this.add.text(170, 131, 'ENERGY', { fontSize: '12px', fontFamily: 'PressStart2P', fill: '#FFFACB' }).setDepth(2)
            this.energybarcolor = this.add.rectangle(167, 130, 76, 15, 0x4FFF00).setOrigin(0, 0).setDepth(1);
            this.evolutiontext = this.add.text(278, 132 , "NXTLVL", { fontSize: '12px', fontFamily: 'PressStart2P', fill: '#FFFACB' }).setDepth(2)
            this.evolutionbarcolor = this.add.rectangle(275, 130, 76, 15, 0xAA00CB).setOrigin(0, 0).setDepth(1);
            this.evolutionbarcolor.setScale(0, 1);
            this.timebarText = this.add.text(172, 79, 'T - 0', { fontSize: '12px', fontFamily: 'PressStart2P', fill: '#FFFACB' }).setDepth(2);
            this.vidasText = this.add.text(103, 78, 'x 3', { fontSize: '14px', fontFamily: 'PressStart2P', fill: '#FFFACB' }).setDepth(2);
            this.textScore = this.add.text(133, 11, 'Score : 0' ).setDepth(1);
            this.textScore.setFontSize(19);
            
            this.textScore.setColor('#FFF4CB')
            this.textScore.setFontFamily('PressStart2P');
            
            this.textLevel = this.add.text(282, 77, 'LVL 0' ).setDepth(1);
            this.textLevel.setColor('#FFF4CB')
            this.textLevel.setFontSize(12);
            this.textLevel.setFontFamily('PressStart2P');
    

        }

        create() {
        
        this.createBackground(this)
        this.anims.create({ key: 'fx1', frames: this.anims.generateFrameNumbers('fx1', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx2', frames: this.anims.generateFrameNumbers('fx2', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx3', frames: this.anims.generateFrameNumbers('fx3', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx4', frames: this.anims.generateFrameNumbers('fx4', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx5', frames: this.anims.generateFrameNumbers('fx5', { start: 0, end: 4 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx6', frames: this.anims.generateFrameNumbers('fx6', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx7', frames: this.anims.generateFrameNumbers('fx7', { start: 0, end: 7 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx8', frames: this.anims.generateFrameNumbers('fx8', { start: 0, end: 6 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx9', frames: this.anims.generateFrameNumbers('fx9', { start: 0, end: 6 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fxfire', frames: this.anims.generateFrameNumbers('fxfire', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fxsmoke', frames: this.anims.generateFrameNumbers('fxsmoke', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })

      
        
        this.AnimExplosao = this.anims.create({ key: 'explosao', frames: this.anims.generateFrameNumbers('explosao', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })
        //this.AnimFogo = this.anims.create({ key: 'fogo', frames: this.anims.generateFrameNumbers('fogo', { start: 0, end: 5 }), frameRate: 10, repeat: -1 })
        
        this.rockets =  new Phaser.GameObjects.Group(this)

        this.GrupoAsteroides = new Phaser.GameObjects.Group(this)
        this.GrupoTiros = new Phaser.GameObjects.Group(this)
        this.GrupoTirosInimigos = new Phaser.GameObjects.Group(this)
        this.GrupoInimigos = new Phaser.GameObjects.Group(this)
        this.GrupoSatelites = new Phaser.GameObjects.Group(this)
       

        


        this.titleScreen()
 
        this.input.keyboard.on('keydown', function () {
            
          this.destroy_titleScreen()
        }, this)
        
        
 
      


        this.input.keyboard.on('keydown-SPACE', function () {
            this.scene.pause()
            this.scene.launch('scene-pause');
            
        }, this)


        this.input.keyboard.on('keydown-ESC', function () {
            this.reset()
            this.scene.start('scene-game')
        }, this)
        



        //this.criaUI()

        //this.player = new Player(this, this.width/2, this.height-70)

           //this.startNextWave();
        
           
    

    }

    titleScreen()
    {

      this.imgTitleScreen = this.add.image(0,0 , 'titlescreen').setOrigin(0, 0).setScale(0.5);  

    }

    destroy_titleScreen()
    {
        if (!this.isTitleScreen) return
            
        this.isTitleScreen = false

        this.criaUI()            
        this.player = new Player(this, this.width/2, this.height-70)
        this.startNextWave();
        
        this.thruster = this.add.particles(0, 0, 'fxfire', {
            scale: { start: 2, end: 0    },
            alpha: { start: 1, end: 0 },
            rotate: { start: 0, end: 360, ease: 'Back.easeOut' },
            speed: { min: -100, max: -100 },
            lifespan: 150,
            frequency: 15,
            gravityY: 11190,
            blendMode: 'ADD'
        }).setDepth(1);
        
        this.imgTitleScreen.destroy()   


    }
    addInimigo  (x = 0, y = 0,inimigo = 'enemynave1') {

        const inim = new Inimigo(this, x, y, inimigo) 
    }
   
}

class Pausa extends Phaser.Scene {
    constructor() {
        super('scene-pause')
    }

    create() {
        this.add.rectangle(400/2, 400/2, 600, 1500, 0x000000, 0.5)
        this.add.text(400/2-35, 600/2, 'PAUSE').setFontFamily('PressStart2P');
        this.input.keyboard.on('keydown-SPACE', function () {
            this.scene.resume('scene-game')
            this.scene.stop()
        }, this)


    }
}


class GameOver extends Phaser.Scene {
    constructor() {
        super('scene-gameover')
    }

    create() {
        this.add.text(400/2-45, 600/2, 'GAMEOVER').setFontFamily('PressStart2P');
        this.input.keyboard.on('keydown-SPACE', function () {
            var game = this.scene.launch('scene-game')
            this.scene.stop()
        }, this)


    }
}


class Spawner {
    constructor(scene, x, y, tipo = bebezinho, qtd = 5) {
        this.scene = scene
        this.x = x
        this.y = y
        this.tipo = tipo
        this.qtd = qtd

        this.SelfDestruct = this.scene.time.addEvent({ delay: tempoSpawnInimigo*this.qtd, callback: this.destroi, callbackScope: this, loop: false });
        this.lançaInimigo = this.scene.time.addEvent({ delay: tempoSpawnInimigo, callback: this.LancaInimigo, callbackScope: this, loop: true });
    }

    destroi() {
        this.SelfDestruct = null
        this.LancaInimigo = null
        this.lançaInimigo.destroy()
        
    }
    LancaInimigo() {
        
        const inim = new Inimigo(this.scene, this.x, this.y, this.tipo )
        this.scene.GrupoInimigos.add(inim)
        

        this.qtd -= 1
        if (this.tipo == boss1 || this.tipo == boss2 || this.tipo == boss3) {
            this.qtd = 0
        }

        if (this.qtd <= 0) {
            this.destroi()
        }
        

    }
}
        

class TitleScene extends Phaser.Scene {
    constructor() {
        super('scene-title');
        this.texto;


        this.fundo;
    }
    preload() {
        // Carregue a imagem do logotipo
        this.load.image('logo', 'assets/Background/Stars.png');    
    
    }
    create() {
        // Adicione o texto "Pressione SPACE para começar"
        this.fundo = this.add.image(400/2, 600/2, 'logo').setOrigin(0.5, 0.5).setScale(1);
    
        this.texto = this.add.text(400/2-45-35, 600/2-30, 'NAVITAS');
        this.texto2 = this.add.text(400/2-63-35, 600/2+40-30, 'Press SPACE to start');
        this.texto.setFontFamily('Arial');
        this.texto2.setFontFamily('Arial');
        this.texto.setFontSize(40);
        this.texto2.setFontSize(20);
        // Crie um evento de teclado para detectar quando a tecla SPACE é pressionada
        this.input.keyboard.on('keydown-SPACE', this.startGame, this);
        // Crie um evento de toque para detectar quando a tela é tocada
        this.input.on('pointerdown', this.startGame, this);
        
        var fx1 = this.fundo.postFX.addGlow(0xff55ff, 0, 0, false, 0.1, 24)
        this.tweens.add({
            targets: fx1,
            outerStrength: 1,
            yoyo: true,
            loop: -1,
            ease: 'sine.inout'
        });
    }

    update(delta, time) {
       
        this.texto.rotation += Math.sin(delta / 200) / 500
        this.texto2.rotation += Math.sin(delta / 200) / 490

      //  this.fundo.tint= 0x000000 + Math.random()*100 * 0xffffff;
        this.fundo.scaleX +=  Math.sin(delta / 15)  / 375
        this.fundo.scaleY += Math.cos(delta / 5) /100


        this.texto.scaleX +=  Math.sin(delta / 150)  / 75
        this.texto.scaleY += Math.cos(delta / 50) /70

        this.texto2.scaleX +=  Math.sin(delta / 150)  / 75
        this.texto2.scaleY += Math.cos(delta / 150) /70


    }

    startGame() {
        // Inicie a cena do jogo principal
        this.scene.start('scene-game');
    }
}



class PowerUpSelectionScene extends Phaser.Scene {
    constructor() {
        super('PowerUpSelectionScene');
        this.escolha1
        this.escolha2
        this.escolha3
        this.escolha4
        
    }

    init (data)
    {
        // Receba os dados da cena anterior
        this.powerUp1Texture = data;
    }

    create() {
        // Crie os elementos visuais da cena, como botões para cada power up disponível
        
         const powerups =[tiroP, tiroB, satelite, tiroD,  missel, life, nukem]
         const escolha1 = powerups[Phaser.Math.Between(0, powerups.length-1)]
         powerups.splice(powerups.indexOf(escolha1), 1)
         const escolha2 = powerups[Phaser.Math.Between(0, powerups.length-1)]
            powerups.splice(powerups.indexOf(escolha2), 1)
         const escolha3 = powerups[Phaser.Math.Between(0, powerups.length-1)]    
            powerups.splice(powerups.indexOf(escolha3), 1)
         const escolha4 = powerups[Phaser.Math.Between(0, powerups.length-1)]
        this.escolha1 = escolha1
        this.escolha2 = escolha2
        this.escolha3 = escolha3
        this.escolha4 = escolha4


        const powerUp1Texture = this.scene.get('scene-game').textures.get(escolha1.icone);//tiro p
        const powerUp2Texture = this.scene.get('scene-game').textures.get(escolha2.icone);
        const powerUp3Texture = this.scene.get('scene-game').textures.get(escolha3.icone);
        

  
        const cardWidth = 120;
        const cardHeight = 170;
        const cardSpacing = 10;
        const startX = (this.cameras.main.width - (3 * cardWidth + 2 * cardSpacing)) +50;
        const startY = 300;

        const powerUpButton1 = this.add.rectangle(startX, startY, cardWidth, cardHeight, 0x444444);
        const powerUpButton2 = this.add.rectangle(startX + cardWidth + cardSpacing, startY, cardWidth, cardHeight, 0x444444);
        const powerUpButton3 = this.add.rectangle(startX + 2 * (cardWidth + cardSpacing), startY, cardWidth, cardHeight, 0x444444);

        const powerUpIcon1 = this.add.image(startX + cardWidth / 2 - 60, startY + cardHeight / 2 - 100,powerUp1Texture.key );
        const powerUpIcon2 = this.add.image(startX + cardWidth - 60+ cardSpacing + cardWidth / 2, startY + cardHeight / 2- 100, powerUp2Texture.key);
        const powerUpIcon3 = this.add.image(startX + 2 * (cardWidth + cardSpacing) - 60 + cardWidth / 2, startY + cardHeight / 2 - 100, powerUp3Texture.key);

        const powerUpText1 = this.add.text(startX + cardWidth / 2 - 95, startY + cardHeight / 2 - 80, escolha1.nome);        
        powerUpText1.setFontFamily('PressStart2P');
        powerUpText1.setFontSize(7);
        const powerUpText2 = this.add.text(startX + cardWidth - 95+ cardSpacing + cardWidth / 2, startY + cardHeight / 2- 80, escolha2.nome);
        powerUpText2.setFontFamily('PressStart2P');
        powerUpText2.setFontSize(7);
        const powerUpText3 = this.add.text(startX + 2 * (cardWidth + cardSpacing) - 95 + cardWidth / 2, startY + cardHeight / 2 - 80, escolha3.nome);
        powerUpText3.setFontFamily('PressStart2P');
        powerUpText3.setFontSize(7);
        // Defina o tamanho dos botões para 70% do tamanho atual
        powerUpButton1.setStrokeStyle(4, 0xefc53f);
        powerUpButton2.setStrokeStyle(4, 0xefc53f);
        powerUpButton3.setStrokeStyle(4, 0xefc53f);
        powerUpButton1.setScale(0.7);
        powerUpButton2.setScale(0.7);
        powerUpButton3.setScale(0.7);


        //----- reescrever essa parte para ficar mais limpa esta repetindo codigo
        // CONTINUE DAQUI, FOI FEITO APENAS O NUKEM NA PRIMEIRA CARTA, FALTA FAZER OS OUTROS

        // Adicione eventos de clique para cada botão
        powerUpButton1.setInteractive().on('pointerdown', () => {
            // Lógica para construir o Power Up 1

                 
            if (this.scene.get('scene-game').player.arma == escolha1){
                this.scene.get('scene-game').player.upaarma()
                console.log(this.scene.get('scene-game').player.arma.nivel)
                //this.scene.get('scene-game').player.timedEvent.delay -= 100

            }else{

               

                if (escolha1.tipo != 'satelite' && escolha1.tipo != 'rocket' && escolha1.tipo != 'life' && escolha1.tipo != 'shield' && escolha1.tipo != 'nukem') {
                    console.log(escolha1.tipo)
                    this.scene.get('scene-game').player.arma = escolha1
                    this.scene.get('scene-game').player.tipodetiro =escolha1.tipo
                    
                    this.scene.get('scene-game').player.timedEvent.delay = escolha1.frequencia
                }else{
                    if (escolha1.tipo == 'satelite') {
                        
                        this.scene.get('scene-game').player.lancaSatelite();

                    }else if(escolha1.tipo == 'rocket'){
                        if (this.scene.get('scene-game').player.hasRockets == true) {
                            this.scene.get('scene-game').player.nivelRockets += 1
                        }else{
                            this.scene.get('scene-game').player.hasRockets = true
                        }
                    }else if(escolha1.tipo == 'life'){
                        console.log('life')
                        this.scene.get('scene-game').player.lifePU()
                    }else if(escolha1.tipo == 'nukem'){
                        console.log('nukem')
                        
                        this.scene.get('scene-game').GrupoInimigos.getChildren().forEach(enemy => {
                                enemy.destroi();
                            });
                    

                    }

                }
        }


    
            this.scene.resume('scene-game')
            this.scene.stop()
        });

        powerUpButton2.setInteractive().on('pointerdown', () => {
            // Lógica para construir o Power Up 2
            
            if (this.scene.get('scene-game').player.arma == escolha2){
                this.scene.get('scene-game').player.upaarma()
                console.log(this.scene.get('scene-game').player.arma.nivel)
              //  this.scene.get('scene-game').player.timedEvent.delay -= 100

            }else{
              
                if (escolha2.tipo != 'satelite' && escolha2.tipo != 'rocket' && escolha2.tipo != 'life' && escolha2.tipo != 'shield') {
                    this.scene.get('scene-game').player.arma =escolha2
                    this.scene.get('scene-game').player.tipodetiro =escolha2.tipo
                    this.scene.get('scene-game').player.timedEvent.delay = escolha2.frequencia
                }else{

                    if (escolha2.tipo == 'satelite') {
                        this.scene.get('scene-game').player.lancaSatelite();
                    }else if(escolha2.tipo == 'rocket'){

                        if (this.scene.get('scene-game').player.hasRockets == true) {
                            this.scene.get('scene-game').player.nivelRockets += 1
                        }else{
                            this.scene.get('scene-game').player.hasRockets = true
                        }
                    
                    }else if(escolha2.tipo == 'life'){
                        console.log(escolha2.tipo)

                        this.scene.get('scene-game').player.lifePU()
                    }
                }
        }
       

            
            this.scene.resume('scene-game')
            this.scene.stop()
        });

        powerUpButton3.setInteractive().on('pointerdown', () => {
            // Lógica para construir o Power Up 3 
            //this.scene.get('scene-game').player.tipodetiro ='T'
            

            if (this.scene.get('scene-game').player.arma == escolha3){       
                this.scene.get('scene-game').player.upaarma()     
                console.log(this.scene.get('scene-game').player.arma.nivel)
               // this.scene.get('scene-game').player.timedEvent.delay -= 100

            }else{
                if (escolha3.tipo != 'satelite' && escolha3.tipo != 'rocket' && escolha3.tipo != 'life' && escolha3.tipo != 'shield' ) {
                    this.scene.get('scene-game').player.arma =escolha3
                    this.scene.get('scene-game').player.tipodetiro =escolha3.tipo
                    this.scene.get('scene-game').player.timedEvent.delay = escolha3.frequencia 
                }else{
                    if (escolha3.tipo == 'satelite') {
                        this.scene.get('scene-game').player.lancaSatelite();
                    }else if(escolha3.tipo == 'rocket'){
                           if (this.scene.get('scene-game').player.hasRockets == true) {
                            this.scene.get('scene-game').player.nivelRockets += 1
                        }else{
                            this.scene.get('scene-game').player.hasRockets = true
                        }
                    
                    }else if(escolha3.tipo == 'life'){
                        console.log(escolha3.tipo)

                        this.scene.get('scene-game').player.lifePU()
                    }
                }
            }
         
            


            

            
            this.scene.resume('scene-game')
            this.scene.stop()
        });
    }
}


const config = {
    type: Phaser.WEBGL,
    width: 400,
    height: 800,
    canvas: gameCanvas,
    pixelArt: true,
    fps:{
        target: 60,
        min: 30
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }

    },
    
    //scene: [TitleScene,GameScene,PowerUpSelectionScene , Pausa, GameOver]
    scene: [GameScene,PowerUpSelectionScene , TitleScene,Pausa, GameOver]
  }
const game = new Phaser.Game(config)