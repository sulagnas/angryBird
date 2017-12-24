const AngryBird=function (top,left) {
  this.top=top;
  this.left=left;
}

AngryBird.prototype={
  moveLeft:function (distanceToMove) {
    this.left-=distanceToMove;
    return this.left;
  },
  moveUp:function (distanceToMove) {
    this.top-=distanceToMove;
    return this.top;
  },
  moveRight:function (distanceToMove) {
    this.left+=distanceToMove;
    return this.left;
  },
  moveDown:function (distanceToMove) {
    this.top+=distanceToMove;
    return this.top;
  }
}
