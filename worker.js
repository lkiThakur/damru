onmessage=function (e) {
    console.log(e);
    if(e.data=='all moves sent'){}
    let move=e.data;
    let moveCaste
    moveCaste=Math.floor((move.length-1)/2)
movesRecived[moveCaste]=move
};
let movesRecived=[
    [],[],[],[],[],[],[],[],[],[]
];
function moveSelect(params) {
    let r=Math.random();
    let selection
    if(r<0.9){
        selection=randomElement(movesRecived[movesRecived.length-1])
    }else{
        let temp1=String(movesRecived);
        temp1=temp1.split(',');
        let temp2=[];
        temp1.forEach(e=>{
            if(e.length>0){temp2.push(e)}
        })
        selection=randomElement(temp2)
    } 
    return selection
}

function randomElement(inputArray) {
    return inputArray[Math.floor(Math.random() * inputArray.length)];
};
function download(filename, text) {//copied from web
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}