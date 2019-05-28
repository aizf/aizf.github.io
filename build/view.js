'use strict';

var svg = d3.select("#view > div > svg"),
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

var brush = d3.brush()
    .extent([[0, 0], [width, height]])
    .on("start brush", brushed);

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

    node.on("mouseover",mouseover);
    node.on("mouseout",mouseout);
    node.on("click",clickSelect);

    simulation
        .nodes(node.data())
        .on("tick", ticked);

    simulation.force("link")
        .links(link.data());

    brushG=vis.append("g")
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
    if(!dragable)return;
    if(clickable){
        let t=d3.select(this);
        if(t.classed("selected")){
            t.classed("selected",false);
        }
        else{
            t.classed("selected",true);
        }
    }
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}
function dragged(d) {
    if(!dragable)return;
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}
function dragended(d) {
    if(!dragable)return;
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

var opacityNodes;
var opacityLinks;
var displayNodes;
var displayLinks;
function mouseover(d) {
    if(!mouseoverable)return;
    opacityNodes=null;
    opacityLinks=null;
    var thisId=d.id;
    // console.log(thisId);
    opacityLinks=link.filter(function (d) {
        return d.source.id!==thisId && d.target.id!==thisId;
    });
    displayLinks=link.filter(function (d) {
        return d.source.id===thisId || d.target.id===thisId;
    });
    opacityNodes=node.filter(function (d) {
        // console.log("d",d);
        var displayLinksData=displayLinks.data();
        for(var i in displayLinksData){
            // console.log(i);
            if(d.id===displayLinksData[i].source.id || d.id===displayLinksData[i].target.id){
                return false;
            }
        }
        return true;
    });
    displayNodes=node.filter(function (d) {
        var displayLinksData=displayLinks.data();
        for(var i in displayLinksData){
            // console.log(i);
            if(d.id===displayLinksData[i].source.id || d.id===displayLinksData[i].target.id){
                return true;
            }
        }
        return false;
    });

    opacityNodes.style("fill-opacity",0);
    opacityNodes.style("stroke-opacity",0);
    opacityLinks.style("stroke-opacity",0);
    displayNodes.append("text")
        .attr("x", 6)
        .attr("dy", "0.31em")
        .text(d => d.id)
        .clone(true).lower()
        .attr("text-anchor","end")
        .attr("stroke", "white");
}
function mouseout() {
    if(!mouseoverable)return;
    opacityNodes.style("fill-opacity",null);
    opacityNodes.style("stroke-opacity",null);
    opacityLinks.style("stroke-opacity",null);
    displayNodes.selectAll("text")
        .remove();
}

var saveData=function () {
    var saving= vis.selectAll(".selected")
        .clone(true)
        .classed("selected",false)
        .classed("display",false)
        .classed("saved",true);
    createThumb(svg,saving);
};

function clickSelect() {
    if(clickable&&!dragable){
        let t=d3.select(this);
        if(t.classed("selected")){
            t.classed("selected",false);
        }
        else{
            t.classed("selected",true);
        }
    }
}