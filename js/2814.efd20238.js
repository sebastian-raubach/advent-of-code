"use strict";(self["webpackChunkadvent_of_code"]=self["webpackChunkadvent_of_code"]||[]).push([[2814],{86517:function(t,n,e){e.r(n),e.d(n,{default:function(){return i}});var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("Day",{attrs:{day:3,year:2016,solutions:t.solutions},on:{"input-changed":t.onInputChanged}})},s=[],a=e(86889),l={components:{Day:a.Z},data:function(){return{solutions:{partOne:null,partTwo:null}}},methods:{onInputChanged:function(t){const n=t.map((t=>t.trim().split(/\s+/).map((t=>+t))));this.solutions.partOne=n.filter((t=>this.checkTriangle(t))).length;let e=0;for(let o=0;o<3;o++)for(let t=0;t<n.length;t+=3)this.checkTriangle([n[t][o],n[t+1][o],n[t+2][o]])&&e++;this.solutions.partTwo=e},checkTriangle:function(t){const n=t.concat();return n.sort(((t,n)=>t-n)),n[0]+n[1]>n[2]}}},r=l,u=e(1001),c=(0,u.Z)(r,o,s,!1,null,"63674309",null),i=c.exports}}]);
//# sourceMappingURL=2814.efd20238.js.map