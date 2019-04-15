const UP = "up";
const DOWN = "down";
const LEFT = "left";
const RIGHT = "right";

var map = [];
var mapSet = [];
var mapEntropy = [];
var source = [];
var color2id = {};
var id2color = {};
var id2weight = {};
var rules = {};

var numTiles;

function floatEquals(x, y, error)
{
  if(Math.abs(x - y) < error)
    return true;
  return false;
}
function getEntropy(isUsed)
{
  var sum_of_weights = 0;
  var sum_of_weighted_weights = 0;
  var count = 0;

  for(var i = 0; i < numTiles; i++)
  {
    if(isUsed[i])
    {
      sum_of_weights += id2weight[i];
      sum_of_weighted_weights += id2weight[i] * Math.log(id2weight[i]);
      count++;
    }
  }

  if(count == 0)
    return -1;
  return Math.log(sum_of_weights) - sum_of_weighted_weights/sum_of_weights;
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

function getColorAverage(isUsed)
{
  var count = 0;
  var colorAvg = {r : 0, g : 0, b : 0};
  var tempColor;
  for(var i = 0; i < numTiles; i++)
  {
    if(isUsed[i])
    {
      //console.log(i);
      //console.log(id2color[i]);
      //console.log(string2rgb(id2color[i]));

      tempColor = string2rgb(id2color[i]);
      colorAvg.r += tempColor.r;
      colorAvg.g += tempColor.g;
      colorAvg.b += tempColor.b;
      count++;
    }
  }
  colorAvg.r = Math.round(colorAvg.r/count);
  colorAvg.g = Math.round(colorAvg.g/count);
  colorAvg.b = Math.round(colorAvg.b/count);

  return rgb2string(colorAvg);
}
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
