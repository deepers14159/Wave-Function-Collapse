var dmap = [];

function draw()
{
  reset();
  drawWorld();
  drawDebug();
}
function reset()
{
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvasW, canvasH);
}
function drawDebug()
{
  ctx.font = '15px Verdana';
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("test: ",10,50);
}
function drawWorld()
{
  for(var i = 0; i<size.x; i++)
  {
    for(var j = 0; j<size.y;j++)
    {
      ctx.fillStyle = map[i][j].getColorAverage();
      ctx.fillRect(i*size.px, j*size.px, size.px, size.px);


      ctx.font = '15px Verdana';
      ctx.fillStyle = "#FFFFFF";
      //if(Math.round(mouseX/size.px) == i && Math.round(mouseY/size.px) == j)
      ctx.fillText(i + " " + j, i*size.px + 5, j*size.px + size.px/2 - 5);
      ctx.fillText(map[i][j].getEntropy(), i*size.px + 5, j*size.px + size.px/2 + 15);

    }
  }
}
