function create()
{
  initMap();
  initSourceDictionary();
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
function initRules()
{
  
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
  for(var i = 0; i < Object.keys(id2weight).length; i++)
    id2weight[i] /= rawSource.length*rawSource[0].length;
}
