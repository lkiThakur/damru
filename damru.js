let piecePosition=[
    //  [1,0,1,0,1],
    //  [0,1,1,1,0],
    //  [0,0,3,0,0],
    //  [0,2,2,2,0],
    //  [2,0,2,0,2],
     [3,0,1,0,3],
     [0,1,1,1,0],
     [0,0,3,0,0],
     [0,1,1,2,0],
     [2,0,1,0,3],
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
 let killMessage
 function movePossible(position){
   position=String(position)
  road[position].forEach(e => {
    if(piecePosition[e[1]][e[0]]==3){
      console.log(`can displace ${position} to ${e}`)//can peacefully displace from position to e
      thinker.postMessage(position+e)
    };
    let canKill=piecePosition[e[1]][e[0]]==3-piecePosition[+position[1]][+position[0]]&&piecePosition[2*+e[1]-+position[1]][2*+e[0]-+position[0]]==3
    if(canKill){
      killMessage=`.${position}${2*+e[0]-+position[0]}${2*+e[1]-+position[1]}`;
      thinker.postMessage(killMessage);
      let cpypiecePosition=JSON.parse(JSON.stringify(piecePosition));
      multikill(position,e,killMessage);    
     
      function multikill(initial,j,message) {//j is the opponents position
        cpypiecePosition=JSON.parse(JSON.stringify(piecePosition));
        if(message=='.0422'){debugger}
        executeMessage(message,cpp)
       road[ap(initial,j)].forEach(p => {
         if(ap(initial,j)=='22'&&p=='31'){debugger}
         if(mkill=cpp(p)==3-+cpp(ap(initial,j))&&cpp(ap(ap(initial,j),p))==3){
           //message+=ap(ap(initial,j),p)
          thinker.postMessage(message+ap(ap(initial,j),p))
          multikill(ap(initial,j),p,message+ap(ap(initial,j),p))
         }
       });
       function cpp(coordinateString,value=undefined) {
        if(value==undefined){return cpypiecePosition[coordinateString[1]][coordinateString[0]]}
        cpypiecePosition[coordinateString[1]][coordinateString[0]]=value
       };
       }
    }
  });
 }
 
 const thinker=new Worker('worker.js');
function pp(coordinateString,value=undefined) {
  if (value==undefined) {
    return piecePosition[coordinateString[1]][coordinateString[0]]
  }
  piecePosition[coordinateString[1]][coordinateString[0]]=value
};

function ap(a1,a2) {//third term of ap
  a1=String(a1)
  a2=String(a2);
  let a3= String(2*+a2[0]-+a1[0])+String(2*+a2[1]-+a1[1])
  return a3
}
function executeMessage(mdata,targetArray=pp) {
  
  mdata=mdata.replace('.','');
 for(let n=0;n<mdata.length-2;n+=2){
 let p1=mdata.slice(n,n+2);
 let p2=mdata.slice(n+2,n+4);
 targetArray(p2,targetArray(p1));
 targetArray(p1,3)
 let midPoint=`${(+p1[0]+(+p2[0]))/2}${(+p1[1]+(+p2[1]))/2}`
 if(targetArray(midPoint)){targetArray(midPoint,3)}
 }
}