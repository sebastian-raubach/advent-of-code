(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8fa2cb18"],{"5b5d":function(t,o,n){"use strict";n.r(o);var e=function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("Day",{attrs:{day:2,year:2021,solutions:t.solutions},on:{"input-changed":t.onInputChanged},scopedSlots:t._u([{key:"partOne",fn:function(){return[n("div",{attrs:{id:"partOne"}})]},proxy:!0},{key:"partTwo",fn:function(){return[n("div",{attrs:{id:"partTwo"}})]},proxy:!0}])})},a=[],r=n("5530"),i=(n("d81d"),n("ac1f"),n("1276"),n("d3b7"),n("159b"),n("4a87")),u=n("2f62"),s={components:{Day:i["default"]},computed:Object(r["a"])(Object(r["a"])({},Object(u["b"])(["darkMode"])),{},{layout:function(){return{height:350,xaxis:{title:{text:"Horizontal position",font:{color:this.darkMode?"white":"black"}},tickfont:{color:this.darkMode?"white":"black"},gridcolor:this.darkMode?"#111111":"#eeeeee"},yaxis:{title:{text:"Depth",font:{color:this.darkMode?"white":"black"}},tickfont:{color:this.darkMode?"white":"black"},gridcolor:this.darkMode?"#111111":"#eeeeee"},paper_bgcolor:"transparent",plot_bgcolor:"transparent"}}}),data:function(){return{solutions:{partOne:null,partTwo:null},mod:{forward:function(t,o){t.x+=o},down:function(t,o){t.y+=o},up:function(t,o){t.y-=o}},mod2:{forward:function(t,o){t.x+=o,t.y+=t.aim*o},down:function(t,o){t.aim+=o},up:function(t,o){t.aim-=o}}}},watch:{darkMode:function(){try{this.$plotly.relayout("partOne",this.layout)}catch(t){}try{this.$plotly.relayout("partTwo",this.layout)}catch(t){}}},methods:{onInputChanged:function(t){var o=this,n=t.map((function(t){var o=t.split(" ");return{mod:o[0],value:+o[1]}})),e={x:0,y:0},a={x:0,y:0,aim:0},r=[{x:[],y:[],mode:"lines+markers"},{x:[],y:[],mode:"lines+markers"}];n.forEach((function(t){o.mod[t.mod](e,t.value),o.mod2[t.mod](a,t.value),r[0].x.push(e.x),r[0].y.push(e.y),r[1].x.push(a.x),r[1].y.push(a.y)})),this.solutions.partOne=e.x*e.y,this.solutions.partTwo=a.x*a.y,this.plot("partOne",r[0]),this.plot("partTwo",r[1])},plot:function(t,o){var n=this;this.$nextTick((function(){n.$plotly.newPlot(t,[o],n.layout,{responsive:!0,displaylogo:!1})}))}}},l=s,c=n("2877"),d=Object(c["a"])(l,e,a,!1,null,null,null);o["default"]=d.exports},d81d:function(t,o,n){"use strict";var e=n("23e7"),a=n("b727").map,r=n("1dde"),i=r("map");e({target:"Array",proto:!0,forced:!i},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-8fa2cb18.0c3b2577.js.map