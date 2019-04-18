function init()
{
  initSourceDictionary();
  initRules();
  initMap();
}
function initRules()
{
  rules = [];
  var tempRuleStringDict = {};
  var tempString;
  var ruleCount = 0;
  for(var n = 0; n < source.length; n++)
  {
    for(var i = 0; i < source[n].length; i++)
    {
      for(var j = 0; j < source[n][i].length; j++)
      {
        tempString = "" + getSource(n, getCoord(i , j));
        for(var direction = 0; direction < 8; direction++)
          tempString += "" + getSource(n, getMovedCoordSource(n, getCoord(i, j), direction));

        if(tempString in tempRuleStringDict)
        {
          rules[tempRuleStringDict[tempString]].freq++;
        }
        else
        {
          rules[ruleCount] = new Rule(getSource(n, getCoord(i , j)));
          rules[ruleCount].asString = tempString;
          for(var direction = 0; direction < 8; direction++)
            rules[ruleCount].form[direction] = getSource(n, getMovedCoordSource(n, getCoord(i, j), direction));
          tempRuleStringDict[tempString] = ruleCount;
          ruleCount++;
        }
        console.log(tempString);
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
