(function(t){function e(e){for(var a,r,o=e[0],c=e[1],l=e[2],d=0,_=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&_.push(i[r][0]),i[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(e);while(_.length)_.shift()();return n.push.apply(n,l||[]),s()}function s(){for(var t,e=0;e<n.length;e++){for(var s=n[e],a=!0,o=1;o<s.length;o++){var c=s[o];0!==i[c]&&(a=!1)}a&&(n.splice(e--,1),t=r(r.s=s[0]))}return t}var a={},i={app:0},n=[];function r(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=a,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(s,a,function(e){return t[e]}.bind(null,a));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/predicting_financial_fraud/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;n.push([1,"chunk-vendors"]),s()})({0:function(t,e){},"034f":function(t,e,s){"use strict";var a=s("85ec"),i=s.n(a);i.a},"0c71":function(t,e,s){"use strict";var a=s("e00d"),i=s.n(a);i.a},1:function(t,e,s){t.exports=s("56d7")},2:function(t,e){},3:function(t,e){},"56d7":function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var a=s("2b0e"),i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("div",{style:{margin:"0 0 0 0"}},[s("VDataSet",{ref:"VDataSet",style:{width:"500px",float:"left"},attrs:{dims:t.dims},on:{getDims:t.handleGetDims,selectedDimsChange:t.handleSelectedDimsChange}}),s("VRandomForest",{ref:"VRandomForest",style:{width:"360px",float:"left"},attrs:{scores:t.scores}}),s("VLogisticRegression",{ref:"VLogisticRegression",style:{width:"360px",float:"left"},attrs:{scores:t.scores,selectedDims:t.selectedDims,newClf:t.newClf}})],1),s("a-divider"),s("div",{staticClass:"float-right"},[s("a-button",{attrs:{loading:t.loadingDownload},on:{click:t.download}},[t._v("Download Table")]),s("a-button",{attrs:{type:"primary",loading:t.loadingCommit},on:{click:t.commit}},[t._v("commit")])],1),s("a-divider"),s("p",{directives:[{name:"show",rawName:"v-show",value:!!t.errors,expression:"!!errors"}],style:{color:"red"}},[t._v(t._s(t.errors))]),s("a-table",{attrs:{columns:t.columns,dataSource:t.dataSource,bordered:""}})],1)},n=[],r=(s("99af"),s("4160"),s("d81d"),s("13d5"),s("159b"),s("5530")),o=s("2909"),c=s("1146"),l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a-card",{attrs:{title:"DataSet"}},[s("p",[t._v("Overview")]),s("p",[t._v("训练集未舞弊公司数量："+t._s(t.label_0_train))]),s("p",[t._v("训练集舞弊公司数量："+t._s(t.label_1_train))]),s("p",[t._v("测试集未舞弊公司数量："+t._s(t.label_0_test))]),s("p",[t._v("测试集舞弊公司数量："+t._s(t.label_1_test))]),s("a-divider"),s("p",[t._v("blackList")]),s("a-checkbox",{attrs:{checked:t.blackList},on:{change:function(e){t.blackList=!t.blackList}}},[t._v("blackList")]),s("a-divider"),s("p",[t._v("selectedDims")]),s("a-row",t._l(Object.keys(t.dimStatus),(function(e){return s("a-col",{key:e,attrs:{span:6}},[s("a-checkbox",{attrs:{checked:t.dimStatus[e]},on:{change:function(s){return t.selectedDimsChange(e)}}},[t._v(t._s(e))])],1)})),1),s("a-divider"),s("p",[t._v("train_ratio")]),s("a-input-number",{attrs:{min:0,max:1,step:.1},model:{value:t.train_ratio,callback:function(e){t.train_ratio=e},expression:"train_ratio"}}),s("a-divider"),s("p",[t._v("multiple")]),s("a-input-number",{attrs:{min:0,step:.1},model:{value:t.multiple,callback:function(e){t.multiple=e},expression:"multiple"}})],1)},u=[],d={name:"VDataSet",props:{dims:Array},data:function(){return{label_0_train:"...",label_1_train:"...",label_0_test:"...",label_1_test:"...",blackList:!1,dimStatus:{DEPI:!1,GAIN:!1,LOSS:!1,TATA1:!1,TATA2:!1,CHCS:!1,OTHREC:!1,GMI:!1,GMIII:!1,SGAI:!1,CHROA:!1,AQI:!1,LVGI:!1,DSRI:!1,SGI:!1,SOFTAS:!1,CHINV:!1,CHREC:!1},train_ratio:.7,multiple:1}},computed:{selectedDims:function(){var t=this,e=[];return this.dims.forEach((function(s){t.dimStatus[s]&&e.push(s)})),e}},mounted:function(){this.getDims()},methods:{selectedDimsChange:function(t){this.dimStatus[t]=!this.dimStatus[t],this.$emit("selectedDimsChange",this.selectedDims)},getDims:function(){var t=this;return this.$axios.post("/search_information",{info:"dims"}).then((function(e){t.$emit("getDims",{errors:!1,dims:e.data.dims})})).catch((function(e){t.$emit("getDims",{errors:e,dims:[]}),alert("bug了,芮憨憨！！！")}))},getDatasetOverview:function(){return this.$axios.post("/search_information",{info:"dataset"})},handleDatasetOverview:function(t){this.label_0_train=t["label_0_train"],this.label_1_train=t["label_1_train"],this.label_0_test=t["label_0_test"],this.label_1_test=t["label_1_test"]}},watch:{}},_=d,p=s("2877"),f=Object(p["a"])(_,l,u,!1,null,"0ff4a27a",null),m=f.exports,h=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a-card",{attrs:{title:"RandomForest"}},[s("p",[t._v("n_estimators")]),s("a-input-number",{attrs:{min:1,step:1},model:{value:t.n_estimators,callback:function(e){t.n_estimators=e},expression:"n_estimators"}}),s("a-divider"),s("p",[t._v("特征重要性")]),t._l(t.feature_importances,(function(e,a){return s("a-row",{key:a},[s("a-col",{attrs:{span:12}},[t._v(t._s(a))]),s("a-col",{attrs:{span:12}},[t._v(t._s(e))])],1)})),s("a-divider"),s("p",[t._v("测试集")]),s("a-row",[s("a-col",{attrs:{span:12}},[s("p",[t._v("未舞弊公司正确预测率：")])]),s("a-col",{attrs:{span:12}},[s("p",[t._v(t._s(t.scores.RandomForest.label_0_score_test))])]),s("a-col",{attrs:{span:12}},[s("p",[t._v("舞弊公司正确预测率：")])]),s("a-col",{attrs:{span:12}},[s("p",[t._v(t._s(t.scores.RandomForest.label_1_score_test))])]),s("a-col",{attrs:{span:12}},[s("p",[t._v("总体正确预测率：")])]),s("a-col",{attrs:{span:12}},[s("p",[t._v(t._s(t.scores.RandomForest.score_test))])])],1),s("a-divider"),s("p",[t._v("训练集")]),s("a-row",[s("a-col",{attrs:{span:12}},[s("p",[t._v("未舞弊公司正确预测率：")])]),s("a-col",{attrs:{span:12}},[s("p",[t._v(t._s(t.scores.RandomForest.label_0_score_train))])]),s("a-col",{attrs:{span:12}},[s("p",[t._v("舞弊公司正确预测率：")])]),s("a-col",{attrs:{span:12}},[s("p",[t._v(t._s(t.scores.RandomForest.label_1_score_train))])]),s("a-col",{attrs:{span:12}},[s("p",[t._v("总体正确预测率：")])]),s("a-col",{attrs:{span:12}},[s("p",[t._v(t._s(t.scores.RandomForest.score_train))])])],1)],2)},v=[],b={name:"VRandomForest",props:{scores:Object},data:function(){return{n_estimators:10}},computed:{feature_importances:function(){return this.scores.RandomForest.feature_importances}},methods:{},watch:{}},g=b,D=Object(p["a"])(g,h,v,!1,null,"e0ea65a6",null),R=D.exports,w=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a-card",{attrs:{title:"LogisticRegression"}},[s("a-tabs",{attrs:{defaultActiveKey:t.LR_type},on:{change:t.tabsChange}},[s("a-tab-pane",{key:"1",attrs:{tab:"use model func",forceRender:""}},[s("p",[t._v(t._s(t.decisionFun))]),s("a-checkbox",{attrs:{checked:t.ifFixed},on:{change:function(e){t.ifFixed=!t.ifFixed}}}),s("span",[t._v("toFixed")]),s("a-input-number",{attrs:{min:0,disabled:!t.ifFixed},model:{value:t.toFixed,callback:function(e){t.toFixed=e},expression:"toFixed"}})],1),s("a-tab-pane",{key:"2",attrs:{tab:"use customize func",forceRender:""}},[t._l(t.selectedDims,(function(e){return s("a-row",{key:e},[s("a-col",{attrs:{span:17}},[s("a-input-number",{style:{width:"90%"},attrs:{size:"small"},model:{value:t.custCoef[e],callback:function(s){t.$set(t.custCoef,e,s)},expression:"custCoef[dim]"}})],1),s("a-col",{attrs:{span:2}},[s("span",[t._v("*")])]),s("a-col",{attrs:{span:5}},[t._v(t._s(e))])],1)})),s("a-col",{attrs:{span:17}},[s("a-input-number",{style:{width:"90%"},attrs:{size:"small"},model:{value:t.custIntercept,callback:function(e){t.custIntercept=e},expression:"custIntercept"}})],1)],2)],1),s("a-divider"),s("p",[t._v("测试集")]),s("a-row",[s("a-col",{attrs:{span:12}},[s("p",[t._v("未舞弊公司正确预测率：")])]),s("a-col",{attrs:{span:12}},[s("p",[t._v(t._s(t.scores.LogisticRegression.label_0_score_test))])]),s("a-col",{attrs:{span:12}},[s("p",[t._v("舞弊公司正确预测率：")])]),s("a-col",{attrs:{span:12}},[s("p",[t._v(t._s(t.scores.LogisticRegression.label_1_score_test))])]),s("a-col",{attrs:{span:12}},[s("p",[t._v("总体正确预测率：")])]),s("a-col",{attrs:{span:12}},[s("p",[t._v(t._s(t.scores.LogisticRegression.score_test))])])],1),s("a-divider"),s("p",[t._v("训练集")]),s("a-row",[s("a-col",{attrs:{span:12}},[s("p",[t._v("未舞弊公司正确预测率：")])]),s("a-col",{attrs:{span:12}},[s("p",[t._v(t._s(t.scores.LogisticRegression.label_0_score_train))])]),s("a-col",{attrs:{span:12}},[s("p",[t._v("舞弊公司正确预测率：")])]),s("a-col",{attrs:{span:12}},[s("p",[t._v(t._s(t.scores.LogisticRegression.label_1_score_train))])]),s("a-col",{attrs:{span:12}},[s("p",[t._v("总体正确预测率：")])]),s("a-col",{attrs:{span:12}},[s("p",[t._v(t._s(t.scores.LogisticRegression.score_train))])])],1)],1)},x=[],F=(s("a15b"),s("b680"),{name:"VLogisticRegression",props:{scores:Object,selectedDims:Array,newClf:Boolean},data:function(){return{decisionFun:"...",ifFixed:!0,toFixed:5,custCoef:{DEPI:0,GAIN:0,LOSS:0,TATA1:0,TATA2:0,CHCS:0,OTHREC:0,GMI:0,GMIII:0,SGAI:0,CHROA:0,AQI:0,LVGI:0,DSRI:0,SGI:0,SOFTAS:0,CHINV:0,CHREC:0},custIntercept:0,LR_type:"1"}},computed:{},methods:{getDecisionFun:function(){for(var t=this.selectedDims,e=t.length,s=[],a=this.scores.LogisticRegression.coef[0],i=this.scores.LogisticRegression.intercept[0],n=0;n<e;n++)a[n]>=0&&0!=n&&s.push(" + "),s.push(this.ifFixed?a[n].toFixed(this.toFixed):a[n]),s.push(" * "),s.push(t[n]);i>=0&&s.push(" + "),s.push(this.ifFixed?i.toFixed(this.toFixed):i),this.decisionFun=s.join(""),this.resetCustCoefInter(a,i)},resetCustCoefInter:function(t,e){var s=this;this.selectedDims.forEach((function(e,a){s.custCoef[e]=t[a]})),this.custIntercept=e},tabsChange:function(t){this.LR_type=t}},watch:{ifFixed:function(){"..."!==this.scores.LogisticRegression.coef&&this.getDecisionFun()},toFixed:function(){"..."!==this.scores.LogisticRegression.coef&&this.getDecisionFun()},newClf:function(t){t&&this.getDecisionFun()}}}),S=F,y=Object(p["a"])(S,w,x,!1,null,"0e53e26c",null),C=y.exports,L={name:"App",components:{VDataSet:m,VRandomForest:R,VLogisticRegression:C},mounted:function(){document.title="芮憨憨"},data:function(){return{dims:[],selectedDims:[],scores:{RandomForest:{label_0_score_test:"...",label_1_score_test:"...",score_test:"...",label_0_score_train:"...",label_1_score_train:"...",score_train:"...",feature_importances:{}},LogisticRegression:{label_0_score_test:"...",label_1_score_test:"...",score_test:"...",label_0_score_train:"...",label_1_score_train:"...",score_train:"...",coef:"..."}},newClf:!1,loadingDownload:!1,loadingCommit:!1,errors:null,results:[],methods:["RandomForest","LogisticRegression"],score_types:["label_0_score_test","label_1_score_test","score_test","label_0_score_train","label_1_score_train","score_train"]}},computed:{columns:function(){var t=this,e=[],s=this.dims;return e.push([{title:"dims",children:s.map((function(t){return{title:t,dataIndex:t}}))}]),e.push(["train_noFraud","train_fraud","test_noFraud","test_Fraud"].map((function(t){return{title:t,dataIndex:t}}))),e.push(this.methods.map((function(e){return{title:e,children:t.score_types.map((function(t){return{title:t,dataIndex:e+t}}))}}))),e.reduce((function(t,e,s){return 0===s?e:[].concat(Object(o["a"])(t),Object(o["a"])(e))}))},dataSource:function(){return this.results.map((function(t,e){return Object(r["a"])({},t,{key:e})}))}},methods:{commit:function(){var t=this;this.loadingCommit=!0,this.errors=null,this.newClf=!1,this.getPredicting().then((function(e){t.$refs.VDataSet.getDatasetOverview().then((function(e){t.$refs.VDataSet.handleDatasetOverview(e.data),t.saveRes(),t.newClf=!0,t.loadingCommit=!1})),t.handlePredicting(e.data)})).catch((function(e){t.loadingCommit=!1,t.errors=e,alert("bug了,芮憨憨！！！")}))},getPredicting:function(){var t=this,e=this.$refs.VLogisticRegression.LR_type,s={blackList:this.$refs.VDataSet.blackList,selectedDims:this.selectedDims,train_ratio:this.$refs.VDataSet.train_ratio,multiple:this.$refs.VDataSet.multiple,n_estimators:this.$refs.VRandomForest.n_estimators,LR_type:e};return"2"===e&&(s["coefficient"]=this.selectedDims.map((function(e){return t.$refs.VLogisticRegression.custCoef[e]})),s["intercept"]=this.$refs.VLogisticRegression.custIntercept),this.$axios.post("/predicting_financial_fraud",s)},handleGetDims:function(t){var e=t.errors,s=t.dims;e?this.errors=e:this.dims=s},handlePredicting:function(t){this.scores=t},handleSelectedDimsChange:function(t){this.selectedDims=t},saveRes:function(){var t=this,e={},s=this.$refs.VDataSet.dimStatus;this.dims.forEach((function(a){e[a]=s[a]?t.scores.RandomForest.feature_importances[a]:"-"})),e["train_noFraud"]=this.$refs.VDataSet.label_0_train,e["train_fraud"]=this.$refs.VDataSet.label_1_train,e["test_noFraud"]=this.$refs.VDataSet.label_0_test,e["test_Fraud"]=this.$refs.VDataSet.label_1_test;var a=this.methods,i=this.score_types;a.forEach((function(s){i.forEach((function(a){e[s+a]=t.scores[s][a]}))})),this.results.push(e)},download:function(){this.loadingDownload=!0;var t=c["utils"].book_new(),e=c["utils"].json_to_sheet(this.results);c["utils"].book_append_sheet(t,e,"sheet1"),c["writeFile"](t,"results.xlsx"),this.loadingDownload=!1}},watch:{}},I=L,k=(s("034f"),s("0c71"),Object(p["a"])(I,i,n,!1,null,"6def094c",null)),O=k.exports,V=s("bc3a"),$=s.n(V),A=(s("202f"),s("5efb")),j=s("cdeb"),T=s("bb76"),E=s("e32c"),G=s("a79d8"),P=s("09d9"),H=s("9a63"),M=s("0020"),N=s("ccb9");$.a.defaults.baseURL="http://49.233.132.179:5000",a["a"].prototype.$axios=$.a,a["a"].use(A["a"]),a["a"].use(j["a"]),a["a"].use(T["a"]),a["a"].use(E["a"]),a["a"].use(G["a"]),a["a"].use(P["a"]),a["a"].use(H["a"]),a["a"].use(M["a"]),a["a"].use(N["a"]),a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(O)}}).$mount("#app")},"85ec":function(t,e,s){},e00d:function(t,e,s){}});