let clickable = false;
// let brushable=false;
let dragable = false;
let mouseoverable = false;
let showDetails = false;

let originalNode, originalLinkData = {};
let node, link = {};
let brushG = {};
let thumbJustNow = null;

// mouseover
let opacityNodes;   //隐藏的
let opacityLinks;
let displayNodes;   //显示的
let displayLinks;

const dotStatus = ["display", "selected", "saved", "thumb"];