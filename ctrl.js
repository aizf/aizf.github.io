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

var treeNodesSum=0;
var treeNodesRelation=function (parentIndex,Index) {
    return {"parentIndex":parentIndex,"Index":Index};
};
var treeNodesRelations=[];

















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
        .style("pointer-events", "all");

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
}

function importData() {
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

    simulation.alphaTarget(0.2).restart();
}
