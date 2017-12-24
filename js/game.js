const Game=function () {
  this.angryBird=new AngryBird(480,400);
  this.score=0;
}

Game.prototype={
  updateScore:function () {
    this.score+=10;
  }
}
