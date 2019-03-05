var svg = d3.select("#view > svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var vis=svg.append("g");

vis.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json(".\\data\\miserables.json", function(error, graph) {
    if (error) throw error;

    // console.log(graph);
    originalLinkData=graph.links;

    link = vis.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(originalLinkData)
        .enter()
        .append("line");

    originalNode=
        node = vis.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter()
            .append("circle")
            .attr("r", 4)
            .attr("class","display")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

    node.append("title")
        .text(function(d) { return d.id; });

    simulation
        .nodes(node.data())
        .on("tick", ticked);

    simulation.force("link")
        .links(link.data());

    var brush = d3.brush()
        .extent([[0, 0], [width, height]])
        .on("start brush", brushed);

    vis.append("g")
        .call(brush)
        .attr("class", "brush")
        .call(brush.move, [[0, 0],[1,1]]);

});

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

function brushed() {
    var extent = d3.event.selection;
    node.classed("selected", function(d) {
        // console.log(d);
        return (extent[0][0] <= d.x) && (extent[0][1] <= d.y) && (d.x <= extent[1][0]) && (d.y <= extent[1][1]);
    });
}

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

saveData=function () {
    var saving= vis.selectAll(".selected")
        .clone(true)
        .classed("selected",false)
        .classed("display",false)
        .classed("saved",true);
    createThumb(svg,saving);
};