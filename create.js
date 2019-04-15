var numCompleted;

function create()
{
  initMap();
  initSourceDictionary();
  initRules();

  initMap2();

  //while(numCompleted != size.x * size.y)
  //{
  //for(var i = 0; i < 100; i++)

  //}
}
function update()
{
  sizeAdjust();
  updateOnePixel();
  draw();
}
function updateOnePixel()
{
  var coordLE = getLowestEntropy();
  //while(coordLE.x != -1)
  //{
    collaspe(coordLE);
    //coordLE = getLowestEntropy();
  //}
  //numCompleted++;
}
function collaspe(coord)
{
  var dist = [];
  var realVal;
  for(var i = 0; i < numTiles; i++)
  {
    dist[i] = 0;
    if(map[coord.x][coord.y][i] == true)
      dist[i] = id2weight[i];
  }
  realVal = getRandOnDistribution(dist);
  for(var i = 0; i < numTiles; i++)
  {
    map[coord.x][coord.y][i] = false;
    if(i == realVal)
      map[coord.x][coord.y][i] = true;
  }

  mapSet[coord.x][coord.y] = true;

  upspot = [];
  downspot = [];
  rightspot = [];
  leftspot = [];

  for(var i = 0; i < numTiles; i++)
  {
    upspot[i] = false;
    downspot[i] = false;
    rightspot[i] = false;
    leftspot[i] = false;
  }

  for(rule in rules)
  {
    if(rules[rule].direction == UP && rules[rule].a == realVal)
      upspot[rules[rule].b] = true;
    if(rules[rule].direction == DOWN && rules[rule].a == realVal)
      downspot[rules[rule].b] = true;
    if(rules[rule].direction == RIGHT && rules[rule].a == realVal)
      rightspot[rules[rule].b] = true;
    if(rules[rule].direction == LEFT && rules[rule].a == realVal)
      leftspot[rules[rule].b] = true;
  }

  for(var i = 0; i < numTiles; i++)
  {
    if(upspot[i] == false)
      setMap(getMovedCoord(coord, UP), i, false);
    if(downspot[i] == false)
      setMap(getMovedCoord(coord, DOWN), i, false);
    if(rightspot[i] == false)
      setMap(getMovedCoord(coord, RIGHT), i, false);
    if(leftspot[i] == false)
      setMap(getMovedCoord(coord, LEFT), i, false);
  }

  var upcount = 0;
  var downcount = 0;
  var rightcount = 0;
  var leftcount = 0;

  for(var i = 0; i < numTiles; i++)
  {
    if(getMap(getMovedCoord(coord, UP), i) == true)
      upcount++;
    if(getMap(getMovedCoord(coord, DOWN), i) == true)
      downcount++;
    if(getMap(getMovedCoord(coord, RIGHT), i) == true)
      rightcount++;
    if(getMap(getMovedCoord(coord, LEFT), i) == true)
      leftcount++;
  }

  if(upcount == 1)
    mapSet[getMovedCoord(coord, UP).x][getMovedCoord(coord, UP).y] = true;
  if(downcount == 1)
    mapSet[getMovedCoord(coord, DOWN).x][getMovedCoord(coord, DOWN).y] = true;
  if(rightcount == 1)
    mapSet[getMovedCoord(coord, RIGHT).x][getMovedCoord(coord, RIGHT).y] = true;
  if(leftcount == 1)
    mapSet[getMovedCoord(coord, LEFT).x][getMovedCoord(coord, LEFT).y] = true;

  if(upcount == 0 || downcount == 0 || leftcount == 0 || rightcount == 0)
  {
    console.log("CONTRADICTION");
    return;
  }

  original = [false, true, true, false] //false is already taken count
  newc = [false, true, true] // set org array to false, make all the rules to true
  //take the union of the falses
}
function getLowestEntropy()
{
  var numSame = 0;
  var currentEntropy = -1;
  var currentCoord = {x : 0, y : 0};

  for(var i = 0; i<size.x; i++)
  {
    for(var j = 0; j<size.y; j++)
    {
      currentEntropy = getEntropy(map[i][j]);
      currentCoord.x = i;
      currentCoord.y = j;
      if(mapSet[i][j] == false)
        break;
    }
  }
  if(currentEntropy == -1)
    return {x : -1, y : -1};

  var entropyij;

  for(var i = 0; i<size.x; i++)
  {
    mapEntropy[i] = [];

    for(var j = 0; j<size.y; j++)
    {
      mapEntropy[i][j] = getEntropy(map[i][j]);
      if(mapSet[i][j] == true)
        continue;

      entropyij = getEntropy(map[i][j]);

      if(entropyij < currentEntropy)
      {
        numSame = 0;
        currentEntropy = entropyij;
        currentCoord.x = i;
        currentCoord.y = j;
      }

      if(floatEquals(entropyij, currentEntropy, 0.000001))
      {
        numSame++;
        if(Math.random() < 1 / (numSame +1))
        {
          currentCoord.x = i;
          currentCoord.y = j;
        }
      }

    }
  }
  //console.log(currentCoord);
  return currentCoord;
}
function initMap2()
{
  for(var i = 0; i<size.x; i++)
  {
    mapSet[i] = [];
    for(var j = 0; j<size.y; j++)
    {
      map[i][j] = [];
      mapSet[i][j] = false;
      for(var k = 0; k < numTiles; k++)
      {
        map[i][j][k] = true;
      }
    }
  }
  numCompleted = 0;
  if(numTiles == 1)
    numCompleted = size.x * size.y;
}
function initRules()
{
  for(var i = 0; i < source.length; i++)
  {
    for(var j = 0; j < source[0].length; j++)
    {
      if(isVaidSource(getMovedCoordSource(getCoord(i, j), UP)))
      {
        tempRule = new Rule(getSource(getCoord(i,j)), getSource(getMovedCoordSource(getCoord(i, j), UP)), UP);
        if(!(rule2string(tempRule) in rules))
          rules[rule2string(tempRule)] = tempRule;
      }
      if(isVaidSource(getMovedCoordSource(getCoord(i, j), DOWN)))
      {
        tempRule = new Rule(getSource(getCoord(i,j)), getSource(getMovedCoordSource(getCoord(i, j), DOWN)), DOWN);
        if(!(rule2string(tempRule) in rules))
          rules[rule2string(tempRule)] = tempRule;
      }
      if(isVaidSource(getMovedCoordSource(getCoord(i, j), LEFT)))
      {
        tempRule = new Rule(getSource(getCoord(i,j)), getSource(getMovedCoordSource(getCoord(i, j), LEFT)), LEFT);
        if(!(rule2string(tempRule) in rules))
          rules[rule2string(tempRule)] = tempRule;
      }
      if(isVaidSource(getMovedCoordSource(getCoord(i, j), RIGHT)))
      {
        tempRule = new Rule(getSource(getCoord(i,j)), getSource(getMovedCoordSource(getCoord(i, j), RIGHT)), RIGHT);
        if(!(rule2string(tempRule) in rules))
          rules[rule2string(tempRule)] = tempRule;
      }
    }
  }
}
function initSourceDictionary()
{
  for(var i = 0; i < rawSource.length; i++)
  {
    source[i] = [];
    for(var j = 0; j < rawSource[0].length; j++)
    {
      //console.log(rawSource[i][j]);
      //console.log(!(rawSource[i][j] in color2id));
      if(!(rawSource[i][j] in color2id))
      {
        color2id[rawSource[i][j]] = Object.keys(color2id).length;
        id2color[Object.keys(color2id).length-1] = rawSource[i][j];

        id2weight[color2id[rawSource[i][j]]] = 1;
      }
      else
        id2weight[color2id[rawSource[i][j]]]++;
      source[i][j] = color2id[rawSource[i][j]];
    }
  }
  numTiles = Object.keys(id2weight).length;
  for(var i = 0; i < numTiles; i++)
    id2weight[i] /= rawSource.length*rawSource[0].length;
}
function initMap()
{
  size.x = Math.round(canvasW/size.px);
  size.y = Math.round(canvasH/size.px);
  for(var i = 0; i<size.x; i++)
  {
    map[i] = [];
    for(var j = 0; j<size.y;j++)
    {
      map[i][j] = 0;
    }
  }
}
