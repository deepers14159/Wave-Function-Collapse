const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

var map = [];
var mapSet = [];
var mapEntropy = [];
var source = [];
var color2id = {};
var id2color = {};
var id2weight = {};

var rules = [];

var numTiles = 0;

//GENERAL
function floatEquals(x, y, error)
{
  if(Math.abs(x - y) < error)
    return true;
  return false;
}
function getRandOnDistribution(dist)
{
  var sum = 0;

   for(var i = 0; i < dist.length; i++)
      sum += dist[i];

  var rand = Math.random()*sum;

  var count = 0;
  var checker = dist[0];

  while(rand > checker)
  {
    count++;
    checker += dist[count];
  }

  return count;
}

//COLOR STUFF
function rgb2string(color)
{
  out = "#";
  out+= decimal2hexchar(Math.floor(color.r/16));
  out+= decimal2hexchar(color.r%16);
  out+= decimal2hexchar(Math.floor(color.g/16));
  out+= decimal2hexchar(color.g%16);
  out+= decimal2hexchar(Math.floor(color.b/16));
  out+= decimal2hexchar(color.b%16);
  return out;
}
function string2rgb(colorString)
{
  color = {r : 0, g : 0, b : 0};
  color.r = hexchar2decimal(colorString.charAt(1)) * 16 + hexchar2decimal(colorString.charAt(2));
  color.g = hexchar2decimal(colorString.charAt(3)) * 16 + hexchar2decimal(colorString.charAt(4));
  color.b = hexchar2decimal(colorString.charAt(5)) * 16 + hexchar2decimal(colorString.charAt(6));
  return color;
}
function hexchar2decimal(hexchar)
{
  var out = hexchar.charCodeAt(0) - "0".charCodeAt(0);
  if(out >= 0 && out <=9)
    return out;
  return hexchar.charCodeAt(0) - "A".charCodeAt(0) + 10;
}
function decimal2hexchar(decimal)
{
  if(decimal >= 0 && decimal <=9)
    return String.fromCharCode(decimal +  "0".charCodeAt(0));
  return String.fromCharCode(decimal + "A".charCodeAt(0)-10);
}

//FOR MAP
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
function setMap(coord, id, value)
{
  if(!isVaid(coord))
    return;
  map[coord.x][coord.y][id] = value;
}
function getMap(coord, id)
{
  if(!isVaid(coord))
    return null;
  return map[coord.x][coord.y][id];
}

// FOR SOURCE
function getMovedCoordSource(coord, direction)
{
  tempCoord = {x : coord.x, y : coord.y};
  if(direction == UP)
      {
          tempCoord.x-=1;
          tempCoord.x+=source.length;
          tempCoord.x%=source.length;
      }
  if(direction == DOWN)
      {
          tempCoord.x+=1;
          tempCoord.x+=source.length;
          tempCoord.x%=source.length;
      }
  if(direction == LEFT)
      {
          tempCoord.y+=1;
          tempCoord.y+=source[0].length;
          tempCoord.y%=source[0].length;
      }
  if(direction == RIGHT)
      {
          tempCoord.y-=1;
          tempCoord.y+=source[0].length;
          tempCoord.y%=source[0].length;
      }
  return tempCoord;
}
function isVaidSource(coord)
{
  if(coord.x >= 0 && coord.x < source.length)
    if(coord.y >= 0 && coord.y < source[0].length)
      return true;
  return false;
}
function getSource(coord)
{
  return source[coord.x][coord.y];
}
