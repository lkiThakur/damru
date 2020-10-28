let piecePosition=[
    //  [1,0,1,0,1],
    //  [0,1,1,1,0],
    //  [0,0,3,0,0],
    //  [0,2,2,2,0],
    //  [2,0,2,0,2],
     [1,0,3,0,1],
     [0,1,1,1,0],
     [0,0,3,0,0],
     [0,2,1,2,0],
     [2,0,2,0,2],
];
let turnOf=1;
let road={"11": [ "00", "21", "22"],
          "13": [ "04", "23", "22"],
          "20": [ "00", "40", "21"],
          "21": [ "11", "31", "20", "22"],
          "22": [ "11", "31", "33", "13", "21", "23"],
          "23": [ "33", "13", "24", "22"],
          "24": [ "44", "04", "23"],
          "31": [ "40", "21", "22"],
          "33": [ "44", "23", "22"],
          "40": [ "20", "31"],
          "44": [ "24", "33"],
          "00": [ "20", "11"],
          "04": [ "24", "13"] 
 }
 let cpyPiecePosition=piecePosition
 let killMessage
 function movePossible(position,checkingMultikill=false){
   if(!checkingMultikill){cpyPiecePosition=piecePosition}
   position=String(position)
  road[position].forEach(e => {
    if(cpyPiecePosition[e[1]][e[0]]==3&&!checkingMultikill){
      console.log(`can displace ${position} to ${e}`)//can peacefully displace from position to e
      thinker.postMessage(position+e)
    };
    let canKill=cpyPiecePosition[e[1]][e[0]]==3-cpyPiecePosition[+position[1]][+position[0]]&&cpyPiecePosition[2*+e[1]-+position[1]][2*+e[0]-+position[0]]==3
    if(canKill){
      
      console.log(`can kill ${e[0]}${e[1]}`);
      if(!checkingMultikill){killMessage=`.${position}`}
      killMessage+=String(2*+e[0]-+position[0])+String(2*+e[1]-+position[1])
      cpyPiecePosition[2*+e[1]-+position[1]][2*+e[0]-+position[0]]=cpyPiecePosition[+position[1]][+position[0]]
      cpyPiecePosition[+position[1]][+position[0]]=3;
      cpyPiecePosition[e[1]][e[0]]=3;
      
     movePossible(String(2*+e[0]-+position[0])+String(2*+e[1]-+position[1]),true)
    }else if(!!killMessage&&checkingMultikill){thinker.postMessage(killMessage);killMessage=''}
  });
 }
 
 const thinker=new Worker('worker.js');