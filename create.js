function create()
{
  initMap();
  initSourceDictionary();
  initRules();

  initMap2();
}
function initMap2()
{
  for(var i = 0; i<size.x; i++)
  {
    for(var j = 0; j<size.y; j++)
    {
      map[i][j] = [];
      for(var k = 0; k < numTiles; k++)
      {
        map[i][j][k] = true;
      }
    }
  }
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
      console.log(rawSource[i][j]);
      console.log(!(rawSource[i][j] in color2id));
      if(!(rawSource[i][j] in color2id))
      {
        color2id[rawSource[i][j]] = Object.keys(color2id).length;
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
