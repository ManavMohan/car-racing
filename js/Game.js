class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1img)
    car2 = createSprite(300,200);
    car2.addImage("car2",car2img)
    car3 = createSprite(500,200);
    car3.addImage("car3",car3img)
    car4 = createSprite(700,200);
    car4.addImage("car4",car4img)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getcarsatEnd();


    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(groundimg)
      image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 205;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x=(310*index)+allPlayers[plr].xposition;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;


        if (index === player.index){
         fill("red")
         ellipse(x,y,60,60)
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        textSize(20);
        textAlign(CENTER)
        fill("black")
        text(allPlayers[plr].name, cars[index-1].x ,cars[index-1].y+75)
        
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      //console.log("hi")
      player.xposition-=3
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      //console.log("hi")
      player.xposition+=3
      player.update();
    }


   if(player.distance>4200){
     player.rank=player.rank+1
     Player.updatecarsatEnd(player.rank)
     gameState=2
   }
   if(gameState===2){
     game.end()
   }
    drawSprites();
  }
  end(){
    alert("GAME ENDED!!! \n playerrank is :"+player.rank)
    gameState=0;

  }
}
