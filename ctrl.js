var flowVisWidth=960;
var flowVisHeight=2400;
var flowVis=d3.select("#ctrl")
    .append("svg")
    .attr("width", flowVisWidth)
    .attr("height", flowVisHeight)
    .style("display","none")
    .style("pointer-events", "all");
var flowVis_g=flowVis.append("g")
    .style("pointer-events", "all")
    .attr("transform", "translate(40,0)");
var c_ul=d3.select("#ctrl")
    .append("ul");

$("#view > form > label > input[type=\"checkbox\"]")
    .on("change",function () {
        if(this.checked){
            brushG.style("display","inline");
        }
        else {
            brushG.style("display","none");
        }
    });

//缩略图的个数，及给新的编号
var treeNodesSum=0;
var treeNodesRelation=function (parentIndex,Index) {
    return {"parentIndex":parentIndex,"index":Index};
};
//缩略图的关系
var treeNodesRelations=[treeNodesRelation("",0)];

// .filter(function () {
//     return d3.select(this).attr("class") !== "saved";
// })


function createThumb(svg,saving) {
    var tNodes=$(
        svg.selectAll("circle.display")
            .nodes()
            .map(function (x) {
                return x.cloneNode(true);
            })
    );
    treeNodesSum+=1;

    // console.log(tNodes);

    var tLinks=$(
        svg.selectAll("line")
            .nodes()
            .map(function (x) {
                return x.cloneNode(true);
            })
    );

    var littleVis=c_ul.append("li")
        .append("svg")
        .on("click",importData)
        .append("g")    //littleVis
        .style("pointer-events", "none");

    $(littleVis.node()).append(tNodes);
    // console.log(littleVis.selectAll("circle"))
    littleVis.selectAll("circle")
        .classed("display",false)
        .classed("saved",false)
        .classed("thumb",true);

    $(littleVis.node()).append(tLinks);
    littleVis.attr("transform", "translate(0,0) scale(" + 0.3 + ")")
        .datum(saving);     //选取节点数据(d3-selection)绑定在 g

    littleVis.append("g")
        .datum({"index":treeNodesSum}); //g > g

    treeNodesRelations.push(
        treeNodesRelation(
            thumbJustNow ? thumbJustNow.select("g > g").datum().index : 0,
            treeNodesSum
        )
    );
}

function importData() {
    thumbJustNow=d3.select(this);

    vis.selectAll(".selected")
        .classed("selected",false);
    // console.log(d3.event);
    var sCircles=d3.select(this).select("g").datum();

    link.remove();
    link={};

    node.classed("display",false);
    node.classed("saved",true);

    node = sCircles
        .classed("saved",false)
        .classed("display",true)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title")
        .text(function(d) { return d.id; });

    // console.log(link);

    var linkData=originalLinkData.map(function (x) {
        return x;
    });
    var ids=node.data()
        .map(function (x) {
            return x.id;
        });
    // console.log(ids);
    linkData=linkData.filter(function (_) {
        // console.log(_.source.id,_.target.id);
        var flag0=0;
        var flag1=0;
        for(var i in ids){
            if(_.source.id ===ids[+i])flag0+=1;
            if(_.target.id ===ids[+i])flag1+=1;
            if (flag0>=1 && flag1>=1) {
                // console.log("true");
                return true;
            }
        }
        return false;
    });
    // console.log(linkData);

    link = d3.select("#view > svg > g > g.links")
        .selectAll("line")
        .data(linkData)
        .enter()
        .append("line");

    simulation
        .nodes(node.data())
        .on("tick", ticked);

    simulation.force("link")
        .links(link.data());

    simulation.restart();
}

function showFlow() {
    flowVis.style("display","inline");  //TODO

    var root=d3.stratify()
        .id(function(d) { return d.index; })
        .parentId(function(d) { return d.parentIndex; })
        (treeNodesRelations)
        .sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); });
    console.log(root);

    var nodeSize=[150,150];

    // var cluster = d3.cluster()
    //     .size([height, width - 160]);
    var tree = d3.tree()
        .size([height - 400, width - 160])
        .nodeSize(nodeSize)
        .separation(function (a,b) {
            return a.parent == b.parent ? 1.1 : 1.5;
        });
    tree(root);
    console.log(root);

    var link = flowVis_g.selectAll(".flowLink")
        .data(root.descendants().slice(1))
        .enter().append("path")
        .attr("class", "flowLink")
        .attr("d", diagonal)
        .style("fill","none")
        .style("stroke","#555")
        .style("stroke-opacity","0.4")
        .style("stroke-width","1.5px");

    var node = flowVis_g.selectAll(".flowNode")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", "flowNode")
        .attr("transform", function(d) {
            return "translate(" + (d.y-nodeSize[1]/2) + "," + (d.x-nodeSize[0]/2) + ")";
        })
        .style("pointer-events", "all");
    // console.log(node);
    node.append("rect")
        .attr("width", nodeSize[0])
        .attr("height", nodeSize[1])
        .style("fill", "none")
        .style("stroke","#555")
        .style("stroke-opacity","0.4")
        .style("stroke-width","1px")
        .style("pointer-events", "all");
    node.append("text")
        .text(function(d) {
            return d.id;
        })
        .attr("x",nodeSize[0]/2)
        .attr("y",nodeSize[1]);

    var thumbs_g=c_ul.selectAll("li > svg > g").nodes();
    thumbs_g.sort(function (a,b) {
        var x=d3.select(a).select("g").datum().index;
        var y=d3.select(b).select("g").datum().index;
        if (x < y) {
            return -1;
        } else if (x > y) {
            return 1;
        } else {
            return 0;
        }
    });
    node.each(function (d,i) {
        if(!i)return;
        // console.log(this);
        // console.log(d);
        var flag=d.id;
        $(this).append(thumbs_g[flag-1]);

        //  "x,y"
        var transform_node=
            d3.select(this)
                .attr("transform")
                .match(/translate\((\S*)\)/)[1]
                .split(",");

        var transform_thumb=
            d3.select(thumbs_g[flag-1])
                .attr("transform")
                .match(/scale\((\S*)\)/)[1];

        d3.select(thumbs_g[flag-1])
            .attr("transform","translate("+
                (-(+transform_node[0]*+transform_thumb))
                +","+
                "0"
                +") scale(" + 0.3 + ")");

        // console.log(transform_node);
        // console.log(transform_thumb);
        // console.log(d3.select(this).attr("transform"));
    });

    console.log(findBottom());
    flowVis_g.attr("transform","translate(" + 80 + "," + (+findBottom()+nodeSize[1]/2+2) + ")");

    //////TODO
    // node.append("g")
    //     .append("circle")
    //     .attr("r", 5)
    //     .append("title")
    //     .text(function(d) {
    //         return d.id;
    //     });

    // var t = d3.transition().duration(750);
    // node.transition(t).attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
    // link.transition(t).attr("d", diagonal);


    function diagonal(d) {
        return "M" + d.y + "," + d.x
            + "C" + (d.parent.y + 100) + "," + d.x
            + " " + (d.parent.y + 100) + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
    }

    function findBottom() {
        var y=0;
        node.each(function (d) {
            if(d.y>y){
                y=d.y;
            }
        });
        return y;
    }
}