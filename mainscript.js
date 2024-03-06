
class Example extends Phaser.Scene
{

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

 
         
         this.input.keyboard.on('keydown-W', () => {
            console.log('Player pressed W key!');
            console.log(player.sprite.visible )
            player.sprite.visible = false;
            // this.scene.remove(player );

          });


                this.sprites = this.physics.add.group({ immovable: false });

                let sprite = this.sprites.create(this.random(1700), this.random(900), 'bird');
                
                sprite.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true).setGravityY(200);

                
    // Spawn object every 2 seconds
    const spawnInterval = 1000; // milliseconds

    const spawnTimer = this.time.addEvent({
      delay: spawnInterval,
      callback: () => {
        // Create and position your object here

        // this.sprite = this.physics.add.image(this.random(1700), this.random(900), 'lemming');

        for (let i = 0; i < Math.random()*2+1; i++) {

        let sprite = this.sprites.create(this.random(1700), this.random(900), 'bird');
        sprite.setVelocity(500, 200).setBounce(1, 1).setCollideWorldBounds(true).setGravityY(200);
        sprite.setSize(100, 60);
        this.physics.add.existing(sprite);

        console.log(this.sprite);}


        // ... additional object configuration

        // Optional: Restart the timer for continuous spawning
        // spawnTimer.reset();
      },
      loop: true, // Set loop to true for continuous spawning
    });
  

    }


    update ()
    {
               

        this.physics.overlap(this.sprites, this.mush, (sprite, mushroom) =>
        {
            // sprite.destroy();
            // mushroom.destroy();
            // sprite.visible = false;
            // mushroom.visible = false;

            sprite.angle = 90;
            mushroom.angle = 90;

            const mouseX = this.input.mousePointer.x;
            const mouseY = this.input.mousePointer.y;

            // Use the mouse coordinates for your game logic
            // For example, display the coordinates on the screen
            let text = this.add.text(mouseX, mouseY, `+`, { font: '32px Arial', fill: '#ffffff' });


            setTimeout(() => {
                // Code to be executed after the delay
                text.visible = false;
              }, 200); // Delay in milliseconds


            sprite.setVelocity(0, 1000).setCollideWorldBounds(false).setGravityY(0);
            mushroom.setVelocity(0, 1000).setCollideWorldBounds(false).setGravityY(0);

        });




    }
}



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


