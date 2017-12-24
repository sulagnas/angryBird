let game=new Game();
let numOfJump=0;

const moveBirdLeft=function () {
  let angryBird=document.getElementById('redAngry');
  if(game.angryBird.left>=20&&game.angryBird.left<=400){
    angryBird.style.left=game.angryBird.moveLeft(10)+'px';
  }
};

const moveBirdUp=function () {
  let angryBird=document.getElementById('redAngry');
  if(game.angryBird.top>=350){
    angryBird.style.top=game.angryBird.moveUp(10)+'px';
  }
};

const moveBirdRight=function () {
  let angryBird=document.getElementById('redAngry');
  if (game.angryBird.left<400) {
    angryBird.style.left=game.angryBird.moveRight(10)+'px';
  }
};

const moveBirdDown=function () {
  let angryBird=document.getElementById('redAngry');
  if(game.angryBird.top<=550){
    angryBird.style.top=game.angryBird.moveDown(10)+'px';
  }
};

const flyOnlyOnce=function () {
  ++numOfJump;
  if(numOfJump>1){
    document.onkeyDown=disableKey();
  }
  else{
    startFly();
  }
};

const startFly=function () {
  let leftPosBeforeFly=game.angryBird.left+10;
  let topPosBeforeFly=game.angryBird.top-10;
  flyAndHit(leftPosBeforeFly,topPosBeforeFly,);
};

const disableKey=function () {
  return false;
};

const birdMove={
  '37':moveBirdLeft,
  '38':moveBirdUp,
  '39':moveBirdRight,
  '40':moveBirdDown,
  '32':flyOnlyOnce
};

const getPossibilityList=function (number,multipleOf) {
  let possibilityList=[];
  let largeMultiplier=Math.floor(number/multipleOf);
  let smallMultiplier=Math.ceil(number/multipleOf);
  possibilityList.push(multipleOf*largeMultiplier);
  possibilityList.push(multipleOf*smallMultiplier);
  return possibilityList;
};

const getNearestMultipleOf=function (number,multipleOf) {
  let possibilityList=getPossibilityList(number,multipleOf);
  return possibilityList.filter(function(element){
    return Math.abs(element-number)<=35;
  });
};

const getPositionOfHit=function (nearestMultiple) {
  return (nearestMultiple/70)-2;
};

const getMangoList=function () {
  let mango1=document.getElementById('mango1');
  let mango2=document.getElementById('mango2');
  let mango3=document.getElementById('mango3');
  let mango4=document.getElementById('mango4');
  let mango5=document.getElementById('mango5');
  let mango6=document.getElementById('mango6');
  return [mango1,mango2,mango3,mango4,mango5,mango6];
};

const makeMangoInvisible=function (nearestMultiple) {
  var sound = document.getElementById('collision');
  retry=document.getElementById('retry');
  sound.play();
  let positionOfHit=getPositionOfHit(nearestMultiple);
  let mangoList=getMangoList();
  for(let index=0;index<positionOfHit;index++){
    mangoList[index].style.visibility='hidden';
  }
  retry.style.visibility='visible';
};

const showPlayerWin=function () {
  let allMango=document.getElementById('allMango');
  let sound = document.getElementById('winning');
  let redAngry=document.getElementById('redAngry');
  let youWin=document.getElementById('youWin');
  allMango.style.visibility='hidden';
  youWin.style.visibility='visible';
  sound.play();
  redAngry.src='images/dancingAngryBird.gif';
  youWin.visibility='visible';
};

const getResultOfHit=function (topOfaAngryBird,leftPosBeforeFly,topPosBeforeFly) {
  let nearestMultiple=getNearestMultipleOf(topOfaAngryBird,70)[0];
  if(topOfaAngryBird>=550 && topOfaAngryBird<=580){
    showPlayerWin();
  }
  if (topOfaAngryBird<500) {
    makeMangoInvisible(nearestMultiple);
  }
};

const flyInBottomRight=function (angryBird,leftPosBeforeFly,topPosBeforeFly) {
  if(game.angryBird.left>=1050&&game.angryBird.left<=1153){
    getResultOfHit(game.angryBird.top,leftPosBeforeFly,topPosBeforeFly);
  }
  angryBird.style.left=game.angryBird.moveRight(2)+'px';
  angryBird.style.top=game.angryBird.moveDown(5)+'px';
};

const flyInRight=function (angryBird) {
  angryBird.style.left=game.angryBird.moveRight(2)+'px';
  angryBird.style.top=game.angryBird.moveUp(1)+'px';
};

const flyInTopRight=function (angryBird) {
  angryBird.style.left=game.angryBird.moveRight(2)+'px';
  angryBird.style.top=game.angryBird.moveUp(3)+'px';
};

const flyAndHit=function (leftPosBeforeFly,topPosBeforeFly) {
  var sound = document.getElementById('voice');
  sound.play();
  let numOfInterval=0;
  let fly=function () {
    let angryBird=document.getElementById('redAngry');
    if(game.angryBird.top>=570||game.angryBird.left>=1200){
      clearInterval(jump);
    }
    if(numOfInterval>=120){
      flyInBottomRight(angryBird,leftPosBeforeFly,topPosBeforeFly);
    }
    if(numOfInterval>=100&&numOfInterval<120){
      flyInRight(angryBird);
    }
    else{
      flyInTopRight(angryBird);
    }
    ++numOfInterval;
  }
  let jump=setInterval(fly,10);
};

const move=function (event) {
  var sound = document.getElementById('move');
  sound.play();
  let keyCodeList=[32,37,38,39,40];
  if(keyCodeList.includes(event.keyCode)){
    birdMove[event.keyCode.toString()]();
  }
};
