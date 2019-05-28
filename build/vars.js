let clickable=false;
// let brushable=false;
let dragable=false;
let mouseoverable=false;
let showDetails=false;

var originalNode,originalLinkData={};
var node,link={};
var brushG={};
var thumbJustNow=null;
const dotStatus=["display","selected","saved","thumb"];