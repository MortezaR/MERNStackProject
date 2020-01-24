const isBetween = (target, start, end) => {
    return start <= target && end >= target ? true : false;
}

const getDir = (sX,sY,eX,eY) => {
    let rX = eX - sX;
    let rY = eY - sY;
    let mag = Math.sqrt(rX*rX + rY*rY);
    return [rX/mag, rY/mag];
}
const calcHitBox = (dir, hitBoxSize, sX, sY) =>{
    let [dirX, dirY] = dir;
    let [hbW, hbH] =  hitBoxSize;
    let p1 = [sX - dirY * (hbW / 2), sY + dirX * (hbW / 2)];
    let p4 = [sX + dirY * (hbW / 2), sY - dirX * (hbW / 2)];
    let p2 = [p1[0] + dirX * hbH, p1[1] + dirY * hbH ];
    let p3 = [p4[0] + dirX * hbH, p4[1] + dirY * hbH ];
    return [p1,p2,p3,p4];
}
const hitBoxTouch = (coord1, coord2) => {
    let retVal = false;
    coord1.forEach(coord => {
        if(isInside(coord[0], coord[1], coord2)){
            retVal = true;
            return retVal;
        }
    })
    coord2.forEach(coord => {
        if(isInside(coord[0], coord[1], coord1)){
            retVal = true;
            return retVal;
        }
    })
    return retVal;
}

const isInside = (tX, tY, coord) => {
    let [p1, p2, p3, p4] = coord;
    let l1 = findLine(p1[0], p1[1], p2[0], p2[1]);
    let l2 = findLine(p2[0], p2[1], p3[0], p3[1]);
    let l3 = findLine(p3[0], p3[1], p4[0], p4[1]);
    let l4 = findLine(p4[0], p4[1], p1[0], p1[1]);
    let l1LT = tY >= (-(l1.a * tX) - l1.c) / l1.b ? true : false;
    let l2LT = tY >= (-(l2.a * tX) - l2.c) / l2.b ? true : false;
    let l3LT = tY >= (-(l3.a * tX) - l3.c) / l3.b ? true : false;
    let l4LT = tY >= (-(l4.a * tX) - l4.c) / l4.b ? true : false;
    return (l1LT + l3LT === 1 && l2LT + l4LT === 1) ? true : false;
}
const findLine = (firstX, firstY, secondX, secondY) => {
    let a = secondY - firstY;
    let b = firstX - secondX;
    let c = a * (secondX) + b * (secondY);
    if (b === 0 && a >= 0){
        b = 0.0001;
    }else if( b=== 0){
        b = -0.0001;
    }
    return { a: a, b: b, c: -c };
}


module.exports = {
    isBetween: isBetween,
    getDir: getDir,
    calcHitBox: calcHitBox,
    hitBoxTouch: hitBoxTouch,
    isInside: isInside,
    hitBoxTouch: hitBoxTouch
}