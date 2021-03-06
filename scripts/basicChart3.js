function createBasicChart3(){

//Format Axes and adding ticks
  
  var chart;

  nv.addGraph(function(){
  //Create chart
    chart = nv.models.scatterChart()
              .showLegend(true)                      // Show legend
              .showDistX(true)                       // Show X axis
              .showDistY(true)                       // Show Y axis
              .useVoronoi(true)                      // enable hovering on points
              .color(d3.scale.category10().range())  //Colormap
              .duration(500);                        // Fade in duration


    // Get data from the data file
    data = getDataPlain()
    
    // Axes tick format
    chart.xAxis.tickFormat(d3.format('.02f'));
    chart.yAxis.tickFormat(d3.format('.02f'));

    // Number of ticks on axes
    chart.yAxis.ticks(10)
    chart.yAxis.ticks(5)

    // Set axes labels
    chart.yAxis.axisLabel("Color Intensity")
    chart.xAxis.axisLabel("Alcohol")
    
    d3.select("#basicChart3").datum(data).call(chart)
    nv.utils.windowResize(chart.update);
    chart.dispatch.on('stateChange', function(e) { ('New State:', JSON.stringify(e)); });
    return chart

  });
}


// This function reads the data file and returns it as JSON
function getDataPlain(){
  var result;
  $.ajax({
      async:false,
      dataType:'json',
      url:'data/data.json',
      success: function(data){
        var wines = [{key:"Wines", values:[]}];
        
        $.each(data, function(i, d){
          wines[0]['values'].push(
              {
                x: d.Alcohol,
                y: d.Color_intensity,
              }
            )
        });
        result = wines;
      }
    });
  return result;
}