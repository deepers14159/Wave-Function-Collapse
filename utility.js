const UP = "up";
const DOWN = "down";
const LEFT = "left";
const RIGHT = "right";

var map = [];
var source = [];
var color2id = {};
var id2weight = {};
var rules = {};

var numTiles;

class Rule {
  constructor(a, b, direction)
  {
    this.a = a;
    this.b = b;
    this.direction = direction;
  }
}
function rule2string(rule)
{
  return rule.a + " " + rule.b + " " + rule.direction;
}
function getCoord(i, j)
{
  var coord = {x : i, y : j};
  return coord;
}
function getMovedCoord(coord, direction)
{
  tempCoord = {x : coord.x, y : coord.y};
  if(direction == UP)
      {
          tempCoord.x-=1;
          tempCoord.x+=size.x;
          tempCoord.x%=size.x;
      }
  if(direction == DOWN)
      {
          tempCoord.x+=1;
          tempCoord.x+=size.x;
          tempCoord.x%=size.x;
      }
  if(direction == LEFT)
      {
          tempCoord.y+=1;
          tempCoord.y+=size.y;
          tempCoord.y%=size.y;
      }
  if(direction == RIGHT)
      {
          tempCoord.y-=1;
          tempCoord.y+=size.y;
          tempCoord.y%=size.y;
      }
  return tempCoord;
}
function isVaid(coord)
{
  if(coord.x >= 0 && coord.x < size.x)
    if(coord.y >= 0 && coord.y < size.y)
      return true;
  return false;
}
function isVaidSource(coord)
{
  if(coord.x >= 0 && coord.x < source.length)
    if(coord.y >= 0 && coord.y < source[0].length)
      return true;
  return false;
}
function setMap(coord, value)
{
  if(!isVaid(coord))
    return;
  map[coord.x][coord.y] = value;
}
function getMap(coord)
{
  if(!isVaid(coord))
    return null;
  return map[coord.x][coord.y];
}
function getMovedCoordSource(coord, direction)
{
  tempCoord = {x : coord.x, y : coord.y};

  if(direction == UP)
    tempCoord.x-=1;
  if(direction == DOWN)
    tempCoord.x+=1;
  if(direction == LEFT)
    tempCoord.y+=1;
  if(direction == RIGHT)
    tempCoord.y-=1;

  return tempCoord;
}
function getSource(coord)
{
  return source[coord.x][coord.y];
}
