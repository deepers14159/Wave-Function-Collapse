function init()
{
  initSourceDictionary();
  initRules();
  initMap();
}
function initRules()
{
  rules = [];
  for(var i = 0; i < 4; i++)
  {
    rules[i] = [];
    for(var j = 0; j < numTiles; j++)
    {
      rules[i][j] = [];
      for(var k = 0; k < numTiles; k++)
      {
        rules[i][j][k] = 0;
      }
    }
  }
  for(var n = 0; n < source.length; n++)
  {
    for(var i = 0; i < source[n].length; i++)
    {
      for(var j = 0; j < source[n][i].length; j++)
      {
        /*
        for(var r = 0; r < 4; r++)
        {
          rules[UP][getSource(getCoord(i,j))][getSource(getMovedCoordSource(getCoord(i, j), r))]++;
          rules[DOWN][getSource(getCoord(i,j))][getSource(getMovedCoordSource(getCoord(i, j), r))]++;
          rules[LEFT][getSource(getCoord(i,j))][getSource(getMovedCoordSource(getCoord(i, j), r))]++;
          rules[RIGHT][getSource(getCoord(i,j))][getSource(getMovedCoordSource(getCoord(i, j), r))]++;
        }
        */
        rules[UP][getSource(n, getCoord(i,j))][getSource(n, getMovedCoordSource(n, getCoord(i, j), UP))]++;
        rules[DOWN][getSource(n, getCoord(i,j))][getSource(n, getMovedCoordSource(n, getCoord(i, j), DOWN))]++;
        rules[LEFT][getSource(n, getCoord(i,j))][getSource(n, getMovedCoordSource(n, getCoord(i, j), LEFT))]++;
        rules[RIGHT][getSource(n, getCoord(i,j))][getSource(n, getMovedCoordSource(n, getCoord(i, j), RIGHT))]++;
      }
    }
  }
  var count;
  for(var i = 0; i < 4; i++)
  {
    for(var j = 0; j < numTiles; j++)
    {
      count = 0;
      for(var k = 0; k < numTiles; k++)
      {
        count += rules[i][j][k];
      }
      if(count == 0)
      {
        console.log("RULE FAIL - There is a color with no surrounding tiles.");
        continue;
      }
      for(var k = 0; k < numTiles; k++)
      {
        rules[i][j][k] /= count;
      }
    }
  }
}
function initSourceDictionary()
{
  var count = 0;
  for(var n = 0; n < rawSource.length; n++)
  {
    source[n] = [];
    for(var i = 0; i < rawSource[n].length; i++)
    {
      source[n][i] = [];
      for(var j = 0; j < rawSource[n][i].length; j++)
      {
        count++;
        //console.log(rawSource[i][j]);
        //console.log(!(rawSource[i][j] in color2id));
        if(!(rawSource[n][i][j] in color2id))
        {
          color2id[rawSource[n][i][j]] = Object.keys(color2id).length;
          id2color[Object.keys(color2id).length-1] = rawSource[n][i][j];

          id2weight[color2id[rawSource[n][i][j]]] = 1;
        }
        else
          id2weight[color2id[rawSource[n][i][j]]]++;
        source[n][i][j] = color2id[rawSource[n][i][j]];
      }
    }
  }
  numTiles = Object.keys(id2weight).length;
  for(var i = 0; i < numTiles; i++)
    id2weight[i] /= count;
}
function initMap()
{
  size.x = Math.round(canvasW/size.px);
  size.y = Math.round(canvasH/size.px);
  for(var i = 0; i<size.x; i++)
  {
    map[i] = [];
    for(var j = 0; j<size.y; j++)
    {
      map[i][j] = new Tile();
      map[i][j].setDistribution(id2weight);
    }
  }
}
