class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.xposition=0
    this.rank=null;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  getcarsatEnd(){
    var playerCountRef = database.ref('carsatEnd');
    playerCountRef.on("value",(data)=>{
      this.rank= data.val();
    })
  }


  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      xposition:this.xposition
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
    
  }
  static removeplayerInfo(){
    var playerInfoRef = database.ref('players');
     playerInfoRef.remove()
     
    }
    static updatecarsatEnd(rank){
      database.ref('/').update({
        carsatEnd:rank
      });
      
    }
}
