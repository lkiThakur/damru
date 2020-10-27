function addRoad(abxy) {
    let c = abxy.slice(0, 2);
    let d = abxy.slice(2, 4);
    addcd();
    c = String(4 - (+c[0])) + String(c[1]);
    d = String(4 - (+d[0])) + String(d[1]);
    addcd();
    c = String(c[0]) + String(4 - c[1]);
    d = String(d[0]) + String(4 - d[1]);
    addcd();
    c = String(4 - (+c[0])) + String(c[1]);
    d = String(4 - (+d[0])) + String(d[1]);
    addcd();
    function addcd() {
        if (!road[c]) { road[c] = []; }
        if (!road[d]) { road[d] = []; }

        if (!road[c].includes(d)) {
            road[c].push(d);
        }
        if (!road[d].includes(c)) {
            road[d].push(c);
        }
    }
}
addRoad("0020");
addRoad("0011");
addRoad("1121");
addRoad("1122");
addRoad("2021");
addRoad("2122");
