
class Example extends Phaser.Scene
{

    score = 0;
    shoots = 0;
    scoreText = '';
    doitonce = true;
    enemycount = 0;
    spawnInterval = 1000;
    speed = 600; 
    difficulty = 'moyen';
    birdevaded = 0;


    preload ()
    {
        this.load.setBaseURL('./');

        this.load.image('bird', './Bird01_00.png');


    }


    random(num){

        return Math.floor(Math.random() * num);

    }


    create ()
    {

      gameparams.speedText = this.add.text(100, 60, `Press 1, 2 or 3 to alterate difficulty, current: ${gameparams.difficulty}`, { font: '32px Arial', fill: '#ffffff' });
        
        gameparams.scoreText = this.add.text(100, 100, `Score:${gameparams.score}`, { font: '32px Arial', fill: '#ffffff' });

        gameparams.shootsText = this.add.text(100, 140, `Shoots:${gameparams.shoots}`, { font: '32px Arial', fill: '#ffffff' });

        gameparams.accuracyText = this.add.text(100, 180, `Accuracy:${gameparams.score/gameparams.shoots}%`, { font: '32px Arial', fill: '#ffffff' });

        gameparams.birdText = this.add.text(100, 220, `Birds evaded: ${gameparams.birdevaded}, ${gameparams.birdevaded/(gameparams.birdevaded+gameparams.score)}%`, { font: '32px Arial', fill: '#ffffff' });


         this.input.keyboard.on('keydown-ONE', () => {
            
            gameparams.speed = 400;

            gameparams.difficulty = 'facile';


            
          });

          this.input.keyboard.on('keydown-TWO', () => {
          
            gameparams.speed = 600 ;

            gameparams.difficulty = 'moyen';


          });

          this.input.keyboard.on('keydown-THREE', () => {
          
            gameparams.speed = 800 ;

            gameparams.difficulty = 'difficile';

          });


          this.input.on('pointerdown', (pointer) => {

      

           let  particles = this.add.particles(this.input.mousePointer.x, this.input.mousePointer.y, 'bird', {
                speed: 100,
                scale: { start: 0.1, end: 0.1 },
                blendMode: 'ADD'
            })
            
            setTimeout(() => {
                // Code to be executed after the delay
                particles.visible = false;
              }, 500); // Delay in milliseconds



            this.mush = this.physics.add.group({ immovable: true });

            const log = this.mush.create(this.input.mousePointer.x, this.input.mousePointer.y, 'bird');
             log.setScale(0.01);
             log.visible = false;

            this.physics.add.existing(log);
     
         
          });

 
         
         this.input.on('pointerdown', () => {

            gameparams.doitonce = true;

            gameparams.shoots = gameparams.shoots+1;

            gameparams.shootsText.setText(`Shoots: ${gameparams.shoots}`);

            gameparams.accuracyText.setText(`Accuracy: ${Math.floor(gameparams.score/gameparams.shoots*100)}%`);


          });


          this.events.on('scoreUpdated', (data) => {

            console.log(data);

            gameparams.score = gameparams.score+1;

            gameparams.scoreText.setText(`Score: ${gameparams.score}`);

            gameparams.accuracyText.setText(`Accuracy: ${Math.floor(gameparams.score/gameparams.shoots*100)}%`);

            gameparams.enemycount = gameparams.enemycount-1;

            let sprite = this.sprites.create(0, this.random(900), 'bird');
            sprite.setVelocity(gameparams.speed, 0).setBounce(1, 1).setGravityY(0);
            sprite.setSize(100, 60);
            this.physics.add.existing(sprite);
    
            gameparams.enemycount = gameparams.enemycount+1;

           });


           this.events.on('birdEvaded', (spritefromevent) => {

            console.log(spritefromevent);

            console.log(this.sprites);

            this.sprites.remove(spritefromevent); 

            gameparams.birdevaded+=1;

            let sprite = this.sprites.create(0, this.random(900), 'bird');
            sprite.setVelocity(gameparams.speed, 0).setBounce(1, 1).setGravityY(0);
            sprite.setSize(100, 60);
            this.physics.add.existing(sprite);

           });

            this.sprites = this.physics.add.group({ immovable: false });

    // Spawn object every 2 seconds
   // milliseconds

    const spawnTimer = this.time.addEvent({
        delay: gameparams.enemycount < 10 ? gameparams.spawnInterval : 10000000,
      callback: () => {
        // Create and position your object here

        // this.sprite = this.physics.add.image(this.random(1700), this.random(900), 'lemming');

        let sprite = this.sprites.create(0, this.random(900), 'bird');
        sprite.setVelocity(gameparams.speed, 0).setBounce(1, 1).setGravityY(0);
        sprite.setSize(100, 60);
        this.physics.add.existing(sprite);

        gameparams.enemycount = gameparams.enemycount+1;


        // ... additional object configuration  

        // Optional: Restart the timer for continuous spawning
        console.log(gameparams.enemycount);
        console.log(spawnTimer.delay);

       if ((this.sprites.children.entries.length > 5)) {
        spawnTimer.reset();
        
        }
        

      },
      loop: true, // Set loop to true for continuous spawning
    });

    console.log(spawnTimer.delay);
    
    

    }

     getRandomColor() {
        // Generate random values for red, green, and blue (0-255)
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
      
        // Return the color in hexadecimal format (e.g., "#FF0000")
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      }



    update () 
    {
      
        // console.log(gameparams.enemycount);

        this.sprites.children.entries.forEach(sprite => {

            if(sprite.x>2000){ this.events.emit('birdEvaded', sprite); };


        });

        console.log(this.sprites.children.entries.length);

        gameparams.speedText.setText(`Press 1, 2 or 3 to alterate difficulty, current: ${gameparams.difficulty}`);

        gameparams.birdText.setText(`Birds evaded: ${gameparams.birdevaded}, ${Math.floor(gameparams.birdevaded/(gameparams.birdevaded+gameparams.score)*100)}%`);

        const mouseX = this.input.mousePointer.x;
        const mouseY = this.input.mousePointer.y;

        let text = this.add.text(mouseX, mouseY, `+`, { font: '32px Arial', fill: this.getRandomColor()});
                
        setTimeout(() => {
            // Code to be executed after the delay
            text.visible = false;

          }, 150); // Delay in milliseconds


        if (gameparams.doitonce == true){

        this.physics.overlap(this.sprites, this.mush, (sprite, mushroom) =>
        {
            // sprite.destroy();
            // mushroom.destroy();

            sprite.angle = 90;
            mushroom.angle = 90;
    
            // Use the mouse coordinates for your game logic
            // For example, display the coordinates on the screen
           

                this.events.emit('scoreUpdated');

                gameparams.doitonce = false;
            
           
            setTimeout(() => {
                // Code to be executed after the delay
                sprite.visible = false;
                mushroom.visible = false;
              }, 1000); // Delay in milliseconds


            sprite.setVelocity(0, 1000).setCollideWorldBounds(false).setGravityY(0);
            mushroom.setVelocity(0, 1000).setCollideWorldBounds(false).setGravityY(0);

        });
    }
    }



    }


const gameparams = new Example();

console.log(gameparams);

const config = {
    type: Phaser.AUTO,
    width: 1800,
    height: 1000,
    scene: Example,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};

const game = new Phaser.Game(config);


