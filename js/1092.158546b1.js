"use strict";(self["webpackChunkadvent_of_code"]=self["webpackChunkadvent_of_code"]||[]).push([[1092],{10680:function(t,e,n){n.r(e),n.d(e,{default:function(){return c}});var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Day",{attrs:{day:20,year:2018,solutions:t.solutions},on:{"input-changed":t.onInputChanged}})},a=[],o=n(86889),l={components:{Day:o.Z},data:function(){return{solutions:{partOne:null,partTwo:null},directions:{N:t=>t.y--,E:t=>t.x++,S:t=>t.y++,W:t=>t.x--}}},methods:{onInputChanged:function(t){this.regex=t[0].split("").slice(1,t[0].length-1),this.solve()},solve:function(){let t={x:0,y:0},e=`${t.x},${t.y}`;const n=[],s=new Map;s.set(e,0),this.regex.forEach(((a,o)=>{let l,u;switch(a){case"(":n.push({x:t.x,y:t.y});break;case")":t=n.pop();break;case"|":t=n[n.length-1];break;default:l={x:t.x,y:t.y},this.directions[a](l),e=`${l.x},${l.y}`,u=s.get(`${t.x},${t.y}`),s.has(e)?s.set(e,Math.min(s.get(e),u+1)):s.set(e,u+1),t=l;break}})),this.solutions.partOne=Math.max(...s.values()),this.solutions.partTwo=[...s.values()].filter((t=>t>=1e3)).length}}},u=l,i=n(1001),r=(0,i.Z)(u,s,a,!1,null,null,null),c=r.exports}}]);
//# sourceMappingURL=1092.158546b1.js.map