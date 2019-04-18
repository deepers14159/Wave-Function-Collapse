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
    //updateMap();
  }
  draw();
}
function updateMap()
{
  for(var i = 0; i<size.x; i++)
  {
    for(var j = 0; j<size.y; j++)
    {
        updateTile(getCoord(i,j));
    }
  }
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
        console.log(map[i][j]);
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

//for(var i = 0; i < 10; i++)
  for(var direction = 0; direction < 8; direction ++)
    updateTile(getMovedCoord(coord, direction));
//UPDATE MAP
/*
  var uc = getMovedCoord(coord, UP);
  map[uc.x][uc.y].updateDist(rules[UP][realVal]);
  uc = getMovedCoord(coord, DOWN);
  map[uc.x][uc.y].updateDist(rules[DOWN][realVal])
  uc = getMovedCoord(coord, LEFT);
  map[uc.x][uc.y].updateDist(rules[LEFT][realVal])
  uc = getMovedCoord(coord, RIGHT);
  map[uc.x][uc.y].updateDist(rules[RIGHT][realVal])
*/
}
function updateTile(coord)
{
  if(map[coord.x][coord.y].set)
    return;
  for(var i = 0; i < numTiles; i++)
    map[coord.x][coord.y].dist[i] = 0;

  var color;
  var product;
  var tile;
  for(var i = 0; i < rules.length; i++)
  {
    color = rules[i].color;
    product = 1;
    for(var direction = 0; direction < 8; direction++)
    {
      tile = getMovedCoord(coord, direction);
      product *= map[tile.x][tile.y].dist[rules[i].form[direction]];
    }
    map[coord.x][coord.y].dist[color] += product * rules[i].freq;
  }

  var mag = 0;
  for(var i = 0; i < numTiles; i++)
    mag += map[coord.x][coord.y].dist[i] * map[coord.x][coord.y].dist[i];

  mag = Math.sqrt(mag);
  if(floatEquals(mag, 0, 1e-40))
    return;

  for(var i = 0; i < numTiles; i++)
    map[coord.x][coord.y].dist[i] /= mag;
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
