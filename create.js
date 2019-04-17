var finished;
function update()
{
  sizeAdjust();
  runChecks();

  //console.log("checking..");

  if(!finished)
  {
    updateOnePixel();
    //console.log("running...");
  }
  draw();
}
function runChecks()
{
  finished = true;
  for(var i = 0; i<size.x; i++)
  {
    for(var j = 0; j<size.y; j++)
    {
      finished = finished && (map[i][j].checkSet());
      if(map[i][j].checkContradition())
      {
        clearInterval(updateLoop);
        finished = true;
        console.log("EXCEPTION");
      }
    }
  }
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

  realVal = getRandOnDistribution(map[coord.x][coord.y].dist);

  for(var i = 0; i < numTiles; i++)
  {
    map[coord.x][coord.y].dist[i] = 0;
    if(i == realVal)
      map[coord.x][coord.y].dist[i] = 1;
  }

  map[coord.x][coord.y].checkSet();

  var uc = getMovedCoord(coord, UP);
  map[uc.x][uc.y].updateDist(rules[UP][realVal]);
  uc = getMovedCoord(coord, DOWN);
  map[uc.x][uc.y].updateDist(rules[DOWN][realVal])
  uc = getMovedCoord(coord, LEFT);
  map[uc.x][uc.y].updateDist(rules[LEFT][realVal])
  uc = getMovedCoord(coord, RIGHT);
  map[uc.x][uc.y].updateDist(rules[RIGHT][realVal])

/*
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
  */
}
function getLowestEntropy()
{
  var numSame = 0;
  var currentEntropy = 100000;
  var currentCoord = {x : 0, y : 0};
  var entropyij;

  mapEntropy = [];
  for(var i = 0; i<size.x; i++)
  {
    mapEntropy[i] = [];

    for(var j = 0; j<size.y; j++)
    {
      mapEntropy[i][j] = map[i][j].getEntropy();
      entropyij = map[i][j].getEntropy();;

      if(entropyij < currentEntropy)
      {
        numSame = 0;
        currentEntropy = entropyij;
        currentCoord.x = i;
        currentCoord.y = j;
      }

      if(floatEquals(entropyij, currentEntropy, 0.0000000000001))
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
