class Tile
{
  dist = [];
  set = false;

  constructor()
  {
    for(var i = 0; i < numTiles; i++)
      dist[i] = 0;
  }
  setDistribution(dist)
  {
    this.dist = [];
    for(value in dist)
      this.dist.push(value);
  }
  updateDistributionGivenCondition(cond)
  {
    for(var i = 0; i < numTiles; i++)
      this.dist[i] *= cond[i];
  }
  getEntropy()
  {
    var sum_of_weights = 0;
    var sum_of_weighted_weights = 0;
    var count = 0;

    for(var i = 0; i < numTiles; i++)
    {
        if(this.dist == 0)
          continue;

        sum_of_weights += this.dist[i];
        sum_of_weighted_weights += this.dist[i] * Math.log(this.dist[i]);
        count++;
    }

    if(count == 0)
      return 100000;
    return Math.log(sum_of_weights) - sum_of_weighted_weights/sum_of_weights;
  }
  checkSet()
  {
    if(this.set == true)
      return;

    var count = 0;
    for(var i = 0; i < numTiles; i++)
    {
      if(this.dist[i] == 0)
        count++;
    }

    if(count == 1)
      this.set = true;
  }
  checkContradition()
  {
    var count = 0;
    for(var i = 0; i < numTiles; i++)
    {
      if(this.dist[i] == 0)
        count++;
    }

    if(count == 0)
      return true;
    return false;
  }
  getColorAverage()
  {
    var colorAvg = {r : 0, g : 0, b : 0};
    var tempColor;
    for(var i = 0; i < numTiles; i++)
    {
      tempColor = string2rgb(id2color[i]);
      colorAvg.r += tempColor.r * this.dist[i];
      colorAvg.g += tempColor.g * this.dist[i];
      colorAvg.b += tempColor.b * this.dist[i];
      count++;
    }
    colorAvg.r = Math.round(colorAvg.r);
    colorAvg.g = Math.round(colorAvg.g);
    colorAvg.b = Math.round(colorAvg.b);

    return rgb2string(colorAvg);
  }
}
