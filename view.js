var svg = d3.select("#view > svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var vis=svg.append("g");

vis.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all");
    // .call(d3.zoom()
    //     .on("zoom", zoomed));

// function zoomed() {
//     vis.attr("transform", d3.event.transform);
// }

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json(".\\data\\miserables.json", function(error, graph) {
    if (error) throw error;

    // console.log(graph);

    var brush = d3.brush()
        .extent([[0, 0], [width, height]])
        .on("start brush", brushed);

    var link = vis.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line");

    var node = vis.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 5)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    var x = d3.scaleLinear()
        .domain([0, 10])
        .range([0, width]);
    var y = d3.scaleLinear()
        .range([height, 0]);

    node.append("title")
        .text(function(d) { return d.id; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    vis.append("g")
        .call(brush)
        .call(brush.move, [[width/3, height/3],[width*2/3,height*2/3]])
        .selectAll(".overlay")
        .each(function(d) { d.type = "selection"; }) // Treat overlay interaction as move.
        .on("mousedown touchstart", brushcentered); // Recenter before brushing.

    function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }

    function brushcentered() {
        var dx = x(1) - x(0), // Use a fixed width when recentering.
            cx = d3.mouse(this)[0],
            x0 = cx - dx / 2,
            x1 = cx + dx / 2;
        d3.select(this.parentNode).call(brush.move, x1 > width ? [width - dx, width] : x0 < 0 ? [0, dx] : [x0, x1]);
    }

    function brushed() {
        var extent = d3.event.selection.map(x.invert, x);
        node.classed("selected", function(d) { return extent[0] <= d[0] && d[0] <= extent[1]; });
    }

    // console.log(link);
    // console.log(node);
});

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
